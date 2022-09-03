import podie from '$lib/constants/podie';
import routes from '$lib/constants/routes';
import { get_ssh_keys, put_ssh_keys } from '$lib/helpers/cloudflare';
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, locals }) => {
	const name = params.name!,
		key = podie.USER.GH(locals.user!.gh!.id).KEY,
		keys = await get_ssh_keys(locals.PODIE, key);
	delete keys[name];
	await put_ssh_keys(locals.PODIE, key, keys);
	throw redirect(302, routes.WORKSPACE.SSH_KEYS.LIST);
};
