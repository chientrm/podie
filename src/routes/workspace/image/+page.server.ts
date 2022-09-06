import podie from '$lib/constants/podie';
import { list_images } from '$lib/helpers/gcp';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) =>
	list_images({ project: podie.USER.GH(locals.user!.gh!.id).GCP.PID })
		.then(
			(images) =>
				images.items?.map(
					({
						name,
						status,
						diskSizeGb,
						archiveSizeBytes,
						storageLocations
					}) => ({
						name,
						status,
						diskSizeGb,
						archiveSizeGb: (archiveSizeBytes / 2 ** 30).toFixed(2),
						region: storageLocations ? storageLocations[0] : ''
					})
				) ?? []
		)
		.then((images) => ({ images }));
