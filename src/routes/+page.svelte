<script>
	import { Button } from 'bits-ui';
	import Footer from '../components/Footer.svelte';
	import Navbar from '../components/Navbar.svelte';

	import TablerArrowNarrowRight from '~icons/tabler/arrow-narrow-right';
</script>

<Navbar />
<div class="flex w-full flex-col items-center justify-center overflow-hidden pt-72 pb-36">
	<div class="flex flex-col items-center justify-center gap-5">
		<div class="flex flex-col items-center justify-center gap-2">
			<h1 class="text-center text-5xl font-normal">
				The <span class="italic"
					><span class="text-brand-blue">Student</span>
					<span class="text-brand-orange">Marketplace</span></span
				>
				for

				<img
					class="inline-block h-14"
					src="/Florida_Gator_Logo.png"
					alt="University of Florida logo"
				/>
			</h1>
			<h2 class="text-brand-gray text-center text-xl">
				Buy and sell second hand items from verified University of Florida students.
			</h2>
		</div>
		<div class="flex flex-row items-center justify-center gap-5">
			<Button.Root
				href="/browse?sort=Top&time=Recent"
				class="bg-brand-orange text-brand-white rounded-md px-7 py-1.5 hover:cursor-pointer hover:bg-orange-300"
				>Browse</Button.Root
			>
			<a
				class="flex flex-row items-center justify-center gap-1 underline-offset-4 hover:underline"
				href="/create"
				>Make a listing
				<TablerArrowNarrowRight class="text-brand-black inline-block w-5" />
			</a>
		</div>
	</div>

	<h1 class="lg:hidden">Medium</h1>
	<h1 class="hidden sm:block lg:hidden">Small</h1>
	<h1 class="hidden lg:block xl:hidden">Large</h1>
	<h1 class="hidden xl:block">Extra Large</h1>

	<div class="mt-36 flex w-full flex-col items-center justify-center gap-10">
		<h2 class="text-lg font-normal italic">What are you looking for?</h2>

		<div class="flex w-full flex-row justify-center gap-12 lg:px-72">
			<div
				class="hover:text-brand-white aspect-square h-60 rounded-md bg-orange-300 px-5 py-5 duration-100 hover:scale-102 hover:cursor-pointer hover:bg-orange-400"
			>
				<h3 class="text-xl font-bold">Used Cars</h3>
			</div>

			<div
				class="hover:text-brand-white aspect-square h-60 rounded-md bg-orange-300 px-5 py-5 duration-100 hover:scale-102 hover:cursor-pointer hover:bg-orange-400"
			>
				<h3 class="text-xl font-bold">Furniture</h3>
			</div>

			<div
				class="hover:text-brand-white aspect-square h-60 rounded-md bg-orange-300 px-5 py-5 duration-100 hover:scale-102 hover:cursor-pointer hover:bg-orange-400"
			>
				<h3 class="text-xl font-bold">Appliances</h3>
			</div>

			<div
				class="hover:text-brand-white aspect-square h-60 rounded-md bg-orange-300 px-5 py-5 duration-100 hover:scale-102 hover:cursor-pointer hover:bg-orange-400"
			>
				<h3 class="text-xl font-bold">Electronics</h3>
			</div>
		</div>
	</div>
</div>

<Footer />
