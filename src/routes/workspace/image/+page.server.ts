import podie from '$lib/constants/podie';
import { list_images } from '$lib/helpers/gcp';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const ghid = locals.user!.gh!.id,
		project = podie.USER.GH(ghid).GCP.PID,
		list_imgs = async () => {
			try {
				return await list_images({ project });
			} catch {}
			return undefined;
		};
	const result = await list_imgs(),
		images = (result?.items ?? []).map(
			({ name, status, diskSizeGb, archiveSizeBytes, storageLocations }) => ({
				name,
				status,
				diskSizeGb,
				archiveSizeGb: (archiveSizeBytes / 2 ** 30).toFixed(2),
				region: storageLocations ? storageLocations[0] : ''
			})
		);
	return { images };
};
