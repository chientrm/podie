import { client_id, client_secret, redirect_uri } from '$lib/configs/gcp.json';
import routes from '$lib/constants/routes';
import { set_gcp } from '$lib/helpers/cookie';
import { get_gcp_tokens, get_user } from '$lib/helpers/gcp';
import { encrypt } from '$lib/utils';
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, setHeaders }) => {
	const code = url.searchParams.get('code')!,
		{ access_token, expires_in } = await get_gcp_tokens({
			client_id,
			client_secret,
			code,
			redirect_uri
		}),
		user = await get_user(access_token),
		value = await encrypt({ access_token, user });
	setHeaders(set_gcp({ value, maxAge: expires_in - 10 }));
	throw redirect(302, routes.SELECT_PROJECT);
};
