import podie from '$lib/constants/podie';
import routes from '$lib/constants/routes';
import { get_instances, put_instances } from '$lib/helpers/cloudflare';
import { list_machine_types } from '$lib/helpers/gcp';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const { name, zone } = params,
		ghid = locals.user!.gh!.id,
		project = podie.USER.GH(ghid).GCP.PID,
		for_instances = get_instances(locals.PODIE, podie.USER.GH(ghid).KEY),
		for_machine_type = for_instances.then(
			(instances) => instances[name]!.machine_type
		),
		for_machine_types = list_machine_types({ project, zone });
	return Promise.all([for_machine_type, for_machine_types]).then(
		([machine_type, machine_types]) => ({ name, machine_type, machine_types })
	);
};

export const actions: Actions = {
	default: async ({ request, locals, params }) => {
		const { name } = params,
			key = podie.USER.GH(locals.user!.gh!.id).KEY,
			for_form = request.formData().then((formData) => ({
				machine_type: formData.get('machine_type')! as string
			})),
			for_instances = get_instances(locals.PODIE, key);
		await Promise.all([for_form, for_instances]).then(
			([{ machine_type }, instances]) => {
				instances[name]!.machine_type = machine_type;
				return put_instances(locals.PODIE, key, instances);
			}
		);
		throw redirect(303, routes.WORKSPACE.INSTANCES.LIST);
	}
};
