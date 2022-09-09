<script lang="ts">
	import CopyText from '$lib/components/CopyText.svelte';
	import routes from '$lib/constants/routes';
	import strings from '$lib/constants/strings';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
</script>

<p>Please follow these steps to add Podie to your GCP</p>
<ol>
	<li>
		Create <a href={routes.GCP.PROJECT_CREATE} target="_blank">
			{strings.NEW_GCP_PROJECT}
		</a>
		with ID "{data.id}"
	</li>
	<li>
		Enable <a href={routes.GCP.PROJECT(data.id).COMPUTE_API} target="_blank">
			Compute API
		</a>
	</li>
	<li>
		Go to <a href={routes.GCP.PROJECT(data.id).IAM} target="_blank">
			{strings.GOOGLE_IAM}
		</a> tab
	</li>
	<li>
		Add this principal
		<table>
			<tbody>
				<tr>
					<td>New principals</td>
					<td>
						<CopyText value={'podie-user@podie-io.iam.gserviceaccount.com'} />
					</td>
				</tr>
				<tr>
					<td>Select a role</td>
					<td><CopyText value={'Compute Admin'} /></td>
				</tr>
			</tbody>
		</table>
	</li>
	<li>
		<form method="POST">
			<input type="submit" value="Test connection" />
		</form>
		{#if data.message}
			{data.message}
			<i>Please test several times till `Connected`</i>
		{:else}
			<p class="success">Connected</p>
		{/if}
	</li>
</ol>

<style>
	.success {
		color: green;
	}
</style>
