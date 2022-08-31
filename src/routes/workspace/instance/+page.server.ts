import { list_instances } from '$lib/helpers/gcp';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) =>
	list_instances({
		id: locals.gcp_pid!,
		access_token: locals.gcp!.access_token
	}).then((instances) => ({
		instances,
		gcp_pid: locals.gcp_pid
	}));
