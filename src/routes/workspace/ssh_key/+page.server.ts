import podie from '$lib/constants/podie';
import { get_ssh_keys } from '$lib/helpers/cloudflare';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) =>
	get_ssh_keys(locals.PODIE, podie.USER.GH(locals.user!.gh!.id).KEY).then(
		(keys) => ({ keys })
	);
