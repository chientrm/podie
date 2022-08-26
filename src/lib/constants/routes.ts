export default {
	HOME: '/',
	LOGIN: '/login',
	LOGOUT: '/logout',
	WORKSPACES: '/workspaces',
	LET_US_KNOW: '/letusknow',
	GITHUB: 'https://github.com/chientrm/podie',
	THANK: (email: string) => ({
		GET: `/thank/${email}`
	})
};
