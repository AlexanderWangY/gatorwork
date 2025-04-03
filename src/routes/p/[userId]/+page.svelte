<script lang="ts">
	export let data;
</script>

<div class="flex min-h-screen flex-row justify-center">
	<div class="h-96 w-7xl bg-orange-200">{data.user?.name ?? 'User not found'}</div>
</div>
