import { get_instances } from '$lib/helpers/cloudflare';
import { list_instances } from '$lib/helpers/gcp';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) =>
	Promise.all([
		list_instances({
			id: locals.gcp_project!.id,
			access_token: locals.gcp!.access_token
		}),
		get_instances(locals.PODIE, locals.gh!.user.login)
	]).then(([gcp_instances, podie_instances]) => ({
		gcp_instances: gcp_instances.reduce(
			(a, { name, status, networkInterfaces, zone }) => ({
				...a,
				[name]: {
					status,
					natIP: networkInterfaces[0].accessConfigs[0].natIP,
					zone
				}
			}),
			{} as Record<string, { status: string; natIP: string; zone: string }>
		),
		podie_instances
	}));
