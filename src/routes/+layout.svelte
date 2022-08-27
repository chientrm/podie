<script lang="ts">
	import { page } from '$app/stores';
	import Anchor from '$lib/components/Anchor.svelte';
	import { client_id } from '$lib/configs/github.json';
	import routes from '$lib/constants/routes';
	import strings from '$lib/constants/strings';
	import logo from '$lib/images/logo.png';
	import favicon from '$lib/images/logo.svg';
	import 'modern-normalize/modern-normalize.css';
	import GithubCircle from 'svelte-material-icons/GithubCircle.svelte';
	import '../app.css';
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;
	const scope = 'repo:status';

	const gsiteVerification = 'gG8WXVPtqVVAJlnJb5v0LlC0-HBSCVSWsVqa7KHwTPA';
</script>

<svelte:head>
	<title>{strings.TITLE}</title>
	<link rel="icon" type="image/svg+xml" href={favicon} />
	<meta name="description" content={strings.DESCRIPTION} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={strings.TITLE} />
	<meta property="og:description" content={strings.DESCRIPTION} />
	<meta property="og:image" content={`${$page.url.origin}${logo}`} />
	<meta property="og:image:width" content="120" />
	<meta property="og:image:height" content="120" />
	<meta property="og:url" content={$page.url.origin} />
	<meta property="og:site_name" content={strings.PODIE} />
	<meta property="keywords" content={strings.KEYWORDS.join(', ')} />
	<meta name="google-site-verification" content={gsiteVerification} />
</svelte:head>

<header>
	<h2><Anchor href={routes.HOME}>{strings.PODIE}</Anchor></h2>
	<div>
		<a href={routes.GITHUB.REPO} target="_blank">{strings.GITHUB}</a>
		{#if data.user}
			<Anchor href={routes.WORKSPACES}>{strings.WORKSPACES}</Anchor>
			<img src={data.user.avatar_url} alt={strings.AVATAR} />
		{:else}
			<a href={routes.GITHUB.AUTHORIZE({ client_id, scope })}>
				{strings.LOGIN}
				<GithubCircle />
			</a>
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
		align-items: center;
		gap: 1em;
	}
	img {
		width: 32px;
		height: 32px;
		border-radius: 50%;
	}
</style>
