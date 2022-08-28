import { client_id, client_secret } from '$lib/configs/github.json';
import routes from '$lib/constants/routes';
import { responses } from './supabase';

export const get_access_token = (code: string) =>
	fetch(routes.GITHUB.ACCESS_TOKEN({ client_id, client_secret, code }), {
		headers: { Accept: 'application/json' }
	})
		.then((res) => res.json<{ access_token: string }>())
		.then((data) => data.access_token);

export const get_user = (access_token: string) =>
	fetch(routes.GITHUB.USER, {
		headers: {
			Accept: 'application/vnd.github+json',
			Authorization: `token ${access_token}`
		}
	})
		.then(async (res) => {
			if (!res.ok) {
				await responses.insert({ value: JSON.stringify(res) });
			}
			return res.json<any>();
		})
		.then((data) => {
			const user = { ...data, username: data.login };
			return user;
		});
