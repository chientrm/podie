<script>
	import routes from '$lib/constants/routes';
	import strings from '$lib/constants/strings';
	import HandHeartOutline from 'svelte-material-icons/HandHeartOutline.svelte';
	import Discord from 'svelte-material-icons/Discord.svelte';
	import GithubCircle from 'svelte-material-icons/GithubCircle.svelte';
</script>

<p>{strings.DESCRIPTION}</p>
<p>Podie is open source and non-profit 🎉🎉🎉.</p>
<p>Anyway, Podie is currently in beta testing 🥺🥺🥺</p>
<p>
	Interesting? <a href={routes.LET_US_KNOW}>
		{strings.LET_US_KNOW}
		<HandHeartOutline />
	</a>
</p>
<p>
	Checkout <a href={routes.DISCORD.INVITE} target="_blank">
		Discord <Discord />
	</a>
</p>
<p>
	Give us a star on <a href={routes.GITHUB.PODIE_REPO} target="_blank">
		Github <GithubCircle />
	</a> and contribute 👍
</p>
