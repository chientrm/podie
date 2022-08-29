import routes from '$lib/constants/routes';
import {
	parse_gcp_access_token,
	parse_gcp_project_id,
	parse_gh_access_token
} from '$lib/helpers/cookie';
import { create_instance, list_machine_types } from '$lib/helpers/gcp';
import { list_repoes } from '$lib/helpers/github';
import { redirect } from '@sveltejs/kit';
import type { Action, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request, params }) => {
	const { zone } = params;
	const gh_access_token = parse_gh_access_token(request)!;
	const gcp_access_token = parse_gcp_access_token(request)!;
	const gcp_project_id = parse_gcp_project_id(request)!;
	const [repoes, machine_types] = await Promise.all([
		list_repoes(gh_access_token),
		list_machine_types({
			project: gcp_project_id,
			access_token: gcp_access_token,
			zone
		})
	]);
	return { repoes, machine_types };
};

export const POST: Action = async ({ request }) => {
	const formData = await request.formData();
	const zone = formData.get('zone')! as string;
	const name = formData.get('name')! as string;
	const machineType = formData.get('machineType')! as string;
	const diskSize = parseInt(formData.get('diskSize') as string);
	const gcp_access_token = parse_gcp_access_token(request)!;
	const gcp_project_id = parse_gcp_project_id(request)!;
	await create_instance({
		project: gcp_project_id,
		access_token: gcp_access_token,
		zone,
		machineType,
		name,
		diskSize
	});
	throw redirect(302, routes.WORKSPACE.GET);
};
