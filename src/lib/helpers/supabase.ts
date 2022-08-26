import { createClient } from '@supabase/supabase-js';
import config from '$lib/configs/supabase.json';

export default createClient(config.url, config.key, {
	fetch: fetch.bind(globalThis)
});
