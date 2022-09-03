import { parse, serialize } from 'cookie';

const GH = 'gh_1',
	GCP = 'gcp',
	GCP_PROJECT = 'gcp_proj',
	USER = 'user',
	set_cookie = ({
		name,
		value,
		maxAge
	}: {
		name: string;
		value: string;
		maxAge?: number;
	}) => ({
		'Set-Cookie': serialize(name, value, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: true,
			maxAge
		})
	}),
	parse_cookie = ({
		request,
		name
	}: {
		request: Request;
		name: string;
	}): string | undefined => parse(request.headers.get('cookie') || '')[name],
	parse_user = (request: Request) => parse_cookie({ request, name: USER }),
	set_user = (value: string) => set_cookie({ name: USER, value }),
	parse_gcp = (request: Request) => parse_cookie({ request, name: GCP }),
	set_gcp = ({ value, maxAge }: { value: string; maxAge: number }) =>
		set_cookie({ name: GCP, value, maxAge }),
	parse_gcp_project = (request: Request) =>
		parse_cookie({ request, name: GCP_PROJECT }),
	set_gcp_project = (id: string) =>
		set_cookie({ name: GCP_PROJECT, value: id });

export {
	parse_user,
	set_user,
	parse_gcp,
	set_gcp,
	parse_gcp_project,
	set_gcp_project
};
