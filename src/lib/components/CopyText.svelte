<script lang="ts">
	export let value: string;
	import ContentCopy from 'svelte-material-icons/ContentCopy.svelte';
	import Check from 'svelte-material-icons/Check.svelte';
	import { fade } from 'svelte/transition';
	let copying = false;
	const copy = () => {
		if (!copying) {
			copying = true;
			navigator.clipboard.writeText(value);
			setTimeout(() => (copying = false), 1000);
		}
	};
</script>

<div>
	{value}
	<button on:click={copy}>
		{#if copying}
			<div in:fade><Check /></div>
		{:else}
			<div in:fade><ContentCopy /></div>
		{/if}
	</button>
</div>

<style>
	div {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.5em;
	}
</style>
