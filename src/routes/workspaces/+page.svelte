<script lang="ts">
	import { page } from '$app/stores';
	import { client_id } from '$lib/configs/gcp.json';
	import routes from '$lib/constants/routes';
	import strings from '$lib/constants/strings';
	import GoogleCloud from 'svelte-material-icons/GoogleCloud.svelte';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
	const redirect_uri = `${$page.url.origin}${routes.GCP.REDIRECT}`;
	const scope = [
		'https://www.googleapis.com/auth/cloud-platform',
		'https://www.googleapis.com/auth/compute'
	].join(' ');
</script>

<h2>{strings.PROJECTS}</h2>
{#if !data.projects}
	<a href={routes.GCP.AUTHORIZE({ client_id, redirect_uri, scope })}>
		{strings.CONNECT_GCP}
		<GoogleCloud />
	</a>
{:else}
	<ul>
		{#each data.projects as project}
			<li>{project.projectId}</li>
		{/each}
	</ul>
{/if}

<h2>{strings.REPOES}</h2>
<ul>
	{#each data.repoes as repo}
		<li>{repo.full_name}</li>
	{/each}
</ul>
