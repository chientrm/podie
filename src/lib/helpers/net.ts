import type { HttpMethod } from '@sveltejs/kit/types/private';

export const fetchJson = <T>(
	url: string,
	method: HttpMethod = 'GET',
	headers: {} = {},
	body?: any
) =>
	fetch(url, {
		method,
		headers: { Accept: 'application/json', ...headers },
		body: body ? JSON.stringify(body) : undefined
	})
		.then((res) => res.json())
		.then((json) => json as T);
