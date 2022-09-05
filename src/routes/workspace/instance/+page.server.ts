import podie from '$lib/constants/podie';
import { get_instances } from '$lib/helpers/cloudflare';
import { list_images, list_instances } from '$lib/helpers/gcp';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const ghid = locals.user!.gh!.id,
		project = podie.USER.GH(ghid).GCP.PID,
		list_inst = async () => {
			try {
				return await Promise.all([
					list_instances({ id: project }),
					list_images({ project })
				]);
			} catch {}
			return [];
		};
	return Promise.all([
		list_inst(),
		get_instances(locals.PODIE, podie.USER.GH(ghid).KEY)
	]).then(([[gcp_instances, gcp_images], podie_instances]) => ({
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
		gcp_images: new Set(gcp_images.items?.map((i) => i.name)),
		podie_instances
	}));
};
