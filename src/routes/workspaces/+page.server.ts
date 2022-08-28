import {
	parse_access_token,
	parse_gcp_access_token
} from '$lib/helpers/cookie';
import { list_projects } from '$lib/helpers/gcp';
import { list_repoes } from '$lib/helpers/github';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request }) => {
	const access_token = parse_access_token(request);
	const gcp_access_token = parse_gcp_access_token(request);
	const repoes = await list_repoes(access_token);
	let projects: GCP.Project[] | undefined = undefined;
	if (gcp_access_token) {
		projects = (await list_projects(gcp_access_token)).projects;
	}
	return { repoes, projects };
};
