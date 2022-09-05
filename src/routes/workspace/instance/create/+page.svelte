<script lang="ts">
	import strings from '$lib/constants/strings';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
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
	<input type="submit" value={strings.NEXT} />
</form>
