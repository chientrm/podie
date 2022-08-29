<script lang="ts">
	import strings from '$lib/constants/strings';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
</script>

<h2>{strings.REPOES}</h2>
<ul>
	{#each data.repoes as repo}
		<li>{repo.full_name}</li>
	{/each}
</ul>
