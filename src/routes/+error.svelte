<script>
	import Button from '../components/Button.svelte';
	import { goto } from '$app/navigation';
	import Navbar from '../components/Navbar.svelte';
</script>

<Navbar />
<div class="bg-brand-white flex flex-col items-center justify-center gap-5 py-72">
	<div class="flex flex-col items-center justify-center gap-2">
		<h1 class="text-brand-black text-5xl font-bold">404</h1>
		<h2 class="text-brand-gray text-xl">Hey, this page doesn't exist...</h2>
	</div>
	<Button text="Go back home" variant="primary" onClick={() => goto('/')} />
</div>
