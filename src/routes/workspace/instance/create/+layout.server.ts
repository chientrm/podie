import { list_regions } from '$lib/helpers/gcp';
import { list_repoes } from '$lib/helpers/github';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals }) =>
	Promise.all([
		list_repoes(locals.gh!.access_token),
		list_regions({
			project: locals.gcp_pid!,
			access_token: locals.gcp!.access_token
		})
	]).then(([repoes, regions]) => ({ repoes, regions }));
