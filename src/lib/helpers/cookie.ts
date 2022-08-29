import { parse, serialize } from 'cookie';

const GH_ACCESS_TOKEN = 'gh_access_token';
const GCP_ACCESS_TOKEN = 'gcp_access_token';
const GCP_PROJECT_ID = 'gcp_project_id';

const set_cookie = ({
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

const parse_cookie = ({
	request,
	name
}: {
	request: Request;
	name: string;
}): string | undefined => parse(request.headers.get('cookie') || '')[name];

export const parse_gh_access_token = (request: Request) =>
	parse_cookie({ request, name: GH_ACCESS_TOKEN });

export const parse_gcp_access_token = (request: Request) =>
	parse_cookie({ request, name: GCP_ACCESS_TOKEN });

export const parse_gcp_project_id = (request: Request) =>
	parse_cookie({ request, name: GCP_PROJECT_ID });

export const login_gh = (access_token: string) =>
	set_cookie({ name: GH_ACCESS_TOKEN, value: access_token });

export const login_gcp = ({
	access_token,
	expires_in
}: {
	access_token: string;
	expires_in: number;
}) => set_cookie({ name: GCP_ACCESS_TOKEN, value: access_token, expires_in });

export const set_gcp_project_id = (id: string) =>
	set_cookie({ name: GCP_PROJECT_ID, value: id });
