<script>
	import routes from '$lib/constants/routes';
	import strings from '$lib/constants/strings';
	import HandHeartOutline from 'svelte-material-icons/HandHeartOutline.svelte';
</script>

<p>
	It's like Gitpod.io and Codespace but running on your own GCE 👍.
</p>
<p>Also you can choose region and machine type.</p>
<p>
	Don't get me wrong, I love Gitpod.io ❤️ and been using it for half a year.
	It's just a bit delay for APAC region peeps like me 😢.
</p>
<p>Anyway, <a href={routes.HOME}>Podie</a> is currently experimental 🥺</p>

<p>
	Interesting? <a href={routes.LET_US_KNOW}>
		{strings.LET_US_KNOW}
		<HandHeartOutline />
	</a>
</p>
