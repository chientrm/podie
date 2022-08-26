import routes from '$lib/constants/routes';
import { redirect } from '@sveltejs/kit';
import type { Action } from './$types';

export const POST: Action = async ({ request, locals }) => {
	const formData = await request.formData();
	const email = formData.get('email') as string;
	const { error } = await locals.supabase.from('letusknow').upsert({ email });
	if (error) {
		throw error;
	}
	throw redirect(302, routes.THANK(email).GET);
};
