import { parse, serialize } from 'cookie';

const GH = 'gh',
	GCP = 'gcp',
	GCP_PROJECT = 'gcp_proj',
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
	parse_gh = (request: Request) => parse_cookie({ request, name: GH }),
	set_gh = (value: string) => set_cookie({ name: GH, value }),
	parse_gcp = (request: Request) => parse_cookie({ request, name: GCP }),
	set_gcp = ({ value, maxAge }: { value: string; maxAge: number }) =>
		set_cookie({ name: GCP, value, maxAge }),
	parse_gcp_project = (request: Request) =>
		parse_cookie({ request, name: GCP_PROJECT }),
	set_gcp_project = (id: string) =>
		set_cookie({ name: GCP_PROJECT, value: id });

export {
	parse_gh,
	set_gh,
	parse_gcp,
	set_gcp,
	parse_gcp_project,
	set_gcp_project
};
