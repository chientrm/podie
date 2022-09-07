import podie from '$lib/constants/podie';
import routes from '$lib/constants/routes';
import { get_ssh_keys, put_ssh_keys } from '$lib/helpers/cloudflare';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const for_form = request.formData().then((formData) => ({
				name: formData.get('name')! as string,
				value: formData.get('value')! as string
			})),
			key = podie.USER.GH(locals.user!.gh!.id).KEY,
			for_keys = get_ssh_keys(locals.PODIE, key);
		await Promise.all([for_form, for_keys])
			.then(([{ name, value }, keys]) => ({ ...keys, [name]: value }))
			.then((keys) => put_ssh_keys(locals.PODIE, key, keys));
		throw redirect(303, routes.WORKSPACE.SSH_KEYS.LIST);
	}
};
