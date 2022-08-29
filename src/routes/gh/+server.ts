import routes from '$lib/constants/routes';
import { login_gh } from '$lib/helpers/cookie';
import { get_access_token } from '$lib/helpers/github';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const code = url.searchParams.get('code')!;
	const access_token = await get_access_token(code);
	return new Response(undefined, {
		status: 302,
		headers: { Location: routes.WORKSPACE.GET, ...login_gh(access_token) }
	});
};
