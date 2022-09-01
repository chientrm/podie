import { dsn, environment } from '$lib/configs/sentry.json';
import { kv } from '$lib/helpers/cloudflare';
import { parse_gcp, parse_gcp_project, parse_gh } from '$lib/helpers/cookie';
import { decrypt } from '$lib/helpers/encryption';
import type { Handle, HandleError } from '@sveltejs/kit';
import Toucan from 'toucan-js';

const ssh_keys: Record<string, string> = {};
const instances: Record<string, string> = {};

export const handle: Handle = async ({ event, resolve }) => {
	const { request } = event,
		gh_cookie = parse_gh(request),
		gcp_cookie = parse_gcp(request),
		gcp_project_cookie = parse_gcp_project(request);
	if (gh_cookie) {
		//@ts-ignore
		event.locals.gh = await decrypt(gh_cookie);
	}
	if (gcp_cookie) {
		//@ts-ignore
		event.locals.gcp = await decrypt(gcp_cookie);
	}
	if (gcp_project_cookie) {
		//@ts-ignore
		event.locals.gcp_project = await decrypt(gcp_project_cookie);
	}
	event.locals.SSH_KEYS = event.platform?.env.SSH_KEYS || kv(ssh_keys);
	event.locals.INSTANCES = event.platform?.env.INSTANCES || kv(instances);
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
