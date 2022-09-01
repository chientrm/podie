import routes from '$lib/constants/routes';
import { create_instance } from '$lib/helpers/gcp';
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals, params }) => {
	const name = params.name!,
		key = locals.gh!.user.login,
		for_keys = locals.SSH_KEYS.get<Podie.SshKeys>(key, 'json').then(
			(res) => res || {}
		),
		for_instance = locals.INSTANCES.get<Podie.Instances>(key, 'json').then(
			(res) => res![name]!
		),
		for_create_gcp_instance = Promise.all([for_keys, for_instance]).then(
			([keys, { diskSize, startup, machineType, branch, repo, zone }]) =>
				create_instance({
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
	await for_create_gcp_instance;
	throw redirect(302, routes.WORKSPACE.INSTANCES.LIST);
};
