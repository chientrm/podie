<script>
	import { page } from '$app/stores';
	import strings from '$lib/constants/strings';
</script>

<h1>{strings.OOPS}</h1>
<p>{$page.status}: {$page.error.message}</p>
