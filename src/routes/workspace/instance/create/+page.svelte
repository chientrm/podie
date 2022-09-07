<script lang="ts">
	import region_cities from '$lib/constants/region_cities';
	import strings from '$lib/constants/strings';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
	let region = Object.keys(data.regions)[0];
	$: zones = data.regions[region];
</script>

<form method="POST">
	<label>
		<span>{strings.REPO}</span>
		<select name="full_name">
			{#each data.repoes as { full_name }}
				<option value={full_name}>{full_name}</option>
			{/each}
		</select>
	</label>
	<label>
		<span>{strings.REGION}</span>
		<select name="region" bind:value={region}>
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
		<select name="zone">
			{#each zones as zone}
				<option value={zone}>{zone}</option>
			{/each}
		</select>
	</label>
	<input type="submit" value={strings.NEXT} />
</form>
