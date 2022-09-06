<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import routes from '$lib/constants/routes';
	import strings from '$lib/constants/strings';
	import { clearAsyncInterval, setAsyncInterval } from '$lib/utils';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
	onMount(() => {
		const interval = setAsyncInterval(async () => {
			if (!document.hidden) {
				await invalidateAll();
			}
		}, 2000);
		return () => clearAsyncInterval(interval);
	});
</script>

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
				<td>{region}</td>
				<td>
					{#if status === 'READY'}
						<a href={routes.WORKSPACE.IMAGE(name).DELETE}>{strings.DELETE}</a>
					{/if}
				</td>
			</tr>
		{/each}
	</tbody>
</table>
