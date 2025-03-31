<script>
	import Button from '../components/Button.svelte';
	import Navbar from '../components/Navbar.svelte';
</script>

<Navbar />
<div class="flex py-72 w-full flex-col items-center justify-center">
	<div class="flex items-center justify-center flex-col gap-5">
		<div class="flex flex-col items-center justify-center gap-2">
			<h1 class="text-center text-5xl font-normal">
				The <span class="italic"
					><span class="text-brand-blue">Student</span>
					<span class="text-brand-orange">Marketplace</span></span
				> for Gators
			</h1>
			<h2 class="text-brand-gray text-center text-xl">
				Buy and sell second hand items from verified University of Florida students.
			</h2>
		</div>
		<div class="flex flex-row items-center justify-center gap-5">
			<Button text="Sign Up" variant='primary' />
            <a href="/create">Make a listing</a>
		</div>
	</div>
</div>
