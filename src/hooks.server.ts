import { dsn, environment } from '$lib/configs/sentry.json';
import { kv } from '$lib/helpers/cloudflare';
import { get_user } from '$lib/helpers/cookie';
import { decrypt } from '$lib/helpers/encryption';
import type { Handle, HandleServerError } from '@sveltejs/kit';
import Toucan from 'toucan-js';

const podie: Record<string, string> = {};

export const handle: Handle = async ({ event, resolve }) => {
	const { cookies } = event,
		user_cookie = get_user(cookies);
	if (user_cookie) {
		//@ts-ignore
		event.locals.user = await decrypt(user_cookie);
	}
	event.locals.PODIE = event.platform?.env.PODIE || kv(podie);
	return resolve(event);
};

export const handleError: HandleServerError = ({ error, event }) => {
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
