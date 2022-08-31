<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import region_cities from '$lib/constants/region_cities';
	import routes from '$lib/constants/routes';
	import strings from '$lib/constants/strings';
	import type { LayoutServerData } from './$types';
	export let data: LayoutServerData;
	let _region = $page.params.region,
		_zone = $page.params.zone,
		_repo = `${$page.params.org}/${$page.params.name}`;
	let regionEl: HTMLSelectElement;
	let zoneEl: HTMLSelectElement;
	let repoEl: HTMLSelectElement;
	const region_change = () =>
		goto(
			routes.WORKSPACE.REGION(regionEl.value)
				.ZONE(data.regions[regionEl.value][0])
				.REPO(_repo).CREATE
		);
	const zone_or_repo_change = () =>
		goto(
			routes.WORKSPACE.REGION(regionEl.value)
				.ZONE(zoneEl.value)
				.REPO(repoEl.value).CREATE
		);
</script>

<nav>
	<label>
		<span>{strings.REGION}</span>
		<select bind:this={regionEl} value={_region} on:change={region_change}>
			{#each Object.keys(data.regions) as region}
				<option value={region}>
					{#if region_cities[region]}
						{region} ({region_cities[region]})
					{:else}
						{region}
					{/if}
				</option>
			{/each}
		</select>
	</label>
	<label>
		<span>{strings.ZONE}</span>
		<select bind:this={zoneEl} value={_zone} on:change={zone_or_repo_change}>
			{#each data.zones as zone}
				<option value={zone}>{zone}</option>
			{/each}
		</select>
	</label>
	<label>
		<span>{strings.REPO}</span>
		<select bind:this={repoEl} value={_repo} on:change={zone_or_repo_change}>
			{#each data.repoes as repo}
				<option value={repo.full_name}>{repo.full_name}</option>
			{/each}
		</select>
	</label>
</nav>

<slot />
