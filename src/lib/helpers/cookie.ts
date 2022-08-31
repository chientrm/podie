import { parse, serialize } from 'cookie';

const GH = 'gh',
	GCP = 'gcp',
	GCP_PID = 'gcp_pid',
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
	parse_gcp_pid = (request: Request) =>
		parse_cookie({ request, name: GCP_PID }),
	set_gcp_pid = (id: string) => set_cookie({ name: GCP_PID, value: id });

export { parse_gh, set_gh, parse_gcp, set_gcp, parse_gcp_pid, set_gcp_pid };
