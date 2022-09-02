import routes from '$lib/constants/routes';
import {
	get_instances,
	get_profile,
	get_ssh_keys,
	put_instances
} from '$lib/helpers/cloudflare';
import { create_instance, list_machine_types } from '$lib/helpers/gcp';
import { list_branches } from '$lib/helpers/github';
import { redirect } from '@sveltejs/kit';
import type { Action, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const { org, name, zone } = params,
		project = locals.gcp_project!.id,
		[branches, machine_types] = await Promise.all([
			list_branches({
				access_token: locals.gh!.access_token,
				repo: `${org}/${name}`
			}),
			list_machine_types({
				project,
				access_token: locals.gcp!.access_token,
				zone
			})
		]);
	return { branches, machine_types, zone };
};

export const POST: Action = async ({ request, params, locals }) => {
	const for_form = request.formData().then((formData) => ({
			branch: formData.get('branch')! as string,
			name: formData.get('name')! as string,
			diskSize: parseInt(formData.get('disk_size')! as string),
			startup: formData.get('startup')! as string,
			machineType: formData.get('machine_type')! as string
		})),
		{ org, name: repoName, zone } = params,
		repo = `${org}/${repoName}`,
		key = locals.gh!.user.login,
		for_profile = get_profile(locals.PODIE, key),
		for_keys = get_ssh_keys(locals.PODIE, key),
		for_instances = get_instances(locals.PODIE, key),
		for_create_podie_instance = Promise.all([for_instances, for_form])
			.then(([ins, { name, branch, diskSize, startup, machineType }]) => {
				ins[name] = { repo, branch, zone, diskSize, startup, machineType };
				return ins;
			})
			.then((ins) => put_instances(locals.PODIE, key, ins)),
		for_create_gcp_instance = Promise.all([
			for_profile,
			for_keys,
			for_form
		]).then(
			([profile, keys, { name, diskSize, startup, machineType, branch }]) =>
				create_instance({
					profile,
					project: locals.gcp_project!.id,
					gh_access_token: locals.gh!.access_token,
					gcp_access_token: locals.gcp!.access_token,
					zone,
					machineType,
					name,
					diskSize,
					startup,
					repo,
					sshKeys: Object.values(keys),
					branch
				})
		);
	await Promise.all([for_create_gcp_instance, for_create_podie_instance]);
	throw redirect(302, routes.WORKSPACE.INSTANCES.LIST);
};
