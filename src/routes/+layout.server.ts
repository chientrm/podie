import {
	parse_gh_access_token,
	parse_gcp_access_token,
	parse_gcp_project_id
} from '$lib/helpers/cookie';
import {
	get_project as get_gcp_project,
	get_user as get_gcp_user
} from '$lib/helpers/gcp';
import { get_user as get_github_user } from '$lib/helpers/github';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ request }) => {
	const gh_access_token = parse_gh_access_token(request),
		gcp_access_token = parse_gcp_access_token(request),
		gcp_project_id = parse_gcp_project_id(request),
		[gh_user, gcp_user, gcp_project] = await Promise.all([
			gh_access_token ? get_github_user(gh_access_token) : undefined,
			gcp_access_token ? get_gcp_user(gcp_access_token) : undefined,
			gcp_access_token && gcp_project_id
				? get_gcp_project({
						id: gcp_project_id,
						access_token: gcp_access_token
				  })
				: undefined
		]);
	return { gh_user, gcp_user, gcp_project };
};
