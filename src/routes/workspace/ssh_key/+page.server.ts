import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) =>
	locals.SSH_KEYS.get<Podie.SshKeys>(locals.gh!.user.login, 'json')
		.then((keys) => keys || {})
		.then((keys) => ({ keys }));
