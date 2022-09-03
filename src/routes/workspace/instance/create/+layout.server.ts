import podie from '$lib/constants/podie';
import { list_regions } from '$lib/helpers/gcp';
import { list_repoes } from '$lib/helpers/github';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals }) =>
	Promise.all([
		list_repoes(locals.user!.gh!.access_token),
		list_regions({
			project: podie.USER.GH(locals.user!.gh!.id).GCP.PID
		})
	]).then(([repoes, regions]) => ({ repoes, regions }));
