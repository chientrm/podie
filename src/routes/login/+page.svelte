<script>
	import routes from '$lib/constants/routes';
	import strings from '$lib/constants/strings';
	import GithubCircle from 'svelte-material-icons/GithubCircle.svelte';
	import { client_id } from '$lib/configs/github.json';
	const scope = ['repo', 'read:user', 'user:email', 'workflow'].join(' ');
</script>

<section>
	<p>
		<a href={routes.GITHUB.AUTHORIZE({ client_id, scope })}>
			{strings.CONTINUE_WITH_GITHUB}
			<GithubCircle />
		</a>
	</p>
</section>

<style>
	section {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
</style>
