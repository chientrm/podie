import { get_ssh_keys } from '$lib/helpers/cloudflare';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) =>
	get_ssh_keys(locals.PODIE, locals.gh!.user.login).then((keys) => ({ keys }));
