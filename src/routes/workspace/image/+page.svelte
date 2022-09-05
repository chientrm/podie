<script lang="ts">
	import strings from '$lib/constants/strings';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
</script>

<table>
	<thead>
		<td>{strings.NAME}</td>
		<td>{strings.STATUS}</td>
		<td>{strings.DISK_SIZE}</td>
		<td>{strings.REGION}</td>
		<td>{strings.ACTION}</td>
	</thead>
	<tbody>
		{#each data.images as { name, status, diskSizeGb, region }}
			<tr>
				<td>{name}</td>
				<td>{status}</td>
				<td>{diskSizeGb}</td>
				<td>{region}</td>
				<td>{strings.DELETE}</td>
			</tr>
		{/each}
	</tbody>
</table>
