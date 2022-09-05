<script lang="ts">
	import strings from '$lib/constants/strings';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
</script>

<form method="POST">
	<span>{strings.INSTANCE}: {data.name}</span>
	<label>
		<span>{strings.MACHINE_TYPE}</span>
		<select name="machine_type" value={data.machine_type}>
			{#each data.machine_types as { name, description }}
				<option value={name}>
					{name} ({description})
				</option>
			{/each}
		</select>
	</label>
	<input type="submit" value={strings.UPDATE} />
</form>
