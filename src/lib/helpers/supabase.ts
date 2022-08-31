import config from '$lib/configs/supabase.json';
import { createClient } from '@supabase/supabase-js';

const supabase = () =>
		createClient(config.url, config.key, {
			fetch: fetch.bind(globalThis),
			shouldThrowOnError: true
		}),
	letusknow = () => supabase().from<{ email: string }>('letusknow'),
	ssh_keys = () =>
		supabase().from<{
			id: string;
			name: string;
			value: string;
		}>('ssh_keys');

export { letusknow, ssh_keys };
