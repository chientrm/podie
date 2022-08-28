declare namespace App {
	interface Locals {
		user: import('@sentry/types').User | undefined;
	}
	// interface PageData {}
	// interface Platform {}
	// interface PrivateEnv {}
	// interface PublicEnv {}
}

declare namespace GCP {
	interface Project {
		projectNumber: number;
		projectId: string;
		lifecycleState: string;
		name: string;
		createTime: Date;
	}
}
