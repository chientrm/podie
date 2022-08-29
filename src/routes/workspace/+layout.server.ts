import routes from '$lib/constants/routes';
import {
	parse_gcp_access_token,
	parse_gcp_project_id,
	parse_gh_access_token
} from '$lib/helpers/cookie';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ request }) => {
	if (
		!parse_gh_access_token(request) ||
		!parse_gcp_access_token(request) ||
		!parse_gcp_project_id(request)
	) {
		throw redirect(302, routes.HOME);
	}
};
