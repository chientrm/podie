import podie from '$lib/constants/podie';
import routes from '$lib/constants/routes';
import { delete_image } from '$lib/helpers/gcp';
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, locals }) => {
	await delete_image({
		project: podie.USER.GH(locals.user!.gh!.id).GCP.PID,
		resourceId: params.name!
	});
	throw redirect(302, routes.WORKSPACE.IMAGES.LIST);
};
