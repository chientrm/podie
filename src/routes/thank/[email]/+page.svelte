<script lang="ts">
	import type { PageServerData } from './$types';
	export let data: PageServerData;
</script>

<p>Thank you for joining us {data.email}! 😃</p>
