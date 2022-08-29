import { client_id, client_secret, redirect_uri } from '$lib/configs/gcp.json';
import routes from '$lib/constants/routes';
import { login_gcp } from '$lib/helpers/cookie';
import { get_gcp_tokens } from '$lib/helpers/gcp';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const code = url.searchParams.get('code')!;
	const { access_token, expires_in } = await get_gcp_tokens({
		client_id,
		client_secret,
		code,
		redirect_uri
	});
	return new Response(undefined, {
		status: 302,
		headers: {
			Location: routes.SELECT_PROJECT,
			...login_gcp({ access_token, expires_in: expires_in - 10 })
		}
	});
};
