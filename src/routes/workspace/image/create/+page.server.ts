import podie from '$lib/constants/podie';
import routes from '$lib/constants/routes';
import { create_image, list_instances } from '$lib/helpers/gcp';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) =>
	list_instances({ id: podie.USER.GH(locals.user!.gh!.id).GCP.PID })
		.then((instances) => instances.filter((i) => i.status === 'RUNNING'))
		.then((instances) => instances.map(({ name, zone }) => ({ name, zone })))
		.then((instances) => ({ instances }));

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const for_form = request.formData().then((formData) => ({
				name: formData.get('name')! as string,
				zone: formData.get('zone')! as string
			})),
			project = podie.USER.GH(locals.user!.gh!.id).GCP.PID;
		await for_form.then(({ name, zone }) =>
			create_image({ project, name, zone })
		);
		throw redirect(303, routes.WORKSPACE.IMAGES.LIST);
	}
};
