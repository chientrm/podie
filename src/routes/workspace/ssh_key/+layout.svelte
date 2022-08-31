<script lang="ts">
	import Anchor from '$lib/components/Anchor.svelte';
	import routes from '$lib/constants/routes';
	import strings from '$lib/constants/strings';
</script>

<h4><Anchor href={routes.WORKSPACE.SSH_KEYS.ADD}>{strings.NEW_KEY}</Anchor></h4>

<slot />
