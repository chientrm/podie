import routes from '$lib/constants/routes';
import { LOGOUT } from '$lib/helpers/cookie';
import { redirect, type Action } from '@sveltejs/kit';

export const GET: Action = ({ setHeaders }) => {
	setHeaders(LOGOUT);
	throw redirect(302, routes.HOME);
};
