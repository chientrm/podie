import routes from '$lib/constants/routes';
import { parse_gcp_pid, set_gcp_pid } from '$lib/helpers/cookie';
import { list_projects } from '$lib/helpers/gcp';
import { redirect } from '@sveltejs/kit';
import type { Action, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request, locals }) => {
	const gcp_pid = parse_gcp_pid(request);
	if (gcp_pid) throw redirect(302, routes.HOME);
	const { projects } = await list_projects(locals.gcp!.access_token);
	return { projects };
};

export const POST: Action = async ({ request, setHeaders }) => {
	const formData = await request.formData();
	const id = formData.get('id') as string;
	setHeaders(set_gcp_pid(id));
	throw redirect(302, routes.WORKSPACE.GET);
};
