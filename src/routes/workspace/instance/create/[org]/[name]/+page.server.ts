import podie from '$lib/constants/podie';
import routes from '$lib/constants/routes';
import { list_regions } from '$lib/helpers/gcp';
import { redirect } from '@sveltejs/kit';
import type { Action, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) =>
	list_regions({ project: podie.USER.GH(locals.user!.gh!.id).GCP.PID }).then(
		(regions) => ({ regions })
	);

export const POST: Action = async ({ request, params }) => {
	const { org, name } = params,
		formData = await request.formData(),
		region = formData.get('region')! as string,
		zone = formData.get('zone')! as string;
	throw redirect(
		302,
		routes.WORKSPACE.INSTANCES.CREATE.FULL_NAME(`${org}/${name}`)
			.REGION(region)
			.ZONE(zone)
	);
};
