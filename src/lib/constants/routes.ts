export default {
	HOME: '/',
	LOGIN: '/login',
	WORKSPACES: '/workspaces',
	LET_US_KNOW: '/letusknow',
	THANK: (email: string) => ({
		GET: `/thank/${email}`
	}),
	GITHUB: {
		REPO: 'https://github.com/chientrm/podie',
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
		REPOS: 'https://api.github.com/user/repos?per_page=100'
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
		PROJECT: (id: string) => ({
			GET: `https://cloudresourcemanager.googleapis.com/v1/projects/${id}`,
			INSTANCE: {
				LIST: `https://console.cloud.google.com/compute/instances?project=${id}`
			}
		})
	},
	SELECT_PROJECT: '/select_project'
};
