<script lang="ts">
	import patterns from '$lib/constants/patterns';

	import region_cities from '$lib/constants/region_cities';
	import strings from '$lib/constants/strings';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
	let instance = data.instances[0];
</script>

{#if instance}
	<form method="POST">
		<label>
			<span>{strings.NAME}</span>
			<input
				type="zone"
				name="name"
				required
				pattern={patterns.NAME}
				title={patterns.NAME}
			/>
		</label>
		<label>
			<span>{strings.FROM_INSTANCE}</span>
			<select bind:value={instance}>
				{#each data.instances as i}
					<option value={i}>{i.name}</option>
				{/each}
			</select>
		</label>
		<input type="hidden" name="instance_name" value={instance.name} />
		<input type="hidden" name="instance_zone" value={instance.zone} />
		<label>
			<span>{strings.ZONE}</span>
			<select name="region">
				{#each data.regions as region}
					<option value={region}>
						{region}
						{#if region_cities[region]}
							({region_cities[region]})
						{/if}
					</option>
				{/each}
			</select>
		</label>
		<input type="submit" value={strings.CREATE} />
	</form>
{:else}
	<p>Need a running intance in order to create image</p>
{/if}
