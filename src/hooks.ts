import { dsn, environment } from '$lib/configs/sentry.json';
import strings from '$lib/constants/strings';
import type { Handle } from '@sveltejs/kit';
import Toucan from 'toucan-js';

export const handle: Handle = async ({ event, resolve }) => {
	const { request } = event,
		sentry = new Toucan({
			dsn,
			request,
			allowedCookies: /(.*)/,
			allowedHeaders: /(.*)/,
			allowedSearchParams: /(.*)/,
			environment
		});
	try {
		return resolve(event);
	} catch (e) {
		const event_id = sentry.captureException(e);
		return new Response(`${strings.OOPS}. event_id: ${event_id}`, {
			status: 500
		});
	}
};
