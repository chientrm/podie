import routes from '$lib/constants/routes';
import { put_let_us_know } from '$lib/helpers/cloudflare';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData(),
			email = formData.get('email') as string;
		await put_let_us_know(locals.PODIE, email, '');
		throw redirect(303, routes.THANK(email).GET);
	}
};
