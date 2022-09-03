declare namespace App {
	interface Locals {
		user?: {
			gh?: {
				access_token: string;
				id: number;
				login: string;
				html_url: string;
				email: string;
				name;
				string;
			};
		};
		PODIE: KVNamespace;
	}
	// interface PageData {}
	interface Platform {
		env: { PODIE: KVNamespace };
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
	interface Profile {
		name: string;
		email: string;
	}
	interface Integrations {
		gcp_pid?: string;
	}
}
