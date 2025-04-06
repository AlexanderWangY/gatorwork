<script>
	import { goto } from '$app/navigation';
	import CustomButton from '$lib/components/CustomButton.svelte';
</script>

<div class="bg-brand-white flex flex-col items-center justify-center gap-5 py-72">
	<div class="flex flex-col items-center justify-center gap-2">
		<h1 class="text-brand-black text-5xl font-bold">404</h1>
		<h2 class="text-brand-gray text-xl">Hey, this page doesn't exist...</h2>
	</div>
	<CustomButton text="Go back home" variant="primary" onClick={() => goto('/')} />
</div>
