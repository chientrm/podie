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
	return await res.json<{
		access_token: string;
		refresh_token: string;
		expires_in: number;
	}>();
};

const f = (url: string, access_token: string, method: string = 'GET') =>
	fetch(url, {
		method,
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${access_token}`
		}
	}).then(check_ok);

export const get_user = (access_token: string) =>
	f(routes.GCP.USER_INFO, access_token).then((res) =>
		res.json<{ name: string }>()
	);

export const list_projects = (access_token: string) =>
	f(routes.GCP.PROJECTS.LIST, access_token).then((res) =>
		res.json<{ projects: { projectId: string; name: string }[] }>()
	);

export const get_project = ({
	id,
	access_token
}: {
	id: string;
	access_token: string;
}) =>
	f(routes.GCP.PROJECT(id).GET, access_token).then((res) =>
		res.json<{ projectId: string; name: string }>()
	);

const extract_zone = (zone: string) => zone.split('/zones/').pop();

export const list_workspaces = ({
	id,
	access_token
}: {
	id: string;
	access_token: string;
}) =>
	f(routes.GCP.PROJECT(id).INSTANCES.AGGREGATE, access_token)
		.then((res) =>
			res.json<{
				items: Record<
					string,
					{
						instances: {
							id: string;
							name: string;
							machineType: string;
							zone: string;
							selfLink: string;
							status: string;
							networkInterfaces: {
								accessConfigs: { name: string; natIP: string }[];
							}[];
						}[];
					}
				>;
			}>()
		)
		.then((res) =>
			Object.values(res.items)
				.filter((v) => v.instances)
				.map((v) => v.instances)
				.flat()
				.map((w) => ({ ...w, zone: extract_zone(w.zone)! }))
		);

export const delete_instance = ({
	project,
	zone,
	resourceId,
	access_token
}: {
	project: string;
	zone: string;
	resourceId: string;
	access_token: string;
}) =>
	f(
		routes.GCP.PROJECT(project).ZONE(zone).INSTANCE(resourceId).DELETE,
		access_token,
		'DELETE'
	);
