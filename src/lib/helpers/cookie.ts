import { parse, serialize } from 'cookie';

const ID_TOKEN = 'idToken';

const setCookie = (name: string, value: string) => ({
	'Set-Cookie': serialize(name, value, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: true
	})
});

export const parseIdToken = (cookieString: string) =>
	parse(cookieString)[ID_TOKEN];

export const login = (idToken: string) => setCookie(ID_TOKEN, idToken);

export const LOGOUT = setCookie(ID_TOKEN, '');
