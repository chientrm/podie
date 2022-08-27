import routes from '$lib/constants/routes';
import { login } from '$lib/helpers/cookie';
import { get_access_token } from '$lib/helpers/github';
import { redirect, type Action } from '@sveltejs/kit';

export const GET: Action = async ({ url, setHeaders }) => {
	const code = url.searchParams.get('code')!;
	const access_token = await get_access_token(code);
	setHeaders(login(access_token));
	throw redirect(302, routes.WORKSPACES);
};
