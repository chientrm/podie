import config from '$lib/configs/supabase.json';
import { createClient } from '@supabase/supabase-js';

const supabase = () =>
		createClient(config.url, config.key, {
			fetch: fetch.bind(globalThis),
			shouldThrowOnError: true
		}),
	letusknow = () => supabase().from<{ email: string }>('letusknow');
export { letusknow };
