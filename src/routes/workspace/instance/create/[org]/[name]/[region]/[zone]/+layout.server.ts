import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ parent, params }) => {
	const { repoes, regions } = await parent();
	const { org, name, region, zone } = params;
	return { repoes, regions, org, name, region, zone };
};
