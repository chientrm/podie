import routes from '$lib/constants/routes';
import { parse_gcp_access_token, parse_gcp_pid } from '$lib/helpers/cookie';
import { delete_instance } from '$lib/helpers/gcp';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request, params }) => {
	const project = parse_gcp_pid(request)!;
	const access_token = parse_gcp_access_token(request)!;
	const zone = params.zone!;
	const resourceId = params.resourceId!;
	await delete_instance({ project, zone, resourceId, access_token });
	return new Response(undefined, {
		status: 302,
		headers: { Location: routes.WORKSPACE.GET }
	});
};
