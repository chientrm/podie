import podie from '$lib/constants/podie';
import routes from '$lib/constants/routes';
import {
	get_instances,
	get_ssh_keys,
	put_instances
} from '$lib/helpers/cloudflare';
import { create_instance, list_machine_types } from '$lib/helpers/gcp';
import { list_branches } from '$lib/helpers/github';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const { org, name: repo_name, zone } = params,
		project = podie.USER.GH(locals.user!.gh!.id).GCP.PID,
		{ access_token } = locals.user!.gh!,
		[branches, machine_types] = await Promise.all([
			list_branches({ access_token, org, repo_name }),
			list_machine_types({ project, zone })
		]);
	return { branches, machine_types, zone };
};

export const actions: Actions = {
	default: async ({ request, params, locals }) => {
		const for_form = request.formData().then((formData) => ({
				branch: formData.get('branch')! as string,
				name: formData.get('name')! as string,
				disk_size: parseInt(formData.get('disk_size')! as string),
				machine_type: formData.get('machine_type')! as string
			})),
			{ org, name: repo_name, region, zone } = params,
			gh = locals.user!.gh!,
			ghid = gh.id,
			key = podie.USER.GH(ghid).KEY,
			for_keys = get_ssh_keys(locals.PODIE, key),
			for_instances = get_instances(locals.PODIE, key),
			for_create_podie_instance = Promise.all([for_instances, for_form])
				.then(([instances, { name, branch, disk_size, machine_type }]) => ({
					...instances,
					[name]: {
						org,
						repo_name,
						branch,
						region,
						zone,
						disk_size,
						machine_type
					}
				}))
				.then((instances) => put_instances(locals.PODIE, key, instances)),
			for_create_gcp_instance = Promise.all([for_keys, for_form]).then(
				([keys, { name, disk_size, machine_type, branch }]) =>
					create_instance({
						project: podie.USER.GH(ghid).GCP.PID,
						gh,
						zone,
						machine_type,
						name,
						org,
						repo_name,
						disk_size,
						keys,
						branch
					})
			);
		await Promise.all([for_create_gcp_instance, for_create_podie_instance]);
		throw redirect(303, routes.WORKSPACE.INSTANCES.LIST);
	}
};
