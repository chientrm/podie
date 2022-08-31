import { client_id, client_secret } from '$lib/configs/github.json';
import routes from '$lib/constants/routes';
import strings from '$lib/constants/strings';
import { check_ok } from '$lib/utils';

const get_access_token = (code: string) =>
		fetch(routes.GITHUB.ACCESS_TOKEN({ client_id, client_secret, code }), {
			headers: { Accept: 'application/json' }
		})
			.then(check_ok)
			.then((res) => res.json<{ access_token: string }>())
			.then((data) => data.access_token),
	f = (url: string, access_token: string) =>
		fetch(url, {
			headers: {
				Accept: 'application/vnd.github+json',
				Authorization: `token ${access_token}`,
				'User-Agent': strings.PODIE
			}
		}).then(check_ok),
	get_user = (access_token: string) =>
		f(routes.GITHUB.USER, access_token)
			.then((res) => res.json<{ login: string; html_url: string }>())
			.then(({ login, html_url }) => ({ login, html_url })),
	list_repoes = (access_token: string) =>
		f(routes.GITHUB.REPOS, access_token)
			.then((res) => res.json<{ full_name: string }[]>())
			.then((res) => res.map(({ full_name }) => ({ full_name }))),
	list_branches = ({
		access_token,
		repo
	}: {
		access_token: string;
		repo: string;
	}) =>
		f(routes.GITHUB.REPO(repo).BRANCHES.LIST, access_token)
			.then((res) => res.json<{ name: string }[]>())
			.then((res) => res.map(({ name }) => ({ name })));

export { get_access_token, get_user, list_repoes, list_branches };
