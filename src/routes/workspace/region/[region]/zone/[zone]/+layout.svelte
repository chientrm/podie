<script lang="ts">
	import { goto } from '$app/navigation';
	import region_cities from '$lib/constants/region_cities';
	import routes from '$lib/constants/routes';
	import { page } from '$app/stores';
	import strings from '$lib/constants/strings';
	import type { LayoutServerData } from './$types';
	export let data: LayoutServerData;
	const _region = $page.params.region;
	const _zone = $page.params.zone;
	let r: HTMLSelectElement;
	let z: HTMLSelectElement;
	const region_change = () =>
		goto(
			routes.WORKSPACE.REGION(r.value).ZONE(data.regions[r.value][0]).CREATE
		);
	const zone_change = () =>
		goto(routes.WORKSPACE.REGION(r.value).ZONE(z.value).CREATE);
</script>

<nav>
	<label>
		<span>{strings.REGION}</span>
		<select bind:this={r} value={_region} on:change={region_change}>
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
		<select bind:this={z} value={_zone} on:change={zone_change}>
			{#each data.zones as zone}
				<option value={zone}>{zone}</option>
			{/each}
		</select>
	</label>
</nav>

<slot />
