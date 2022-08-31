declare namespace App {
	interface Locals {
		gh:
			| {
					access_token: string;
					user: {
						login: string;
						html_url: string;
					};
			  }
			| undefined;
		gcp:
			| {
					access_token: string;
					user: {
						name: string;
					};
			  }
			| undefined;
		gcp_pid: string | undefined;
	}
	// interface PageData {}
	// interface Platform {}
	// interface PrivateEnv {}
	// interface PublicEnv {}
}
