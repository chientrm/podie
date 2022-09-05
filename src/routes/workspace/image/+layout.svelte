<script lang="ts">
	import Anchor from '$lib/components/Anchor.svelte';
	import routes from '$lib/constants/routes';
	import strings from '$lib/constants/strings';
</script>

<h4>
	<Anchor href={routes.WORKSPACE.IMAGES.CREATE.GET} startsWith={true}>
		{strings.CREATE_IMAGE}
	</Anchor>
</h4>

<slot />
