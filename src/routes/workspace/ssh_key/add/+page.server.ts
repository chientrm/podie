import routes from '$lib/constants/routes';
import { get_ssh_keys, put_ssh_keys } from '$lib/helpers/cloudflare';
import { redirect } from '@sveltejs/kit';
import type { Action } from './$types';

export const POST: Action = async ({ request, locals }) => {
	const formData = await request.formData(),
		name = formData.get('name')! as string,
		value = formData.get('value')! as string,
		key = locals.gh!.user.login,
		keys = await get_ssh_keys(locals.PODIE, key);
	keys[name] = value;
	await put_ssh_keys(locals.PODIE, key, keys);
	throw redirect(302, routes.WORKSPACE.SSH_KEYS.LIST);
};
