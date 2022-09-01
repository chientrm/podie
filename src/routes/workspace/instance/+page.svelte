<script lang="ts">
	import { invalidate } from '$app/navigation';
	import routes from '$lib/constants/routes';
	import strings from '$lib/constants/strings';
	import Refresh from 'svelte-material-icons/Refresh.svelte';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
</script>

<button on:click={() => invalidate()}>{strings.REFRESH} <Refresh /></button>

<h2>{strings.INSTANCES}</h2>
<table>
	<thead>
		<td>{strings.NAME}</td>
		<td>{strings.REPO}</td>
		<td>{strings.ZONE}</td>
		<td>{strings.MACHINE_TYPE}</td>
		<td>{strings.STATUS}</td>
	</thead>
	<tbody>
		{#each Object.entries(data.podie_instances) as [name, instance]}
			<tr>
				<td>{name}</td>
				<td>{instance.repo}</td>
				<td>{instance.zone}</td>
				<td>{instance.machineType}</td>
				<td>
					{#if data.gcp_instances[name]}
						{#if data.gcp_instances[name].status === 'RUNNING'}
							{data.gcp_instances[name].natIP}
							<a
								href={routes.WORKSPACE.INSTANCES.DELETE.ZONE(
									data.gcp_instances[name].zone
								).RESOURCE_ID(name)}
							>
								{strings.TERMINATE}
							</a>
						{:else}
							{data.gcp_instances[name].status}
						{/if}
					{:else}
						{strings.STOPPED}
					{/if}
				</td>
			</tr>
		{/each}
	</tbody>
</table>
