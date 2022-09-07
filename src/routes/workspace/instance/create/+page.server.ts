import podie from '$lib/constants/podie';
import routes from '$lib/constants/routes';
import { list_regions } from '$lib/helpers/gcp';
import { list_repoes } from '$lib/helpers/github';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) =>
	Promise.all([
		list_repoes(locals.user!.gh!.access_token).then((repoes) =>
			repoes.map(({ full_name }) => ({ full_name }))
		),
		list_regions({ project: podie.USER.GH(locals.user!.gh!.id).GCP.PID })
	]).then(([repoes, regions]) => ({ repoes, regions }));

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData(),
			full_name = formData.get('full_name')! as string,
			region = formData.get('region')! as string,
			zone = formData.get('zone')! as string;
		throw redirect(
			303,
			routes.WORKSPACE.INSTANCES.CREATE.FULL_NAME(full_name)
				.REGION(region)
				.ZONE(zone)
		);
	}
};
