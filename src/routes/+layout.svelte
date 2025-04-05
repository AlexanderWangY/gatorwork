<script lang="ts">
	import '../app.css';
	import Footer from '../lib/components/Footer.svelte';
	import Navbar from '../lib/components/Navbar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>GatorMarket | The Verified Marketplace for UF Students</title>
	<meta
		name="description"
		content="Buy and sell second hand items from verified University of Florida students."
	/>
</svelte:head>

<Navbar />
{@render children()}
<Footer />
