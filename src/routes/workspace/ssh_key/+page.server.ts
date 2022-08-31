import { ssh_keys } from '$lib/helpers/supabase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) =>
	ssh_keys()
		.select('name, value')
		.eq('id', locals.gh!.user.login)
		.then((res) => ({ keys: res.data ?? [] }));
