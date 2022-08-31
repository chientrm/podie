import routes from '$lib/constants/routes';
import { parse_gcp, parse_gcp_pid, parse_gh } from '$lib/helpers/cookie';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ request }) => {
	const gh = parse_gh(request),
		gcp = parse_gcp(request),
		gcp_pid = parse_gcp_pid(request);
	if (!(gh && gcp && gcp_pid)) {
		throw redirect(302, routes.HOME);
	}
};
