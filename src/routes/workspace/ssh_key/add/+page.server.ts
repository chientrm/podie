import routes from '$lib/constants/routes';
import { redirect } from '@sveltejs/kit';
import type { Action } from './$types';

export const POST: Action = async ({ request, locals }) => {
	const formData = await request.formData(),
		name = formData.get('name')! as string,
		value = formData.get('value')! as string,
		key = locals.gh!.user.login,
		keys = (await locals.SSH_KEYS.get<Podie.SshKeys>(key, 'json')) || {};
	keys[name] = value;
	await locals.SSH_KEYS.put(locals.gh!.user.login, JSON.stringify(keys));
	throw redirect(302, routes.WORKSPACE.SSH_KEYS.LIST);
};
