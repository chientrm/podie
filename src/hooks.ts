import { parse_access_otken } from '$lib/helpers/cookie';
import { get_user } from '$lib/helpers/github';
import { crashes } from '$lib/helpers/supabase';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	try {
		const access_token = parse_access_otken(
			event.request.headers.get('cookie') || ''
		);
		if (access_token?.length) {
			event.locals.user = await get_user(access_token);
		}
		return resolve(event);
	} catch (error) {
		await crashes.insert({
			event: JSON.stringify(event),
			/** @ts-ignore */
			error: error.message
		});
		throw error;
	}
};
