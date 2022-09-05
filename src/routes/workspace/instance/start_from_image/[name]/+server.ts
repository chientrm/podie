import podie from '$lib/constants/podie';
import routes from '$lib/constants/routes';
import { get_instances, get_ssh_keys } from '$lib/helpers/cloudflare';
import { create_instance } from '$lib/helpers/gcp';
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals, params }) => {
	const name = params.name!,
		gh = locals.user!.gh!,
		ghid = gh.id,
		key = podie.USER.GH(ghid).KEY,
		project = podie.USER.GH(ghid).GCP.PID,
		for_keys = get_ssh_keys(locals.PODIE, key),
		for_instance = get_instances(locals.PODIE, key).then((res) => res[name]!),
		for_create_gcp_instance = Promise.all([for_keys, for_instance]).then(
			([keys, { disk_size, machine_type, branch, org, repo_name, zone }]) =>
				create_instance({
					project,
					gh,
					zone,
					machine_type,
					disk_size,
					name,
					org,
					repo_name,
					keys,
					branch,
					source_image: `projects/${project}/global/images/${name}`
				})
		);
	await for_create_gcp_instance;
	throw redirect(302, routes.WORKSPACE.INSTANCES.LIST);
};
