export type HttpResponse<T> = { data: T; success: true } | { error: string; success: false };

type RequestOptions = {
	headers?: Record<string, string>;
};

type RequestBody = string | FormData | null;

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

	private async refreshToken() {
		const refreshToken = this.config.getRefreshToken?.();
		if (!refreshToken) {
			return null;
		}

		try {
			const response = await fetch(`${this.baseURL}/refresh`, {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
					Authorization: `Bearer ${refreshToken}`,
				},
			});

			if (response.ok) {
				const { access_token } = (await response.json()) as { access_token: string };
				this.config.onRefreshToken?.(access_token);
				return access_token;
			}
		} catch (error) {
			return null;
		}
	}

	private async request<T>(
		method: string,
		url: string,
		body: RequestBody,
		options?: RequestOptions
	): Promise<HttpResponse<T>> {
		const requestURL = `${this.baseURL}/${url}`;

		const token = this.config.getToken?.();
		const headers: RequestOptions['headers'] = {
			'content-type': 'application/json',
			Authorization: token ? `Bearer ${token}` : '',
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

			if (response.status === 401) {
				const newToken = await this.refreshToken();
				if (newToken) {
					return this.request<T>(method, url, body, options);
				}

				this.config.onUnauthorised?.();
			}

			const error = await response.json().catch(() => ({
				msg: 'Something went wrong',
			}));

			throw new Error(error.msg);
		} catch (error) {
			if (error instanceof Error) {
				return { error: error.message, success: false };
			}

			return { error: 'Something went wrong', success: false };
		}
	}
}
