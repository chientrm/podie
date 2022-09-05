import podie from '$lib/constants/podie';
import routes from '$lib/constants/routes';
import { get_instances } from '$lib/helpers/cloudflare';
import { list_machine_types } from '$lib/helpers/gcp';
import { redirect } from '@sveltejs/kit';
import type { Action, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const { name, zone } = params,
		project = podie.USER.GH(locals.user!.gh!.id).GCP.PID,
		for_instances = get_instances(locals.PODIE, project),
		for_machine_type = for_instances.then(
			(instances) => instances[name]!.machine_type
		),
		for_machine_types = list_machine_types({ project, zone });
	const instances = await for_instances;
	console.log({ instances });
	const result = await Promise.all([for_machine_type, for_machine_types]).then(
		([machine_type, machine_types]) => ({ name, machine_type, machine_types })
	);
	return result;
};

export const POST: Action = async ({ request, locals, params }) => {
	const { name } = params,
		for_form = request.formData().then((formData) => ({
			machine_type: formData.get('machine_type')! as string
		})),
		project = podie.USER.GH(locals.user!.gh!.id).GCP.PID,
		for_instances = get_instances(locals.PODIE, project);
	await Promise.all([for_form, for_instances]).then(([form, instances]) => {
		instances[name]!.machine_type = form.machine_type;
	});
	throw redirect(302, routes.WORKSPACE.INSTANCES.LIST);
};
