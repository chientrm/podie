<script lang="ts">
	import routes from '$lib/constants/routes';
	import strings from '$lib/constants/strings';
	import type { LayoutServerData } from './$types';
	import 'modern-normalize/modern-normalize.css';
	import '../app.css';

	export let data: LayoutServerData;
</script>

<header>
	<h2><a href={routes.HOME}>{strings.PODIE}</a></h2>
	<div>
		<a href={routes.GITHUB}>{strings.GITHUB}</a>
		{#if data.user}
			<a href={routes.LOGOUT}>{strings.LOGOUT}</a>
		{:else}
			<a href={routes.LOGIN}>{strings.LOGIN}</a>
		{/if}
	</div>
</header>
<main>
	<slot />
</main>

<style>
	header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0 1em;
	}
	main {
		padding: 0 1em;
	}
	div {
		display: flex;
		gap: 1em;
	}
</style>
