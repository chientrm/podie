import routes from '$lib/constants/routes';

const check_ok = (res: Response) => {
	if (!res.ok) {
		throw new Error(JSON.stringify(res));
	}
	return res;
};

export const get_gcp_tokens = async ({
	client_id,
	client_secret,
	code,
	redirect_uri
}: {
	client_id: string;
	client_secret: string;
	code: string;
	redirect_uri: string;
}) => {
	const body = new URLSearchParams();
	body.append('client_id', client_id);
	body.append('client_secret', client_secret);
	body.append('code', code);
	body.append('grant_type', 'authorization_code');
	body.append('include_granted_scopes', 'true');
	body.append('redirect_uri', redirect_uri);
	const res = check_ok(await fetch(routes.GCP.TOKEN, { method: 'POST', body }));
	return await res.json<{ access_token: string; expires_in: number }>();
};

const f = (url: string, access_token: string) =>
	fetch(url, {
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${access_token}`
		}
	}).then(check_ok);

export const list_projects = (access_token: string) =>
	f(routes.GCP.PROJECT.LIST, access_token)
		.then(check_ok)
		.then((res) => res.json<{ projects: GCP.Project[] }>());