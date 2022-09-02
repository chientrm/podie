import routes from '$lib/constants/routes';
import { get_profile, put_profile } from '$lib/helpers/cloudflare';
import { redirect } from '@sveltejs/kit';
import type { Action, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) =>
	get_profile(locals.PODIE, locals.gh!.user.login).then((profile) => ({
		profile
	}));

export const POST: Action = async ({ request, locals }) => {
	const formData = await request.formData(),
		name = formData.get('name')! as string,
		email = formData.get('email')! as string,
		key = locals.gh!.user.login;
	await put_profile(locals.PODIE, key, { name, email });
	return redirect(302, routes.WORKSPACE.INSTANCES.LIST);
};
