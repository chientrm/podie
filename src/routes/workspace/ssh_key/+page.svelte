<script lang="ts">
	import routes from '$lib/constants/routes';
	import strings from '$lib/constants/strings';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
</script>

{#each Object.entries(data.keys) as [name, value]}
	<p>
		<span>{name}</span>
		<span>{value}</span>
		<a href={routes.WORKSPACE.SSH_KEY(name).DELETE}>{strings.DELETE}</a>
	</p>
{/each}

<style>
	p {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	span {
		word-break: break-all;
	}
</style>
