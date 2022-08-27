import { parse_access_otken } from '$lib/helpers/cookie';
import { get_user } from '$lib/helpers/github';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const access_token = parse_access_otken(
		event.request.headers.get('cookie') || ''
	);
	if (access_token?.length) {
		event.locals.user = await get_user(access_token);
	}
	return resolve(event);
};
