import routes from '$lib/constants/routes';
import { parse_user } from '$lib/helpers/cookie';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ request }) => {
	const user = parse_user(request);
	if (!user) {
		throw redirect(302, routes.HOME);
	}
};
