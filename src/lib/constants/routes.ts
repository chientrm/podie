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
		USER: 'https://api.github.com/user'
	}
};
