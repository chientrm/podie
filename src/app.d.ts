declare namespace App {
	interface Locals {
		gh:
			| undefined
			| { access_token: string; user: { login: string; html_url: string } };
		gcp: undefined | { access_token: string; user: { name: string } };
		gcp_project: undefined | { id: string };
		SSH_KEYS: KVNamespace;
	}
	// interface PageData {}
	interface Platform {
		env: { SSH_KEYS: KVNamespace };
	}
	// interface PrivateEnv {}
	// interface PublicEnv {}
}

declare namespace Podie {
	type SshKeys = Record<string, string>;
}
