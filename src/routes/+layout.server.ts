import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => ({
	gh_user: locals.gh?.user,
	gcp_user: locals.gcp?.user,
	gcp_project: locals.gcp_project
});
