interface User {
	avatar_url: string;
}

declare namespace App {
	interface Locals {
		user: User | undefined;
	}
	// interface PageData {}
	// interface Platform {}
	// interface PrivateEnv {}
	// interface PublicEnv {}
}
