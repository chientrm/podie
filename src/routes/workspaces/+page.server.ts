import { parse_access_token } from '$lib/helpers/cookie';
import { list_repoes } from '$lib/helpers/github';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request }) => {
	const access_token = parse_access_token(request);
	const repoes = await list_repoes(access_token);
	return { repoes };
};
