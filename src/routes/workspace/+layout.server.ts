import routes from '$lib/constants/routes';
import { parse_gcp, parse_gcp_project, parse_gh } from '$lib/helpers/cookie';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ request }) => {
	const gh = parse_gh(request),
		gcp = parse_gcp(request),
		gcp_project = parse_gcp_project(request);
	if (!(gh && gcp && gcp_project)) {
		throw redirect(302, routes.HOME);
	}
};
