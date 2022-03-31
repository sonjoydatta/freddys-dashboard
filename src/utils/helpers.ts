/* eslint-disable @typescript-eslint/no-explicit-any */
export const hexToRGB = (hex: string, alpha?: number) => {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);

	return alpha !== undefined ? `rgba(${r}, ${g}, ${b}, ${alpha})` : `rgb(${r}, ${g}, ${b})`;
};

export const isNullProperties = (obj: Record<string, unknown>): boolean => {
	for (const key in obj) {
		if (obj[key] !== null && obj[key] !== '') return false;
	}
	return true;
};

export const formatReadable = (value: string): string => value.replace(/([A-Z])/g, ' $1');

export const formatValidatorKey = (value: string): string => {
	const val = formatReadable(value).trim();
	return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
};

export const formatPrice = (price: number | string, minimumFractionDigits = 0) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits,
	}).format(typeof price === 'string' ? parseFloat(price) : price);
};

export const formatDate = (date: string | Date) => {
	return new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	}).format(new Date(date));
};

export const formatURLParams = (params: Record<string, any>) => {
	const searchParams = new URLSearchParams();

	Object.keys(params).forEach((key) => {
		const value = params[key];

		if (value) {
			if (Array.isArray(value)) {
				value.forEach((item) => {
					searchParams.append(key, item);
				});
			} else {
				searchParams.append(key, value);
			}
		}
	});

	return searchParams.toString();
};

export function debounce<Params extends any[]>(
	func: (...args: Params) => any,
	timeout: number
): (...args: Params) => void {
	let timer: number | undefined;
	return (...args: Params) => {
		clearTimeout(timer);

		timer = setTimeout(() => {
			func(...args);
		}, timeout);
	};
}
