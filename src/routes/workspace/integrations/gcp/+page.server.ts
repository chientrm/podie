import podie from '$lib/constants/podie';
import { list_instances, open_all_ports } from '$lib/helpers/gcp';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const id = podie.USER.GH(locals.user!.gh!.id).GCP.PID;
	let message = undefined;
	try {
		await Promise.all([
			list_instances({ id }),
			open_all_ports({ project: id })
		]);
	} catch (e: any) {
		message = e.message;
	}
	return { id, message };
};

export const actions: Actions = {
	default: () => {}
};
