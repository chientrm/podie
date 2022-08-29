<script lang="ts">
	import strings from '$lib/constants/strings';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
</script>

<form method="POST">
	<label>
		<span>{strings.PROJECTS}</span>
		<select name="id" required>
			{#each data.projects as project}
				<option value={project.projectId}>
					{project.name} ({project.projectId})
				</option>
			{/each}
		</select>
	</label>
	<input type="submit" value={strings.CONFIRM} />
</form>
