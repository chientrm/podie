import routes from '$lib/constants/routes';
import { ssh_keys } from '$lib/helpers/supabase';
import { redirect } from '@sveltejs/kit';
import type { Action } from './$types';

export const POST: Action = async ({ request, locals }) => {
	const formData = await request.formData(),
		name = formData.get('name')! as string,
		value = formData.get('value')! as string;
	await ssh_keys().upsert({ id: locals.gh!.user.login, name, value });
	throw redirect(302, routes.WORKSPACE.SSH_KEYS.LIST);
};
