<script lang="ts">
	import strings from '$lib/constants/strings';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
</script>

<form method="POST">
	<label>
		<span>{strings.NAME}</span>
		<input type="text" name="name" value={data.profile?.name ?? ''} required />
	</label>
	<label>
		<span>{strings.EMAIL}</span>
		<input
			type="email"
			name="email"
			value={data.profile?.email ?? ''}
			required
		/>
	</label>
	<input type="submit" value={strings.SAVE} />
</form>
