import routes from '$lib/constants/routes';
import { set_user } from '$lib/helpers/cookie';
import { encrypt } from '$lib/helpers/encryption';
import { get_access_token, get_email, get_user } from '$lib/helpers/github';
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, setHeaders }) => {
	const code = url.searchParams.get('code')!,
		access_token = await get_access_token(code),
		gh = await Promise.all([
			get_user(access_token),
			get_email(access_token)
		]).then(([{ id, login, html_url, name }, email]) => ({
			id,
			access_token,
			login,
			html_url,
			name,
			email
		})),
		user = await encrypt({ gh });
	setHeaders(set_user(user));
	throw redirect(302, routes.REDIRECT);
};
