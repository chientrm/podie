import routes from '$lib/constants/routes';
import {
	get_instances,
	get_profile,
	get_ssh_keys
} from '$lib/helpers/cloudflare';
import { create_instance } from '$lib/helpers/gcp';
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals, params }) => {
	const name = params.name!,
		key = locals.gh!.user.login,
		for_profile = get_profile(locals.PODIE, key),
		for_keys = get_ssh_keys(locals.PODIE, key),
		for_instance = get_instances(locals.PODIE, key).then((res) => res[name]!),
		for_create_gcp_instance = Promise.all([
			for_profile,
			for_keys,
			for_instance
		]).then(
			([
				profile,
				keys,
				{ diskSize, startup, machineType, branch, repo, zone }
			]) =>
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
	await for_create_gcp_instance;
	throw redirect(302, routes.WORKSPACE.INSTANCES.LIST);
};
