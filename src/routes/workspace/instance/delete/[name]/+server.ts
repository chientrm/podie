import routes from '$lib/constants/routes';
import { get_instances, put_instances } from '$lib/helpers/cloudflare';
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, locals }) => {
	const key = locals.gh!.user.login,
		name = params.name!,
		instances = await get_instances(locals.PODIE, key);
	delete instances[name];
	await put_instances(locals.PODIE, key, instances);
	throw redirect(302, routes.WORKSPACE.INSTANCES.LIST);
};
