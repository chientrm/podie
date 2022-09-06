<script>
	import routes from '$lib/constants/routes';
	import strings from '$lib/constants/strings';
	import HandHeartOutline from 'svelte-material-icons/HandHeartOutline.svelte';
</script>

<p>{strings.DESCRIPTION}</p>
<p>Be careful not to accidentially create a super compute instance 🤑🤑🤑</p>
<p>Podie is open source and non-profit 🎉🎉🎉.</p>
<p>Anyway, Podie is currently in beta testing 🥺🥺🥺</p>
<p>
	Interesting? <a href={routes.LET_US_KNOW}>
		{strings.LET_US_KNOW}
		<HandHeartOutline />
	</a>
</p>
