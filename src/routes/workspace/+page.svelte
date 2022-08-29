<script lang="ts">
	import { invalidate } from '$app/navigation';
	import routes from '$lib/constants/routes';
	import strings from '$lib/constants/strings';
	import Refresh from 'svelte-material-icons/Refresh.svelte';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
</script>

<button on:click={() => invalidate()}>{strings.REFRESH} <Refresh /></button>

<table>
	<thead>
		<td>{strings.NAME}</td>
		<td>{strings.IP}</td>
		<td>{strings.STATUS}</td>
		<td>{strings.DELETE}</td>
	</thead>
	<tbody>
		{#each data.workspaces as workspace}
			<tr>
				<td> {workspace.name} </td>
				<td>{workspace.networkInterfaces[0]?.accessConfigs[0]?.natIP}</td>
				<td>{workspace.status}</td>
				<td>
					{#if workspace.status === 'RUNNING'}
						<a
							href={routes.WORKSPACE.ZONE(workspace.zone).INSTANCE(
								workspace.name
							).DELETE}
						>
							{strings.DELETE}
						</a>
					{/if}
				</td>
			</tr>
		{/each}
	</tbody>
</table>
