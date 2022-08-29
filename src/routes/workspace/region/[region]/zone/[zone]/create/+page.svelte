<script lang="ts">
	import { page } from '$app/stores';
	import patterns from '$lib/constants/patterns';
	import strings from '$lib/constants/strings';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
	const { zone } = $page.params;
</script>

<form method="POST">
	<input type="hidden" name="zone" value={zone} />
	<label>
		<span>{strings.NAME}</span>
		<input
			type="text"
			name="name"
			pattern={patterns.NAME}
			title={patterns.NAME}
			required
		/>
	</label>
	<label>
		<span>{strings.DISK_SIZE}</span>
		<input
			type="number"
			name="diskSize"
			min="10"
			value="10"
			step="1"
			required
		/>
	</label>
	<label>
		<span>{strings.REPO}</span>
		<select name="repo">
			{#each data.repoes as repo}
				<option value={repo.html_url}>{repo.full_name}</option>
			{/each}
		</select>
	</label>
	<label>
		<span>{strings.MACHINE_TYPE}</span>
		<select name="machineType">
			{#each data.machine_types as machine_type}
				<option value={machine_type.name}>
					{machine_type.name} ({machine_type.description})
				</option>
			{/each}
		</select>
	</label>
	<input type="submit" value={strings.CREATE} />
</form>

<style>
	form {
		padding: 1em 0;
	}
</style>
