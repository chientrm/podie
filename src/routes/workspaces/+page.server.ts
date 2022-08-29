import { parse_gh_access_token } from '$lib/helpers/cookie';
import { list_repoes } from '$lib/helpers/github';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request }) => {
	const gh_access_token = parse_gh_access_token(request)!;
	const repoes = await list_repoes(gh_access_token);
	return { repoes };
};
