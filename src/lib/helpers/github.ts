import { client_id, client_secret } from '$lib/configs/github.json';
import routes from '$lib/constants/routes';
import strings from '$lib/constants/strings';

const check_ok = (res: Response) => {
	if (!res.ok) {
		throw new Error(JSON.stringify(res));
	}
	return res;
};

export const get_access_token = (code: string) =>
	fetch(routes.GITHUB.ACCESS_TOKEN({ client_id, client_secret, code }), {
		headers: { Accept: 'application/json' }
	})
		.then(check_ok)
		.then((res) => res.json<{ access_token: string }>())
		.then((data) => data.access_token);

export const get_user = (access_token: string) =>
	fetch(routes.GITHUB.USER, {
		headers: {
			Accept: 'application/vnd.github+json',
			Authorization: `token ${access_token}`,
			'User-Agent': strings.PODIE
		}
	})
		.then(check_ok)
		.then((res) => res.json<any>())
		.then((data) => ({ ...data, username: data.login }));
