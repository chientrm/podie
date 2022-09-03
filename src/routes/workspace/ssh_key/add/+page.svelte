<script lang="ts">
	import patterns from '$lib/constants/patterns';
	import strings from '$lib/constants/strings';
</script>

<form method="POST">
	<label>
		<span>{strings.NAME}</span>
		<input
			type="text"
			name="name"
			required
			pattern={patterns.SSH_KEY_NAME}
			title={patterns.SSH_KEY_NAME}
		/>
	</label>
	<label>
		<span>{strings.VALUE}</span>
		<input type="text" name="value" required />
	</label>
	<input type="submit" value={strings.ADD} />
</form>
