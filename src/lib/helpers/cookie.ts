import { parse, serialize } from 'cookie';

const ACCESS_TOKEN = 'access_token';

const setCookie = (name: string, value: string) => ({
	'Set-Cookie': serialize(name, value, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: true
	})
});

export const parse_access_token = (cookie: string) =>
	parse(cookie)[ACCESS_TOKEN];

export const login = (access_token: string) =>
	setCookie(ACCESS_TOKEN, access_token);

export const LOGOUT = setCookie(ACCESS_TOKEN, '');
