import routes from '$lib/constants/routes';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	throw redirect(302, routes.WORKSPACE.INSTANCES.LIST);
};
