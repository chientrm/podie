import routes from '$lib/constants/routes';
import { delete_instance } from '$lib/helpers/gcp';
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, locals }) => {
	await delete_instance({
		project: locals.gcp_project!.id,
		zone: params.zone!,
		resourceId: params.resourceId!,
		access_token: locals.gcp!.access_token
	});
	throw redirect(302, routes.WORKSPACE.INSTANCES.LIST);
};
