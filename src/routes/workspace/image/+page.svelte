<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import region_cities from '$lib/constants/region_cities';
	import routes from '$lib/constants/routes';
	import strings from '$lib/constants/strings';
	import Refresh from 'svelte-material-icons/Refresh.svelte';
	import { fade } from 'svelte/transition';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
</script>

<button on:click={invalidateAll}>{strings.REFRESH} <Refresh /></button>

{#key data}
	<table in:fade>
		<thead>
			<td>{strings.NAME}</td>
			<td>{strings.STATUS}</td>
			<td>{strings.DISK_SIZE}</td>
			<td>{strings.ARCHIVED_SIZE}</td>
			<td>{strings.REGION}</td>
			<td>{strings.ACTION}</td>
		</thead>
		<tbody>
			{#each data.images as { name, status, diskSizeGb, archiveSizeGb, region }}
				<tr>
					<td>{name}</td>
					<td>{status}</td>
					<td>{diskSizeGb}</td>
					<td>{archiveSizeGb}</td>
					<td>{region_cities[region] ?? region}</td>
					<td>
						{#if status === 'READY'}
							<a href={routes.WORKSPACE.IMAGE(name).DELETE}>{strings.DELETE}</a>
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/key}
