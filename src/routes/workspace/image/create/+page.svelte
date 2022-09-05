<script lang="ts">
	import patterns from '$lib/constants/patterns';
	import strings from '$lib/constants/strings';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
	let instance = data.instances[0];
</script>

{#if instance}
	<form method="POST">
		<label>
			<span>{strings.FROM_INSTANCE}</span>
			<select bind:value={instance}>
				{#each data.instances as i}
					<option value={i}>{i.name}</option>
				{/each}
			</select>
		</label>
		<input type="hidden" name="name" value={instance.name} />
		<input type="hidden" name="zone" value={instance.zone} />
		<input type="submit" value={strings.CREATE} />
	</form>
{:else}
	<p>Need a running instance in order to create image</p>
{/if}
