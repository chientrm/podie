<script lang="ts">
	import { page } from '$app/stores';
	export let href: string;
	export let startsWith = false;
	$: showLink = startsWith
		? $page.url.pathname.startsWith(href)
		: $page.url.pathname === href;
</script>

{#if showLink}
	<slot />
{:else}
	<a {href}><slot /></a>
{/if}
