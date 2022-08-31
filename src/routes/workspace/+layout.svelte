<script lang="ts">
	import Anchor from '$lib/components/Anchor.svelte';
	import routes from '$lib/constants/routes';
	import strings from '$lib/constants/strings';
</script>

<nav>
	<h3>
		<Anchor href={routes.WORKSPACE.INSTANCES.LIST}>{strings.INSTANCES}</Anchor>
	</h3>
	<h3>
		<Anchor href={routes.WORKSPACE.SSH_KEYS.LIST}>{strings.SSH_KEYS}</Anchor>
	</h3>
</nav>

<slot />
