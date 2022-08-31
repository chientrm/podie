import {
	parse_gcp_access_token,
	parse_gcp_pid,
	parse_gh_access_token
} from '$lib/helpers/cookie';
import { list_regions } from '$lib/helpers/gcp';
import { list_repoes } from '$lib/helpers/github';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ request, params }) => {
	const { region } = params;
	const gh_access_token = parse_gh_access_token(request)!;
	const gcp_access_token = parse_gcp_access_token(request)!;
	const gcp_project_id = parse_gcp_pid(request)!;
	const [repoes, regions] = await Promise.all([
		list_repoes(gh_access_token),
		list_regions({
			project: gcp_project_id,
			access_token: gcp_access_token
		})
	]);
	const zones = regions[region];
	return { repoes, regions, zones };
};
