import { createClient } from '@supabase/supabase-js';
import config from '$lib/configs/supabase.json';

const supabase = createClient(config.url, config.key, {
	fetch: fetch.bind(globalThis)
});

export const letusknow = supabase.from<{ email: string }>('letusknow');
