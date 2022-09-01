<script lang="ts">
	import OpenInNew from 'svelte-material-icons/OpenInNew.svelte';
	export let href: string;
</script>

<a {href} {...$$restProps}><slot /> <OpenInNew /></a>
