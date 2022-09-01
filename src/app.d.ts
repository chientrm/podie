declare namespace App {
	interface Locals {
		gh:
			| undefined
			| { access_token: string; user: { login: string; html_url: string } };
		gcp: undefined | { access_token: string; user: { name: string } };
		gcp_project: undefined | { id: string };
		SSH_KEYS: KVNamespace;
		INSTANCES: KVNamespace;
	}
	// interface PageData {}
	interface Platform {
		env: { SSH_KEYS: KVNamespace; INSTANCES: KVNamespace };
	}
	// interface PrivateEnv {}
	// interface PublicEnv {}
}

declare namespace Podie {
	type SshKeys = Record<string, string>;
	interface Instance {
		repo: string;
		branch: string;
		zone: string;
		diskSize: number;
		startup: string;
		machineType: string;
	}
	type Instances = Record<string, Instance>;
}
