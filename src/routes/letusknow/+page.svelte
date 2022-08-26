<script>
	import strings from '$lib/constants/strings';
</script>

<form method="POST">
	<p>You gonna received email on new blog post 👌</p>
	<label>
		<span>{strings.EMAIL}</span>
		<input type="email" name="email" required />
	</label>
	<input type="submit" value={`${strings.NOTIFY_ME} 🔔`} />
</form>
