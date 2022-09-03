import { dsn, environment } from '$lib/configs/sentry.json';
import { kv } from '$lib/helpers/cloudflare';
import { parse_gcp, parse_gcp_project, parse_user } from '$lib/helpers/cookie';
import { decrypt } from '$lib/helpers/encryption';
import type { Handle, HandleError } from '@sveltejs/kit';
import Toucan from 'toucan-js';

const podie: Record<string, string> = {};

export const handle: Handle = async ({ event, resolve }) => {
	const { request } = event,
		user_cookie = parse_user(request);
	if (user_cookie) {
		//@ts-ignore
		event.locals.user = await decrypt(user_cookie);
	}
	event.locals.PODIE = event.platform?.env.PODIE || kv(podie);
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
