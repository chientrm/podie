import routes from '$lib/constants/routes';
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, locals }) => {
	const key = locals.gh!.user.login,
		name = params.name!,
		instances = (await locals.INSTANCES.get<Podie.Instances>(key, 'json'))!;
	delete instances[name];
	await locals.INSTANCES.put(key, JSON.stringify(instances));
	throw redirect(302, routes.WORKSPACE.INSTANCES.LIST);
};
