import podie from '$lib/constants/podie';
import { open_all_ports } from '$lib/helpers/gcp';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const project = podie.USER.GH(locals.user!.gh!.id).GCP.PID;
	let message = undefined;
	try {
		await open_all_ports({ project });
	} catch (e: any) {
		message = e.message;
	}
	return { project, message };
};

export const actions: Actions = { default: () => {} };
