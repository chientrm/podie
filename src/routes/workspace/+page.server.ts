import {
	parse_gcp_access_token,
	parse_gcp_project_id
} from '$lib/helpers/cookie';
import { list_workspaces } from '$lib/helpers/gcp';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request }) => {
	const gcp_project_id = parse_gcp_project_id(request)!;
	const gcp_access_token = parse_gcp_access_token(request)!;
	const workspaces = await list_workspaces({
		id: gcp_project_id,
		access_token: gcp_access_token
	});
	return { workspaces, gcp_project_id };
};
