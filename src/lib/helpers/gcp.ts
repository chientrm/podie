import routes from '$lib/constants/routes';
import { check_ok } from '$lib/utils';
import { importPKCS8, SignJWT } from 'jose';
import { client_email, private_key, token_uri } from '$lib/configs/gcp.json';

const scopes = [
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
			.setExpirationTime('5m')
			.sign(await for_key),
	grant_type = 'urn:ietf:params:oauth:grant-type:jwt-bearer',
	get_access_token = async () =>
		fetch(token_uri, {
			method: 'post',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams({ grant_type, assertion: await get_jwt() })
		})
			.then((res) => res.json<{ access_token: string }>())
			.then((data) => data.access_token as string),
	create_auth = (token: string) => ({ Authorization: 'Bearer ' + token }),
	get_auth = () => get_access_token().then(create_auth),
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
								labels: Record<string, string>;
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
	DISK = ({
		zone,
		disk_size,
		source_image
	}: {
		zone: string;
		disk_size: number;
		source_image?: string;
	}) => ({
		initializeParams: {
			diskSizeGb: disk_size,
			sourceImage:
				source_image ??
				'projects/ubuntu-os-cloud/global/images/ubuntu-minimal-2204-jammy-v20220902',
			diskType: `zones/${zone}/diskTypes/pd-ssd`
		},
		autoDelete: true,
		boot: true
	}),
	set_status = ({
		project,
		name,
		token,
		zone,
		status
	}: {
		project: string;
		name: string;
		token: string;
		zone: string;
		status: string;
	}) => [
		`FINGERPRINT=$(curl 'https://compute.googleapis.com/compute/v1/projects/${project}/zones/${zone}/instances/${name}' --header 'Authorization: Bearer ${token}' --header 'Accept: application/json' | jq -r .labelFingerprint)`,
		`curl --request POST 'https://compute.googleapis.com/compute/v1/projects/${project}/zones/${zone}/instances/${name}/setLabels' --header 'Authorization: Bearer ${token}' --header 'Accept: application/json' --header 'Content-Type: application/json' --data '{"labelFingerprint":"'"$FINGERPRINT"'","labels":{"status":"${status}"}}'`
	],
	create_instance = async ({
		project,
		zone,
		machine_type,
		name,
		disk_size,
		org,
		repo_name,
		keys,
		branch,
		gh,
		source_image
	}: {
		project: string;
		zone: string;
		machine_type: string;
		name: string;
		disk_size: number;
		org: string;
		repo_name: string;
		branch: string;
		source_image?: string;
		keys: Record<string, string>;
		gh: { access_token: string; name: string; email: string; login: string };
	}) => {
		const token = await get_access_token(),
			_set_status = (status: string) =>
				set_status({ project, name, zone, token, status }),
			startup_script = [
				'apt-get update && apt-get install -y jq',
				..._set_status('installing'),
				'apt-get install -y git neovim',
				'wget https://github.com/tsl0922/ttyd/releases/download/1.7.1/ttyd.x86_64',
				'mv ttyd.x86_64 /usr/local//bin/ttyd',
				'chmod +x /usr/local/bin/ttyd',
				..._set_status('cloning'),
				`rm -rf /home/${gh.login}/${repo_name}`,
				`git clone --branch ${branch} https://${gh.access_token}@github.com/${org}/${repo_name} /home/${gh.login}/${repo_name}`,
				`sudo chown -R ${gh.login} /home/${gh.login}/${repo_name}`,
				`echo 'cd /home/${gh.login}/${repo_name}' >> /home/${gh.login}/.bashrc`,
				`echo 'git config --global user.name "${gh.name}"' >> /home/${gh.login}/.bashrc`,
				`echo 'git config --global user.email "${gh.email}"' >> /home/${gh.login}/.bashrc`,
				..._set_status('ready'),
				`sudo -u chientrm bash -c "/usr/local/bin/ttyd bash"`
			].join('\n');
		return fetch(routes.GCP.PROJECT(project).ZONE(zone).INSTANCES.INSERT, {
			method: 'POST',
			headers: create_auth(token),
			body: JSON.stringify({
				name,
				machineType: `zones/${zone}/machineTypes/${machine_type}`,
				disks: [DISK({ disk_size, zone, source_image })],
				networkInterfaces: [{ accessConfigs: [{ networkTier: 'PREMIUM' }] }],
				metadata: {
					items: [
						{
							key: 'startup-script',
							value: startup_script
						},
						{
							key: 'ssh-keys',
							value: `${gh.login}:${Object.values(keys).join('\n')}`
						}
					]
				},
				labels: { status: 'boosting' },
				tags: { items: ['http-server', 'https-server'] }
			})
		}).then(check_ok);
	},
	extract_region = (zone: string) => zone.split('-').slice(0, -1).join('-'),
	create_image = async ({
		project,
		name,
		zone
	}: {
		project: string;
		name: string;
		zone: string;
	}) =>
		fetch(routes.GCP.PROJECT(project).IMAGES.CREATE, {
			method: 'POST',
			headers: await get_auth(),
			body: JSON.stringify({
				name,
				sourceDisk: `projects/${project}/zones/${zone}/disks/${name}`,
				storageLocations: [extract_region(zone)]
			})
		}).then(check_ok),
	delete_image = ({
		project,
		resourceId
	}: {
		project: string;
		resourceId: string;
	}) => f(routes.GCP.PROJECT(project).IMAGE(resourceId).DELETE, 'DELETE'),
	list_images = ({ project }: { project: string }) =>
		f(routes.GCP.PROJECT(project).IMAGES.LIST).then((res) =>
			res.json<{
				items: {
					name: string;
					status: string;
					diskSizeGb: number;
					storageLocations?: string[];
				}[];
			}>()
		),
	INTERNAL_FIREWALL = 'default-allow-internal',
	open_all_ports = async ({ project }: { project: string }) =>
		fetch(routes.GCP.PROJECT(project).FIREWALL(INTERNAL_FIREWALL).PATCH, {
			method: 'PATCH',
			headers: await get_auth(),
			body: JSON.stringify({
				name: INTERNAL_FIREWALL,
				sourceRanges: ['0.0.0.0/0']
			})
		}).then(check_ok);

export {
	list_instances,
	delete_instance,
	create_instance,
	list_regions,
	list_machine_types,
	create_image,
	list_images,
	delete_image,
	open_all_ports
};
