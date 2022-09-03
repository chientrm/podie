import podie from '$lib/constants/podie';
import routes from '$lib/constants/routes';
import { get_instances, get_ssh_keys } from '$lib/helpers/cloudflare';
import { create_instance } from '$lib/helpers/gcp';
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals, params }) => {
	const name = params.name!,
		ghid = locals.user!.gh!.id,
		key = podie.USER.GH(ghid).KEY,
		pid = podie.USER.GH(ghid).GCP.PID,
		for_keys = get_ssh_keys(locals.PODIE, key),
		for_instance = get_instances(locals.PODIE, key).then((res) => res[name]!),
		for_create_gcp_instance = Promise.all([for_keys, for_instance]).then(
			([keys, { diskSize, startup, machineType, branch, repo, zone }]) =>
				create_instance({
					project: pid,
					gh: locals.user!.gh!,
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
	await for_create_gcp_instance;
	throw redirect(302, routes.WORKSPACE.INSTANCES.LIST);
};
