import routes from '$lib/constants/routes';
import { login } from '$lib/helpers/cookie';
import { redirect } from '@sveltejs/kit';
import type { Action, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
	if (locals.user) {
		throw redirect(302, routes.WORKSPACES);
	}
};

export const POST: Action = async ({ request, setHeaders }) => {
	const formData = await request.formData();
	const idToken = formData.get('idToken') as string;
	setHeaders(login(idToken));
	throw redirect(302, routes.WORKSPACES);
};
