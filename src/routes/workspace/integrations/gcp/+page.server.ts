import podie from '$lib/constants/podie';
import { list_instances } from '$lib/helpers/gcp';
import type { Action, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const id = podie.USER.GH(locals.user!.gh!.id).GCP.PID;
	let message = undefined;
	try {
		await list_instances({ id });
	} catch (e: any) {
		message = e.message;
	}
	return { id, message };
};

export const POST: Action = async ({}) => {};
