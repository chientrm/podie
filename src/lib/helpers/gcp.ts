import routes from '$lib/constants/routes';
import { check_ok } from '$lib/utils';

const get_gcp_tokens = async ({
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
		return await fetch(routes.GCP.TOKEN, { method: 'POST', body })
			.then(check_ok)
			.then((res) =>
				res.json<{
					access_token: string;
					refresh_token: string;
					expires_in: number;
				}>()
			);
	},
	f = (url: string, access_token: string, method: string = 'GET') =>
		fetch(url, {
			method,
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${access_token}`
			}
		}).then(check_ok),
	get_user = (access_token: string) =>
		f(routes.GCP.USER_INFO, access_token).then((res) =>
			res.json<{ name: string }>()
		),
	list_projects = (access_token: string) =>
		f(routes.GCP.PROJECTS.LIST, access_token).then((res) =>
			res.json<{ projects: { projectId: string; name: string }[] }>()
		),
	get_project = ({ id, access_token }: { id: string; access_token: string }) =>
		f(routes.GCP.PROJECT(id).GET, access_token).then((res) =>
			res.json<{ projectId: string; name: string }>()
		),
	extract_zone = (zone: string) => zone.split('/zones/').pop()!,
	list_instances = ({
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
					.map((w) => ({ ...w, zone: extract_zone(w.zone) }))
			),
	delete_instance = ({
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
		),
	list_regions = ({
		project,
		access_token
	}: {
		project: string;
		access_token: string;
	}) =>
		f(routes.GCP.PROJECT(project).REGIONS.LIST, access_token)
			.then((res) => res.json<{ items: { name: string; zones: string[] }[] }>())
			.then((res) =>
				res.items
					.map((i) => ({ ...i, zones: i.zones.map(extract_zone) }))
					.reduce(
						(a, b) => ({ ...a, [b.name]: b.zones }),
						{} as Record<string, string[]>
					)
			),
	list_machine_types = ({
		project,
		access_token,
		zone
	}: {
		project: string;
		access_token: string;
		zone: string;
	}) =>
		f(routes.GCP.PROJECT(project).ZONE(zone).MACHINE_TYPES.LIST, access_token)
			.then((res) =>
				res.json<{ items: { name: string; description: string }[] }>()
			)
			.then((res) =>
				res.items.map(({ name, description }) => ({ name, description }))
			),
	DISK = ({ zone, diskSize }: { zone: string; diskSize: number }) => ({
		initializeParams: {
			diskSizeGb: diskSize,
			sourceImage:
				'projects/cos-cloud/global/images/cos-stable-97-16919-103-28',
			diskType: `zones/${zone}/diskTypes/pd-ssd`
		},
		autoDelete: true,
		boot: true
	}),
	create_instance = ({
		project,
		gcp_access_token,
		gh_access_token,
		zone,
		machineType,
		name,
		diskSize,
		startup,
		repo,
		sshKeys,
		branch
	}: {
		project: string;
		gcp_access_token: string;
		gh_access_token: string;
		zone: string;
		machineType: string;
		name: string;
		diskSize: number;
		startup: string;
		repo: string;
		branch: string;
		sshKeys: string[];
	}) =>
		fetch(routes.GCP.PROJECT(project).ZONE(zone).INSTANCES.INSERT, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${gcp_access_token}`
			},
			body: JSON.stringify({
				name,
				machineType: `zones/${zone}/machineTypes/${machineType}`,
				disks: [DISK({ diskSize, zone })],
				networkInterfaces: [{ accessConfigs: [{ networkTier: 'PREMIUM' }] }],
				metadata: {
					items: [
						{
							key: 'startup-script',
							value: [
								`git clone --branch ${branch} https://${gh_access_token}@github.com/${repo} /home/podie/workspace`,
								'cd /home/podie/workspace',
								startup
							].join('\n')
						},
						{
							key: 'ssh-keys',
							value: `podie:${sshKeys.join('\n')}`
						}
					]
				}
			})
		}).then(check_ok);

export {
	get_gcp_tokens,
	get_user,
	list_projects,
	list_instances,
	delete_instance,
	create_instance,
	list_regions,
	list_machine_types
};
