import routes from '$lib/constants/routes';
import {
	parse_gcp_access_token,
	parse_gcp_project_id,
	set_gcp_project_id
} from '$lib/helpers/cookie';
import { list_projects } from '$lib/helpers/gcp';
import { redirect } from '@sveltejs/kit';
import type { Action, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request }) => {
	const gcp_access_token = parse_gcp_access_token(request)!;
	const gcp_project_id = parse_gcp_project_id(request);
	if (gcp_project_id) throw redirect(302, routes.HOME);
	const { projects } = await list_projects(gcp_access_token);
	return { projects };
};

export const POST: Action = async ({ request, setHeaders }) => {
	const formData = await request.formData();
	const id = formData.get('id') as string;
	setHeaders(set_gcp_project_id(id));
	throw redirect(302, routes.HOME);
};
