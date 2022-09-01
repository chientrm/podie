import routes from '$lib/constants/routes';
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, locals }) => {
	const name = params.name!,
		key = locals.gh!.user.login,
		keys = (await locals.SSH_KEYS.get<Podie.SshKeys>(key, 'json')) || {};
	delete keys[name];
	await locals.SSH_KEYS.put(key, JSON.stringify(keys));
	throw redirect(302, routes.WORKSPACE.SSH_KEYS.LIST);
};
