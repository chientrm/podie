import routes from '$lib/constants/routes';
import { list_repoes } from '$lib/helpers/github';
import { redirect } from '@sveltejs/kit';
import type { Action, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) =>
	list_repoes(locals.user!.gh!.access_token)
		.then((repoes) => repoes.map(({ full_name }) => ({ full_name })))
		.then((repoes) => ({ repoes }));

export const POST: Action = async ({ request }) => {
	const formData = await request.formData(),
		full_name = formData.get('full_name')! as string;
	throw redirect(
		302,
		routes.WORKSPACE.INSTANCES.CREATE.FULL_NAME(full_name).GET
	);
};
