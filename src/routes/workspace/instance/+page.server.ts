import { list_instances } from '$lib/helpers/gcp';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) =>
	Promise.all([
		list_instances({
			id: locals.gcp_project!.id,
			access_token: locals.gcp!.access_token
		}),
		locals.INSTANCES.get<Podie.Instances>(locals.gh!.user.login, 'json').then(
			(res) => res || {}
		)
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
