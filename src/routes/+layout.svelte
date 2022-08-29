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
	const gh_scope = ['repo'].join(' ');
	const gcp_scope = [
		'https://www.googleapis.com/auth/userinfo.email',
		'https://www.googleapis.com/auth/userinfo.profile',
		'https://www.googleapis.com/auth/cloud-platform',
		'https://www.googleapis.com/auth/compute'
	].join(' ');

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
		<section>
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
		</section>
		<section>
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
		</section>
		{#if data.gcp_user}
			<section>
				{#if data.gcp_project}
					<span>
						<a
							href={routes.GCP.PROJECT(data.gcp_project.projectId).INSTANCE
								.LIST}
							target="_blank"
						>
							{data.gcp_project.name}
						</a>
					</span>
				{:else}
					<a href={routes.SELECT_PROJECT}>{strings.SELECT_PROJECT}</a>
				{/if}
				<GoogleCloud />
			</section>
		{/if}
		{#if data.gh_user && data.gcp_user && data.gcp_project}
			<Anchor href={routes.WORKSPACES}>{strings.WORKSPACES}</Anchor>
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
	section {
		display: flex;
		flex-direction: row;
		align-items: center;
		border: 1px solid black;
		padding: 0.5em;
		gap: 0.5em;
	}
</style>
