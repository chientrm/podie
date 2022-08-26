import routes from '$lib/constants/routes';
import { send } from '$lib/helpers/mailer';
import { letusknow } from '$lib/helpers/supabase';
import { redirect } from '@sveltejs/kit';
import type { Action } from './$types';

export const POST: Action = async ({ request }) => {
	const formData = await request.formData();
	const email = formData.get('email') as string;
	const { error } = await letusknow.upsert({ email });
	if (error) {
		throw error;
	}
	const res = await send(
		email,
		'Say hi from Podie',
		`Hi there 👋👋👋,

Thank you so much for joining us 🍻🍻🍻
        
Podie is currently experimental. We'll inform you as soon as possible!

Have a good day,
	`
	);
	console.log(res);
	throw redirect(302, routes.THANK(email).GET);
};
