<script lang="ts">
	import { page } from '$app/stores';
	import patterns from '$lib/constants/patterns';
	import strings from '$lib/constants/strings';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
</script>

<form method="POST">
	<input type="hidden" name="zone" value={$page.params.zone} />
	<label>
		<span>{strings.BRANCH}</span>
		<select name="branch">
			{#each data.branches as branch}
				<option value={branch.name}>{branch.name}</option>
			{/each}
		</select>
	</label>
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
		<span>{strings.SSH_KEY}</span>
		<input type="text" name="sshKey" required />
	</label>
	<label>
		<span>{strings.STARTUP}</span>
		<input type="text" name="startup" required />
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
	<input type="submit" value={strings.CREATE_INSTANCE} />
</form>

<style>
	form {
		padding: 1em 0;
	}
</style>
