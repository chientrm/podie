<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import ExternalAnchor from '$lib/components/ExternalAnchor.svelte';
	import region_cities from '$lib/constants/region_cities';
	import routes from '$lib/constants/routes';
	import strings from '$lib/constants/strings';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
	let refreshing = false;
	onMount(() => {
		const interval = setInterval(() => {
			if (!document.hidden) {
				invalidateAll();
			}
		}, 2000);
		return () => clearInterval(interval);
	});
</script>

<p>Terminated instances causing no extra cost</p>

{#if !refreshing}
	<table in:fade>
		<thead>
			<td>{strings.NAME}</td>
			<td>{strings.REPO}</td>
			<td>{strings.REGION}</td>
			<td>{strings.MACHINE_TYPE}</td>
			<td>{strings.DISK_SIZE}</td>
			<td>{strings.STATUS}</td>
			<td>{strings.ACTION}</td>
		</thead>
		<tbody>
			{#each Object.entries(data.podie_instances) as [name, { repo_name, org, branch, region, zone, machine_type, disk_size }]}
				<tr>
					<td>{name}</td>
					<td>
						<ExternalAnchor
							href={routes.GITHUB.ORG(org).REPO(repo_name).VIEW}
							target="_blank"
						>
							{org}/{repo_name} ({branch})
						</ExternalAnchor>
					</td>
					<td>{region_cities[region] ?? region}</td>
					<td>{machine_type}</td>
					<td>{disk_size}</td>
					<td>
						{#if data.gcp_instances[name]}
							{#if data.gcp_instances[name].status === 'RUNNING'}
								{#if data.gcp_instances[name].meta_status === 'ready'}
									{data.gcp_instances[name].natIP}
								{:else}
									{data.gcp_instances[name].meta_status ?? 'boosting'}
								{/if}
							{:else}
								{data.gcp_instances[name].status}
							{/if}
						{:else}
							{strings.TERMINATED}
						{/if}
					</td>
					<td>
						{#if data.gcp_instances[name]}
							{#if data.gcp_instances[name].status === 'RUNNING'}
								<a
									href={routes.WORKSPACE.INSTANCES.TEMRINATE.ZONE(
										data.gcp_instances[name].zone
									).RESOURCE_ID(name)}
								>
									{strings.TERMINATE}
								</a>
							{/if}
						{:else}
							<div>
								<a href={routes.WORKSPACE.INSTANCES.START(name)}>
									{strings.START}
								</a>
								{#if data.gcp_images.has(name)}
									<a href={routes.WORKSPACE.INSTANCES.START_FROM_IMAGE(name)}>
										{strings.START_FROM_IMAGE}
									</a>
								{/if}
								{#if !data.gcp_instances[name]}
									<a href={routes.WORKSPACE.INSTANCE(name).ZONE(zone).EDIT}>
										{strings.CHANGE_MACHINE_TYPE}
									</a>
								{/if}
								<a href={routes.WORKSPACE.INSTANCES.DELETE(name)}>
									{strings.DELETE}
								</a>
							</div>
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}

<style>
	div {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}
</style>
