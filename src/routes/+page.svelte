<script>
	import routes from '$lib/constants/routes';
	import strings from '$lib/constants/strings';
	import HandHeartOutline from 'svelte-material-icons/HandHeartOutline.svelte';
</script>

<p>{strings.DESCRIPTION}</p>
<p>Also you can choose region and machine type.</p>
<p>
	Don't get me wrong, I love Gitpod.io and Codespace ❤️, been using them for
	half a year.
</p>
<p>Podie is open source and non-profit 🎉🎉🎉.</p>
<p>Anyway, Podie is currently experimental 🥺🥺🥺</p>

<p>
	Interesting? <a href={routes.LET_US_KNOW}>
		{strings.LET_US_KNOW}
		<HandHeartOutline />
	</a>
</p>
