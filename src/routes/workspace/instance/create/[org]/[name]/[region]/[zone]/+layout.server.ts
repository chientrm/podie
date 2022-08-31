import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ parent }) => {
	const { repoes, regions } = await parent();
	console.log({ repoes, regions });
};
