import routes from '$lib/constants/routes';
import { ssh_keys } from '$lib/helpers/supabase';
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, locals }) => {
	const name = params.name!;
	await ssh_keys().delete().match({ id: locals.gh!.user.login, name });
	throw redirect(302, routes.WORKSPACE.SSH_KEYS.LIST);
};
