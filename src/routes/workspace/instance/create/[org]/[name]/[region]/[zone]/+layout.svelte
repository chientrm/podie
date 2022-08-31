<script lang="ts">
	import { goto } from '$app/navigation';
	import region_cities from '$lib/constants/region_cities';
	import routes from '$lib/constants/routes';
	import strings from '$lib/constants/strings';
	import type { LayoutServerData } from './$types';
	export let data: LayoutServerData;
	let repoEl: HTMLSelectElement;
	let regionEl: HTMLSelectElement;
	let zoneEl: HTMLSelectElement;
	const region_change = () =>
			goto(
				routes.WORKSPACE.INSTANCES.CREATE.REPO(repoEl.value)
					.REGION(regionEl.value)
					.ZONE(data.regions[regionEl.value][0])
			),
		zone_or_repo_change = () =>
			goto(
				routes.WORKSPACE.INSTANCES.CREATE.REPO(repoEl.value)
					.REGION(regionEl.value)
					.ZONE(zoneEl.value)
			);
</script>

<form>
	<label>
		<span>{strings.REPO}</span>
		<select
			bind:this={repoEl}
			value={`${data.org}/${data.name}`}
			on:change={zone_or_repo_change}
		>
			{#each data.repoes as repo}
				<option value={repo.full_name}>{repo.full_name}</option>
			{/each}
		</select>
	</label>
	<label>
		<span>{strings.REGION}</span>
		<select bind:this={regionEl} value={data.region} on:change={region_change}>
			{#each Object.keys(data.regions) as region}
				<option value={region}>
					{region}
					{#if region_cities[region]}
						({region_cities[region]})
					{/if}
				</option>
			{/each}
		</select>
	</label>
	<label>
		<span>{strings.ZONE}</span>
		<select
			bind:this={zoneEl}
			value={data.zone}
			on:change={zone_or_repo_change}
		>
			{#each data.regions[data.region] as zone}
				<option value={zone}>{zone}</option>
			{/each}
		</select>
	</label>
</form>

<slot />
