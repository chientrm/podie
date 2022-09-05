import podie from '$lib/constants/podie';
import routes from '$lib/constants/routes';
import { create_image, list_instances, list_regions } from '$lib/helpers/gcp';
import { redirect } from '@sveltejs/kit';
import type { Action, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) =>
	Promise.all([
		list_instances({ id: podie.USER.GH(locals.user!.gh!.id).GCP.PID })
			.then((instances) => instances.filter((i) => i.status === 'RUNNING'))
			.then((instances) => instances.map(({ name, zone }) => ({ name, zone }))),
		list_regions({ project: podie.USER.GH(locals.user!.gh!.id).GCP.PID }).then(
			(regions) => Object.keys(regions)
		)
	]).then(([instances, regions]) => ({ instances, regions }));

export const POST: Action = async ({ request, locals }) => {
	const for_form = request.formData().then((formData) => ({
		name: formData.get('name')! as string,
		instance_name: formData.get('instance_name')! as string,
		instance_zone: formData.get('instance_zone')! as string,
		region: formData.get('region')! as string
	}));
	await for_form.then(({ name, instance_name, instance_zone, region }) =>
		create_image({
			project: podie.USER.GH(locals.user!.gh!.id).GCP.PID,
			name,
			instance_name,
			instance_zone,
			region
		})
	);
	throw redirect(302, routes.WORKSPACE.IMAGES.LIST);
};
