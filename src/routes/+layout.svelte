<script lang="ts">
	import { page } from '$app/stores';
	import Anchor from '$lib/components/Anchor.svelte';
	import ExternalAnchor from '$lib/components/ExternalAnchor.svelte';
	import routes from '$lib/constants/routes';
	import strings from '$lib/constants/strings';
	import logo from '$lib/images/logo.png';
	import favicon from '$lib/images/logo.svg';
	import 'modern-normalize/modern-normalize.css';
	import Discord from 'svelte-material-icons/Discord.svelte';
	import GithubCircle from 'svelte-material-icons/GithubCircle.svelte';
	import '../app.css';
	import type { LayoutServerData } from './$types';
	import { navigating } from '$app/stores';
	import LoadingBar from '$lib/components/LoadingBar.svelte';
	export let data: LayoutServerData;

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

{#if $navigating}
	<LoadingBar />
{/if}

<article>
	<section>
		<header>
			<Anchor href={routes.HOME}><h2>{strings.PODIE}</h2></Anchor>
			<div>
				<a href={routes.GITHUB.PODIE_REPO} target="_blank"><GithubCircle /></a>
				<a href={routes.DISCORD} target="_blank"><Discord /></a>
				{#if data.user}
					{#if data.user.gh}
						<ExternalAnchor
							href={routes.GITHUB.PROFILE(data.user.gh.login)}
							target="_blank"
						>
							{data.user.gh.login}
						</ExternalAnchor>
					{/if}
					<Anchor href={routes.WORKSPACE.GET} startsWith={true}>
						{strings.WORKSPACES}
					</Anchor>
				{:else}
					<Anchor href={routes.LOGIN}>{strings.LOGIN}</Anchor>
				{/if}
			</div>
		</header>
		<main>
			<slot />
		</main>
	</section>
	<footer>
		<Anchor href={routes.PRIVACY_POLICY}>{strings.PRIVACY_POLICY}</Anchor>
		<Anchor href={routes.TERMS_AND_CONDITIONS}
			>{strings.TERMS_AND_CONDITIONS}</Anchor
		>
	</footer>
</article>

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
	article {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	footer {
		display: flex;
		flex-direction: row;
		gap: 1em;
		padding: 2em 1em;
	}
</style>
