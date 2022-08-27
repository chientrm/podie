import { client_id, client_secret } from '$lib/configs/github.json';
import routes from '$lib/constants/routes';

export const get_access_token = (code: string) =>
	fetch(routes.GITHUB.ACCESS_TOKEN({ client_id, client_secret, code }), {
		headers: { Accept: 'application/json' }
	})
		.then((res) => res.json())
		.then((data) => data.access_token as string);

export const get_user = (access_token: string) =>
	fetch(routes.GITHUB.USER, {
		headers: {
			Accept: 'application/vnd.github+json',
			Authorization: `token ${access_token}`
		}
	})
		.then((res) => res.json())
		.then((data) => {
			const user = { avatar_url: data.avatar_url as string };
			return user;
		});
