import supabase from '$lib/helpers/supabase';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	try {
	} catch (e) {}
	event.locals.supabase = supabase;
	return resolve(event);
};
