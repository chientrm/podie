<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import ExternalAnchor from '$lib/components/ExternalAnchor.svelte';
	import routes from '$lib/constants/routes';
	import strings from '$lib/constants/strings';
	import Refresh from 'svelte-material-icons/Refresh.svelte';
	import { fade } from 'svelte/transition';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
	let refreshing = false;
	const refresh = async () => {
		refreshing = true;
		await invalidateAll();
		refreshing = false;
	};
</script>

<p>Terminated instances causing no extra cost</p>

<button on:click={refresh}>{strings.REFRESH} <Refresh /></button>

{#if !refreshing}
	<table in:fade>
		<thead>
			<td>{strings.NAME}</td>
			<td>{strings.REPO}</td>
			<td>{strings.ZONE}</td>
			<td>{strings.MACHINE_TYPE}</td>
			<td>{strings.DISK_SIZE}</td>
			<td>{strings.ADDRESS}</td>
			<td>{strings.ACTION}</td>
		</thead>
		<tbody>
			{#each Object.entries(data.podie_instances) as [name, instance]}
				<tr>
					<td>{name}</td>
					<td>
						<ExternalAnchor
							href={routes.GITHUB.ORG(instance.org).REPO(instance.repo_name)
								.VIEW}
							target="_blank"
						>
							{instance.org}/{instance.repo_name} ({instance.branch})
						</ExternalAnchor>
					</td>
					<td>{instance.zone}</td>
					<td>{instance.machine_type}</td>
					<td>{instance.disk_size}</td>
					<td>
						{#if data.gcp_instances[name]}
							{#if data.gcp_instances[name].status === 'RUNNING'}
								{data.gcp_instances[name].natIP}
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
							<a href={routes.WORKSPACE.INSTANCES.START(name)}>
								{strings.START}
							</a>
							{#if data.gcp_images.has(name)}
								<a href={routes.WORKSPACE.INSTANCES.START_FROM_IMAGE(name)}>
									{strings.START_FROM_IMAGE}
								</a>
							{/if}
							{#if !data.gcp_instances[name]}
								<a href={routes.WORKSPACE.INSTANCE(name).ZONE(instance.zone).EDIT}>
									{strings.CHANGE_MACHINE_TYPE}
								</a>
							{/if}
							<a href={routes.WORKSPACE.INSTANCES.DELETE(name)}>
								{strings.DELETE}
							</a>
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
