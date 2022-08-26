<script>
	import routes from '$lib/constants/routes';
	import strings from '$lib/constants/strings';
	import HandHeartOutline from 'svelte-material-icons/HandHeartOutline.svelte';
</script>

<p>
	Basically like Gitpod.io and Codespace but pay per minute and no timeout 👍.
</p>
<p>Also you can choose region.</p>
<p>
	Don't get me wrong, I love Gitpod.io ❤️ and been using it for half a year.
	It's just a bit delay for APAC region peeps like me 😢.
</p>
<p>Anyway, <a href={routes.HOME}>Podie</a> is currently experimental 🥺</p>
<p>
	<a href={routes.HOME}>Podie</a> targets less resource-intensive projects like C-based
	or Vim-lovers.
</p>

<p>
	Interesting? <a href={routes.LET_US_KNOW}>
		{strings.LET_US_KNOW}
		<HandHeartOutline />
	</a>
</p>
