interface User {
	user_id: string;
	email: string;
	name: string;
	picture: string;
}

declare namespace App {
	interface Locals {
		user: User | undefined;
		supabase: import('@supabase/supabase-js').SupabaseClient;
	}
	// interface PageData {}
	// interface Platform {}
	// interface PrivateEnv {}
	// interface PublicEnv {}
}
