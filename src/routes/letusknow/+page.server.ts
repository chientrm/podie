import routes from '$lib/constants/routes';
import { letusknow } from '$lib/helpers/supabase';
import { redirect } from '@sveltejs/kit';
import type { Action } from './$types';

export const POST: Action = async ({ request }) => {
	const formData = await request.formData();
	const email = formData.get('email') as string;
	await letusknow().upsert({ email });
	throw redirect(302, routes.THANK(email).GET);
};
