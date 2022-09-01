export default {
	HOME: '/',
	LOGIN: '/login',
	WORKSPACE: {
		GET: '/workspace',
		ZONE: (zone: string) => ({
			INSTANCE: (resourceId: string) => ({
				DELETE: `/workspace/${zone}/${resourceId}/delete`
			})
		}),
		REGION: (region: string) => ({
			ZONE: (zone: string) => ({
				CREATE: `/workspace/region/${region}/zone/${zone}/create`,
				REPO: (repo: string) => ({
					CREATE: `/workspace/region/${region}/zone/${zone}/repo/${repo}/create`
				})
			})
		}),
		INSTANCES: {
			LIST: '/workspace/instance',
			CREATE: {
				GET: '/workspace/instance/create',
				REPO: (repo: string) => ({
					REGION: (region: string) => ({
						ZONE: (zone: string) =>
							`/workspace/instance/create/${repo}/${region}/${zone}`
					})
				})
			},
			DELETE: {
				ZONE: (zone: string) => ({
					RESOURCE_ID: (resourceId: string) => ({
						DELETE: `/workspace/instance/delete/${zone}/${resourceId}`
					})
				})
			}
		},
		SSH_KEYS: {
			LIST: '/workspace/ssh_key',
			ADD: '/workspace/ssh_key/add'
		},
		SSH_KEY: (name: string) => ({
			DELETE: `/workspace/ssh_key/delete/${name}`
		})
	},
	LET_US_KNOW: '/letusknow',
	THANK: (email: string) => ({
		GET: `/thank/${email}`
	}),
	GITHUB: {
		PODIE_REPO: 'https://github.com/chientrm/podie',
		AUTHORIZE: ({ client_id, scope }: { client_id: string; scope: string }) => {
			const url = new URL('https://github.com/login/oauth/authorize');
			url.searchParams.append('client_id', client_id);
			url.searchParams.append('scope', scope);
			return url.href;
		},
		ACCESS_TOKEN: ({
			client_id,
			client_secret,
			code
		}: {
			client_id: string;
			client_secret: string;
			code: string;
		}) => {
			const url = new URL('https://github.com/login/oauth/access_token');
			url.searchParams.append('client_id', client_id);
			url.searchParams.append('client_secret', client_secret);
			url.searchParams.append('code', code);
			return url.href;
		},
		USER: 'https://api.github.com/user',
		REPOS: 'https://api.github.com/user/repos?per_page=100',
		REPO: (repo: string) => ({
			BRANCHES: {
				LIST: `https://api.github.com/repos/${repo}/branches`
			}
		})
	},
	GCP: {
		REDIRECT: '/gcp',
		AUTHORIZE: ({
			client_id,
			redirect_uri,
			scope
		}: {
			client_id: string;
			redirect_uri: string;
			scope: string;
		}) => {
			const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');
			url.searchParams.append('client_id', client_id);
			url.searchParams.append('redirect_uri', redirect_uri);
			url.searchParams.append('response_type', 'code');
			url.searchParams.append('include_granted_scopes', 'true');
			url.searchParams.append('access_type', 'offline');
			url.searchParams.append('scope', scope);
			return url.href;
		},
		TOKEN: 'https://oauth2.googleapis.com/token',
		USER_INFO: 'https://www.googleapis.com/oauth2/v3/userinfo',
		PROJECTS: {
			LIST: 'https://cloudresourcemanager.googleapis.com/v1/projects'
		},
		PROJECT: (project: string) => ({
			GET: `https://cloudresourcemanager.googleapis.com/v1/projects/${project}`,
			HOME: `https://console.cloud.google.com/compute/instances?project=${project}`,
			INSTANCES: {
				AGGREGATE: `https://compute.googleapis.com/compute/v1/projects/${project}/aggregated/instances`
			},
			ZONE: (zone: string) => ({
				INSTANCES: {
					INSERT: `https://compute.googleapis.com/compute/v1/projects/${project}/zones/${zone}/instances`
				},
				INSTANCE: (resourceId: string) => ({
					DELETE: `https://compute.googleapis.com/compute/v1/projects/${project}/zones/${zone}/instances/${resourceId}`
				}),
				MACHINE_TYPES: {
					LIST: `https://compute.googleapis.com/compute/v1/projects/${project}/zones/${zone}/machineTypes`
				}
			}),
			REGIONS: {
				LIST: `https://compute.googleapis.com/compute/v1/projects/${project}/regions`
			}
		})
	},
	SELECT_PROJECT: '/select_project',
	PRIVACY_POLICY: '/privacy_policy',
	TERMS_AND_CONDITIONS: '/terms_and_conditions'
};
