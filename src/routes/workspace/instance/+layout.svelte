<script lang="ts">
	import Anchor from '$lib/components/Anchor.svelte';
	import routes from '$lib/constants/routes';
	import strings from '$lib/constants/strings';
</script>

<Anchor href={routes.WORKSPACE.INSTANCES.CREATE.GET} startsWith={true}>
	<h4>
		{strings.CREATE_INSTANCE}
	</h4>
</Anchor>

<slot />
