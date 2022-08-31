<script>
	import routes from '$lib/constants/routes';
	import strings from '$lib/constants/strings';
	import HandHeartOutline from 'svelte-material-icons/HandHeartOutline.svelte';
</script>

<p>{strings.DESCRIPTION}</p>
<p>
	Don't get me wrong, I love Gitpod.io and Codespace ❤️, been using them for
	half a year.
</p>
<p>
	How to use: Login Github -> Login GCP -> Select GCP Project -> Create instance
	🚀 -> 'ssh podie@ip_address'
</p>
<p>Make sure to add your public SSH key 🤦‍♂️</p>
<p>Be careful not to accidentially create a super compute instance 🤑🤑🤑</p>
<p>Podie is open source and non-profit 🎉🎉🎉.</p>
<p>Anyway, Podie is currently in beta testing 🥺🥺🥺</p>
<p>
	Interesting? <a href={routes.LET_US_KNOW}>
		{strings.LET_US_KNOW}
		<HandHeartOutline />
	</a>
</p>
