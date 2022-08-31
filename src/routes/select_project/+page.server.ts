import routes from '$lib/constants/routes';
import { parse_gcp_project, set_gcp_project } from '$lib/helpers/cookie';
import { encrypt } from '$lib/helpers/encryption';
import { list_projects } from '$lib/helpers/gcp';
import { redirect } from '@sveltejs/kit';
import type { Action, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request, locals }) => {
	const project = parse_gcp_project(request);
	if (project) throw redirect(302, routes.HOME);
	const { projects } = await list_projects(locals.gcp!.access_token);
	return { projects };
};

export const POST: Action = async ({ request, setHeaders }) => {
	const formData = await request.formData(),
		id = formData.get('id') as string,
		gcp_project = await encrypt({ id });
	setHeaders(set_gcp_project(gcp_project));
	throw redirect(302, routes.WORKSPACE.GET);
};
