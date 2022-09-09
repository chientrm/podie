import routes from '$lib/constants/routes';
import { set_user } from '$lib/helpers/cookie';
import { encrypt } from '$lib/helpers/encryption';
import { get_access_token, get_email, get_user } from '$lib/helpers/github';
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const code = url.searchParams.get('code');
	if (code) {
		const access_token = await get_access_token(code),
			user = await Promise.all([
				get_user(access_token),
				get_email(access_token)
			]).then(([{ id, login, html_url, name }, email]) => ({
				gh: { id, access_token, login, html_url, name, email }
			}));
		set_user(cookies, await encrypt(user));
		throw redirect(303, routes.REDIRECT);
	}
	throw redirect(303, routes.HOME);
};
