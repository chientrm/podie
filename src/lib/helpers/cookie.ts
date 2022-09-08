import type { Cookies } from '@sveltejs/kit';

const USER = 'user_1',
	set = ({
		cookies,
		name,
		value
	}: {
		cookies: Cookies;
		name: string;
		value: string;
	}) =>
		cookies.set(name, value, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: true
		}),
	get_cookie = ({ cookies, name }: { cookies: Cookies; name: string }) =>
		cookies.get(name),
	get_user = (cookies: Cookies) => get_cookie({ cookies, name: USER }),
	set_user = (cookies: Cookies, value: string) =>
		set({ cookies, name: USER, value });

export { get_user, set_user };
