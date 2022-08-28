import { dsn, environment } from '$lib/configs/sentry.json';
import strings from '$lib/constants/strings';
import { parse_access_otken } from '$lib/helpers/cookie';
import { get_user } from '$lib/helpers/github';
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
		const access_token = parse_access_otken(
			event.request.headers.get('cookie') || ''
		);
		if (access_token?.length) {
			event.locals.user = {
				...(await get_user(access_token)),
				ip_address: event.getClientAddress()
			};
			sentry.setUser(event.locals.user || null);
		}
		return resolve(event);
	} catch (e) {
		const event_id = sentry.captureException(e);
		return new Response(strings.OOPS, {
			status: 500,
			statusText: `event_id: ${event_id}`
		});
	}
};
