import routes from '$lib/constants/routes';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { repoes, regions } = await parent(),
		repo = repoes[0].full_name,
		region = Object.keys(regions)[0],
		zone = regions[region][0];
	throw redirect(
		302,
		routes.WORKSPACE.INSTANCES.CREATE.REPO(repo).REGION(region).ZONE(zone)
	);
};
