import podie from '$lib/constants/podie';
import { list_images } from '$lib/helpers/gcp';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) =>
	list_images({ project: podie.USER.GH(locals.user!.gh!.id).GCP.PID })
		.then(
			(images) =>
				images.items?.map(({ name, status, diskSizeGb, storageLocations }) => ({
					name,
					status,
					diskSizeGb,
					region: storageLocations ? storageLocations[0] : ''
				})) ?? []
		)
		.then((images) => ({ images }));
