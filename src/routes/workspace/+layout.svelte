<script>
	import Anchor from '$lib/components/Anchor.svelte';
	import routes from '$lib/constants/routes';
	import strings from '$lib/constants/strings';
</script>

<nav>
	<h1><Anchor href={routes.WORKSPACE.GET}>{strings.WORKSPACES}</Anchor></h1>
	<Anchor
		href={routes.WORKSPACE.REGION('us-central1').ZONE('us-central1-a').CREATE}
	>
		{strings.CREATE}
	</Anchor>
</nav>

<slot />
