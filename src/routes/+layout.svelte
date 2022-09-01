<script lang="ts">
	import { page } from '$app/stores';
	import Anchor from '$lib/components/Anchor.svelte';
	import {
		client_id as gcp_client_id,
		redirect_uri as gcp_redirect_uri
	} from '$lib/configs/gcp.json';
	import { client_id as gh_client_id } from '$lib/configs/github.json';
	import routes from '$lib/constants/routes';
	import strings from '$lib/constants/strings';
	import logo from '$lib/images/logo.png';
	import favicon from '$lib/images/logo.svg';
	import 'modern-normalize/modern-normalize.css';
	import GithubCircle from 'svelte-material-icons/GithubCircle.svelte';
	import GoogleCloud from 'svelte-material-icons/GoogleCloud.svelte';
	import Google from 'svelte-material-icons/Google.svelte';
	import '../app.css';
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;

	const gh_scope = ['repo'].join(' '),
		gcp_scope = [
			'https://www.googleapis.com/auth/userinfo.email',
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/cloud-platform',
			'https://www.googleapis.com/auth/compute'
		].join(' '),
		gsiteVerification = 'gG8WXVPtqVVAJlnJb5v0LlC0-HBSCVSWsVqa7KHwTPA';
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

<article>
	<section>
		<header>
			<Anchor href={routes.HOME}><h2>{strings.PODIE}</h2></Anchor>
			<div>
				<a href={routes.GITHUB.PODIE_REPO} target="_blank">{strings.GITHUB}</a>
				<p>
					{#if data.gh_user}
						<span>
							<a href={data.gh_user.html_url} target="_blank">
								{data.gh_user.login}
							</a>
						</span>
					{:else}
						<a
							href={routes.GITHUB.AUTHORIZE({
								client_id: gh_client_id,
								scope: gh_scope
							})}
						>
							{strings.LOGIN_GITHUB}
						</a>
					{/if}
					<GithubCircle />
				</p>
				<p>
					{#if data.gcp_user}
						<span>{data.gcp_user.name}</span>
					{:else}
						<a
							href={routes.GCP.AUTHORIZE({
								client_id: gcp_client_id,
								redirect_uri: gcp_redirect_uri,
								scope: gcp_scope
							})}
						>
							{strings.LOGIN_GCP}
						</a>
					{/if}
					<Google />
				</p>
				{#if data.gcp_user}
					<p>
						{#if data.gcp_project}
							<span>
								<a
									href={routes.GCP.PROJECT(data.gcp_project.id).HOME}
									target="_blank"
								>
									{data.gcp_project.id}
								</a>
							</span>
						{:else}
							<a href={routes.SELECT_PROJECT}>{strings.SELECT_PROJECT}</a>
						{/if}
						<GoogleCloud />
					</p>
				{/if}
				{#if data.gh_user && data.gcp_user && data.gcp_project}
					<Anchor href={routes.WORKSPACE.GET} startsWith={true}>
						{strings.WORKSPACES}
					</Anchor>
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
		padding: 1em;
	}
</style>
