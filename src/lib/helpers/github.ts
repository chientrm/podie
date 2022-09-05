import { client_id, client_secret } from '$lib/configs/github.json';
import routes from '$lib/constants/routes';
import strings from '$lib/constants/strings';
import { check_ok } from '$lib/utils';

const headers = {
		Accept: 'application/vnd.github+json',
		'User-Agent': strings.PODIE
	},
	get_access_token = (code: string) =>
		fetch(routes.GITHUB.ACCESS_TOKEN({ client_id, client_secret, code }), {
			headers: { Accept: 'application/json' }
		})
			.then(check_ok)
			.then((res) => res.json<{ access_token: string }>())
			.then((data) => data.access_token),
	f = (url: string, access_token: string) =>
		fetch(url, {
			headers: { ...headers, Authorization: `token ${access_token}` }
		}).then(check_ok),
	get_user = (access_token: string) =>
		f(routes.GITHUB.USER, access_token).then((res) =>
			res.json<{
				id: number;
				login: string;
				html_url: string;
				email: string;
				name: string;
			}>()
		),
	get_email = (access_token: string) =>
		f(routes.GITHUB.EMAILS, access_token)
			.then((res) => res.json<{ email: string }[]>())
			.then((res) => res[0].email),
	list_repoes = (access_token: string) =>
		f(routes.GITHUB.REPOS, access_token)
			.then((res) => res.json<{ full_name: string }[]>())
			.then((res) => res.map(({ full_name }) => ({ full_name }))),
	list_branches = ({
		access_token,
		org,
		repo_name
	}: {
		access_token: string;
		org: string;
		repo_name: string;
	}) =>
		f(routes.GITHUB.ORG(org).REPO(repo_name).BRANCHES.LIST, access_token)
			.then((res) => res.json<{ name: string }[]>())
			.then((res) => res.map(({ name }) => ({ name })));

export { get_access_token, get_user, get_email, list_repoes, list_branches };
