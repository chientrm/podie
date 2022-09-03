import routes from '$lib/constants/routes';
import { check_ok } from '$lib/utils';
import { importPKCS8, SignJWT } from 'jose';
import { client_email, private_key, token_uri } from '$lib/configs/gcp.json';

const PROJECT = 'https://compute.googleapis.com/compute/v1/projects/',
	scopes = [
		'https://www.googleapis.com/auth/compute',
		'https://www.googleapis.com/auth/cloud-platform'
	],
	for_key = importPKCS8(private_key, 'RS256'),
	get_jwt = async () =>
		new SignJWT({ scope: scopes.join(' ') })
			.setProtectedHeader({ alg: 'RS256' })
			.setIssuedAt()
			.setIssuer(client_email)
			.setAudience(token_uri)
			.setExpirationTime('5s')
			.sign(await for_key),
	grant_type = 'urn:ietf:params:oauth:grant-type:jwt-bearer',
	get_auth = async () =>
		fetch(token_uri, {
			method: 'post',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams({ grant_type, assertion: await get_jwt() })
		})
			.then((res) => res.json<{ access_token: string }>())
			.then((data) => data.access_token as string)
			.then((token) => ({ Authorization: 'Bearer ' + token })),
	f = async (url: string, method: string = 'GET') =>
		fetch(url, { method, headers: await get_auth() }).then(check_ok),
	extract_zone = (zone: string) => zone.split('/zones/').pop()!,
	list_instances = ({ id }: { id: string }) =>
		f(routes.GCP.PROJECT(id).INSTANCES.AGGREGATE)
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
		resourceId
	}: {
		project: string;
		zone: string;
		resourceId: string;
	}) =>
		f(
			routes.GCP.PROJECT(project).ZONE(zone).INSTANCE(resourceId).DELETE,
			'DELETE'
		),
	list_regions = ({ project }: { project: string }) =>
		f(routes.GCP.PROJECT(project).REGIONS.LIST)
			.then((res) => res.json<{ items: { name: string; zones: string[] }[] }>())
			.then((res) =>
				res.items
					.map((i) => ({ ...i, zones: i.zones.map(extract_zone) }))
					.reduce(
						(a, b) => ({ ...a, [b.name]: b.zones }),
						{} as Record<string, string[]>
					)
			),
	list_machine_types = ({ project, zone }: { project: string; zone: string }) =>
		f(routes.GCP.PROJECT(project).ZONE(zone).MACHINE_TYPES.LIST)
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
				'projects/debian-cloud/global/images/debian-11-bullseye-v20220822',
			diskType: `zones/${zone}/diskTypes/pd-ssd`
		},
		autoDelete: true,
		boot: true
	}),
	create_instance = async ({
		project,
		zone,
		machineType,
		name,
		diskSize,
		startup,
		repo,
		sshKeys,
		branch,
		gh
	}: {
		project: string;
		zone: string;
		machineType: string;
		name: string;
		diskSize: number;
		startup: string;
		repo: string;
		branch: string;
		sshKeys: string[];
		gh: { access_token: string; name: string; email: string };
	}) =>
		fetch(routes.GCP.PROJECT(project).ZONE(zone).INSTANCES.INSERT, {
			method: 'POST',
			headers: await get_auth(),
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
								'apt-get update',
								'apt-get install -y git',
								`git clone --branch ${branch} https://${gh.access_token}@github.com/${repo} /root/workspace`,
								`git config --global user.name "${gh.name}"`,
								`git config --global user.email "${gh.email}"`,
								"sed -i 's/#PubkeyAuthentication yes/PubkeyAuthentication yes/g' /etc/ssh/sshd_config",
								"sed -i 's/PermitRootLogin no/PermitRootLogin yes/g' /etc/ssh/sshd_config",
								'service ssh restart',
								'cd /root/workspace',
								startup
							].join('\n')
						},
						{
							key: 'ssh-keys',
							value: `root:${sshKeys.join('\n')}`
						}
					]
				}
			})
		}).then(check_ok);

export {
	list_instances,
	delete_instance,
	create_instance,
	list_regions,
	list_machine_types
};
