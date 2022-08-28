<script lang="ts">
	import type { PageServerData } from './$types';
	export let data: PageServerData;
</script>

<ul>
	{#each data.repoes as repo}
		<li>
			{repo.full_name}
		</li>
	{/each}
</ul>
