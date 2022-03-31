export type HttpResponse<T> = { data: T; success: true } | { error: string; success: false };

type RequestOptions = {
	headers?: Record<string, string>;
};

type HttpServiceConfig = {
	getToken?: () => string | null;
	getRefreshToken?: () => string | null;
	onRefreshToken?: (token: string) => void;
	onUnauthorised?: () => void;
};

export class HttpService {
	constructor(private baseURL: string, private config: HttpServiceConfig = {}) {}

	get<T>(url: string, options?: RequestOptions) {
		return this.request<T>('GET', url, null, options);
	}

	post<T>(url: string, body: unknown, options?: RequestOptions) {
		return this.request<T>('POST', url, JSON.stringify(body), options);
	}

	put<T>(url: string, body: unknown, options?: RequestOptions) {
		return this.request<T>('PUT', url, JSON.stringify(body), options);
	}

	delete<T>(url: string, options?: RequestOptions) {
		return this.request<T>('DELETE', url, null, options);
	}

	patch<T>(url: string, body: unknown, options?: RequestOptions) {
		return this.request<T>('PATCH', url, JSON.stringify(body), options);
	}

	private async refreshToken(token?: string) {
		try {
			const response = await this.post<{ access_token: string }>(
				'refresh',
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.success) {
				this.config.onRefreshToken?.(response.data.access_token);
				return response.data.access_token;
			}

			throw new Error(response.error);
		} catch (error) {
			return null;
		}
	}

	private async request<T>(
		method: string,
		url: string,
		body: string | FormData | null = null,
		options?: RequestOptions
	): Promise<HttpResponse<T>> {
		const requestURL = `${this.baseURL}/${url}`;

		const headers: Record<string, string> = {
			'content-type': 'application/json',
			Authorization: `Bearer ${this.config.getToken?.() || ''}`,
			...options?.headers,
		};

		try {
			const response = await fetch(requestURL, {
				headers,
				body,
				method,
			});

			if (response.ok) {
				return { data: await response.json(), success: true };
			}

			const errorResponse = await response.json().catch(() => ({
				msg: 'Something went wrong',
			}));

			if (response.status === 401) {
				const refreshToken = this.config.getRefreshToken?.();
				if (refreshToken) {
					const newRefreshToken = await this.refreshToken(refreshToken);
					if (newRefreshToken) {
						return this.request<T>(method, url, body, options);
					}
				}

				this.config.onUnauthorised?.();
				throw new Error(errorResponse.msg);
			}

			throw new Error(errorResponse.msg);
		} catch (error) {
			if (error instanceof Error) {
				return { error: error?.message, success: false };
			}

			return { error: 'Something went wrong', success: false };
		}
	}
}
