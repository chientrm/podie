import { parse, serialize } from 'cookie';

const ACCESS_TOKEN = 'access_token';
const GCP_ACCESS_TOKEN = 'gcp_access_token';

const setCookie = ({
	name,
	value,
	expires_in
}: {
	name: string;
	value: string;
	expires_in?: number;
}) => ({
	'Set-Cookie': serialize(name, value, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: true,
		maxAge: expires_in
	})
});

const parse_cookie = (request: Request, name: string) =>
	parse(request.headers.get('cookie') || '')[name];

export const parse_access_token = (request: Request) =>
	parse_cookie(request, ACCESS_TOKEN);

export const parse_gcp_access_token = (request: Request) =>
	parse_cookie(request, GCP_ACCESS_TOKEN);

export const login = (access_token: string) =>
	setCookie({ name: ACCESS_TOKEN, value: access_token });

export const link_gcp = (access_token: string, expires_in: number) =>
	setCookie({ name: GCP_ACCESS_TOKEN, value: access_token, expires_in });

export const LOGOUT = setCookie({ name: ACCESS_TOKEN, value: '' });
