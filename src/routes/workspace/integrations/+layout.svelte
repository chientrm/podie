<script>
	import Anchor from '$lib/components/Anchor.svelte';
	import routes from '$lib/constants/routes';
	import strings from '$lib/constants/strings';
</script>

<h4>
	<Anchor href={routes.WORKSPACE.INTEGRATIONS.GCP}>
		{strings.GOOGLE_CLOUD}
	</Anchor>
</h4>

<slot />
