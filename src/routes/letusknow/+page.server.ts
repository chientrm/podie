import routes from '$lib/constants/routes';
import { letusknow } from '$lib/helpers/supabase';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		await letusknow().upsert({ email });
		throw redirect(303, routes.THANK(email).GET);
	}
};
