import podie from '$lib/constants/podie';
import { get_instances } from '$lib/helpers/cloudflare';
import { list_instances } from '$lib/helpers/gcp';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const ghid = locals.user!.gh!.id,
		list_inst = async () => {
			try {
				return list_instances({ id: podie.USER.GH(ghid).GCP.PID });
			} catch {}
			return [];
		};
	return Promise.all([
		list_inst(),
		get_instances(locals.PODIE, podie.USER.GH(ghid).KEY)
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
};
