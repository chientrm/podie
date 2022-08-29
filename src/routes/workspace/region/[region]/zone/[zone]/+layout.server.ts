import {
	parse_gcp_access_token,
	parse_gcp_project_id
} from '$lib/helpers/cookie';
import { list_regions } from '$lib/helpers/gcp';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ request, params }) => {
	const { region } = params;
	const gcp_access_token = parse_gcp_access_token(request)!;
	const gcp_project_id = parse_gcp_project_id(request)!;
	const regions = await list_regions({
		project: gcp_project_id,
		access_token: gcp_access_token
	});
	const zones = regions[region];
	return { regions, zones };
};
