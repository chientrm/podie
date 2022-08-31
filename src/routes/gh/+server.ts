import routes from '$lib/constants/routes';
import { set_gh } from '$lib/helpers/cookie';
import { encrypt } from '$lib/helpers/encryption';
import { get_access_token, get_user } from '$lib/helpers/github';
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, setHeaders }) => {
	const code = url.searchParams.get('code')!,
		access_token = await get_access_token(code),
		user = await get_user(access_token),
		gh = await encrypt({ access_token, user });
	setHeaders(set_gh(gh));
	throw redirect(302, routes.WORKSPACE.GET);
};
