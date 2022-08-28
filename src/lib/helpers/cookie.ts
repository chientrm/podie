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

const parse_cookie = (request: Request, name: string) =>
	parse(request.headers.get('cookie') || '')[name];

export const parse_access_token = (request: Request) =>
	parse_cookie(request, ACCESS_TOKEN);

export const login = (access_token: string) =>
	setCookie(ACCESS_TOKEN, access_token);

export const LOGOUT = setCookie(ACCESS_TOKEN, '');
