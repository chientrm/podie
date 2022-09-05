<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import routes from '$lib/constants/routes';
	import strings from '$lib/constants/strings';
	import type { PageServerData } from './$types';
	import Refresh from 'svelte-material-icons/Refresh.svelte';
	import { fade } from 'svelte/transition';
	export let data: PageServerData;
	let refreshing = false;
	const refresh = async () => {
		refreshing = true;
		await invalidateAll();
		refreshing = false;
	};
</script>

<button on:click={refresh}>{strings.REFRESH} <Refresh /></button>

{#if !refreshing}
	<table in:fade>
		<thead>
			<td>{strings.NAME}</td>
			<td>{strings.STATUS}</td>
			<td>{strings.DISK_SIZE}</td>
			<td>{strings.REGION}</td>
			<td>{strings.ACTION}</td>
		</thead>
		<tbody>
			{#each data.images as { name, status, diskSizeGb, region }}
				<tr>
					<td>{name}</td>
					<td>{status}</td>
					<td>{diskSizeGb}</td>
					<td>{region}</td>
					<td>
						<a href={routes.WORKSPACE.IMAGE(name).DELETE}>{strings.DELETE}</a>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
