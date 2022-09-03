import podie from '$lib/constants/podie';
import routes from '$lib/constants/routes';
import { delete_instance } from '$lib/helpers/gcp';
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, locals }) => {
	await delete_instance({
		project: podie.USER.GH(locals.user!.gh!.id).GCP.PID,
		zone: params.zone!,
		resourceId: params.resourceId!
	});
	throw redirect(302, routes.WORKSPACE.INSTANCES.LIST);
};
