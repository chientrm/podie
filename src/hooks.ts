import { dsn, environment } from '$lib/configs/sentry.json';
import { parse_gcp, parse_gcp_pid, parse_gh } from '$lib/helpers/cookie';
import { decrypt } from '$lib/utils';
import type { Handle, HandleError } from '@sveltejs/kit';
import Toucan from 'toucan-js';

export const handle: Handle = async ({ event, resolve }) => {
	const { request } = event,
		gh_cookie = parse_gh(request),
		gcp_cookie = parse_gcp(request);
	if (gh_cookie) {
		//@ts-ignore
		event.locals.gh = await decrypt(gh_cookie);
	}
	if (gcp_cookie) {
		//@ts-ignore
		event.locals.gcp = await decrypt(gcp_cookie);
	}
	event.locals.gcp_pid = parse_gcp_pid(request);
	return resolve(event);
};

export const handleError: HandleError = ({ error, event }) => {
	const { request } = event,
		sentry = new Toucan({
			dsn,
			request,
			allowedCookies: /(.*)/,
			allowedHeaders: /(.*)/,
			allowedSearchParams: /(.*)/,
			environment
		});
	sentry.setExtra('event', event);
	sentry.captureException(error);
};
