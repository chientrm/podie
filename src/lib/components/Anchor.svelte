<script lang="ts">
	import { page } from '$app/stores';
	export let href: string;
</script>

{#if $page.url.pathname === href}
	<slot />
{:else}
	<a {href}><slot /></a>
{/if}
