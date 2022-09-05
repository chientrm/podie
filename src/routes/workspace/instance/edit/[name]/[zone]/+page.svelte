<script lang="ts">
	import strings from '$lib/constants/strings';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
</script>

<form method="POST">
	<label>
		<span>{strings.NAME}</span>
		<input type="text" name="name" value={data.name} />
	</label>
	<label>
		<span>{strings.MACHINE_TYPE}</span>
		<select name="machine_type" value={data.machine_type}>
			{#each data.machine_types as machine_type}
				<option value={machine_type.name}>
					{machine_type.name} ({machine_type.description})
				</option>
			{/each}
		</select>
	</label>
	<input type="submit" value={strings.UPDATE} />
</form>
