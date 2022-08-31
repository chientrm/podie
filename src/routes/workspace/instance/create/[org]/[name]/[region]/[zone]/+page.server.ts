import routes from '$lib/constants/routes';
import { create_instance, list_machine_types } from '$lib/helpers/gcp';
import { list_branches } from '$lib/helpers/github';
import { ssh_keys } from '$lib/helpers/supabase';
import { redirect } from '@sveltejs/kit';
import type { Action, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const { org, name, zone } = params,
		project = locals.gcp_project!.id,
		for_branches = list_branches({
			access_token: locals.gh!.access_token,
			repo: `${org}/${name}`
		}),
		for_machine_types = list_machine_types({
			project,
			access_token: locals.gcp!.access_token,
			zone
		}),
		[branches, machine_types] = await Promise.all([
			for_branches,
			for_machine_types
		]);
	return { branches, machine_types, zone };
};

export const POST: Action = async ({ request, params, locals }) => {
	const formData = await request.formData(),
		branch = formData.get('branch')! as string,
		name = formData.get('name')! as string,
		diskSize = parseInt(formData.get('disk_size')! as string),
		startup = formData.get('startup')! as string,
		machineType = formData.get('machine_type')! as string,
		{ org, name: repoName, zone } = params,
		repo = `${org}/${repoName}`,
		sshKeys = await ssh_keys()
			.select('value')
			.eq('id', locals.gh!.user.login)
			.then((res) => res.data!.map((i) => i.value));
	await create_instance({
		project: locals.gcp_project!.id,
		gh_access_token: locals.gh!.access_token,
		gcp_access_token: locals.gcp!.access_token,
		zone,
		machineType,
		name,
		diskSize,
		startup,
		repo,
		sshKeys,
		branch
	});
	throw redirect(302, routes.WORKSPACE.INSTANCES.LIST);
};
