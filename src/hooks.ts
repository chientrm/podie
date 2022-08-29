import { dsn, environment } from '$lib/configs/sentry.json';
import type { HandleError } from '@sveltejs/kit';
import Toucan from 'toucan-js';

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
