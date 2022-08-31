declare namespace App {
	interface Locals {
		gh:
			| undefined
			| { access_token: string; user: { login: string; html_url: string } };
		gcp: undefined | { access_token: string; user: { name: string } };
		gcp_project: undefined | { id: string };
	}
	// interface PageData {}
	// interface Platform {}
	// interface PrivateEnv {}
	// interface PublicEnv {}
}
