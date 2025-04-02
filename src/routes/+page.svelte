<script>
	import { Button } from 'bits-ui';
	import Footer from '../components/Footer.svelte';
	import Navbar from '../components/Navbar.svelte';
	import TablerArrowNarrowRight from '~icons/tabler/arrow-narrow-right';
</script>

<Navbar />
<div
	class="flex w-full flex-col items-center justify-center overflow-hidden py-16 md:py-24 lg:pt-72 lg:pb-36"
>
	<div class="flex max-w-7xl flex-col items-center justify-center gap-5 px-4">
		<div class="flex flex-col items-center justify-center gap-2">
			<h1 class="text-center text-3xl font-normal sm:text-4xl md:text-5xl lg:text-6xl">
				The <span class="italic"
					><span class="text-brand-blue">Student</span>
					<span class="text-brand-orange">Marketplace</span></span
				>
				for
				<img
					class="inline-block h-8 sm:h-12 md:h-16 lg:h-18"
					src="/Florida_Gator_Logo.png"
					alt="University of Florida logo"
				/>
			</h1>
			<h2 class="text-brand-gray text-center text-base sm:text-lg lg:text-xl">
				Buy and sell second hand items from verified University of Florida students.
			</h2>
		</div>
		<div class="flex flex-row items-center justify-center gap-5">
			<Button.Root
				href="/browse?sort=Top&time=Recent"
				class="bg-brand-orange text-brand-white rounded-md px-5 py-1.5 hover:cursor-pointer hover:bg-orange-300 sm:px-7"
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

	<div
		class="mx-auto mt-16 flex w-full max-w-7xl flex-col items-center justify-center gap-10 sm:mt-24 lg:mt-36"
	>
		<h2 class="text-base font-normal italic sm:text-lg">What are you looking for?</h2>
		<div
			class="mx-auto grid w-full grid-cols-1 gap-5 px-8 sm:grid-cols-2 md:gap-5 md:px-16 lg:grid-cols-4 lg:gap-6 lg:px-6"
		>
			<div
				class="hover:text-brand-white min-h-24 rounded-md bg-orange-300 px-5 py-5 duration-100 hover:scale-105 hover:cursor-pointer hover:bg-orange-400 md:min-h-42"
			>
				<h3 class="text-lg font-bold sm:text-xl">Used Cars</h3>
			</div>

			<div
				class="hover:text-brand-white min-h-24 rounded-md bg-orange-300 px-5 py-5 duration-100 hover:scale-105 hover:cursor-pointer hover:bg-orange-400 md:min-h-42"
			>
				<h3 class="text-lg font-bold sm:text-xl">Furniture</h3>
			</div>

			<div
				class="hover:text-brand-white min-h-24 rounded-md bg-orange-300 px-5 py-5 duration-100 hover:scale-105 hover:cursor-pointer hover:bg-orange-400 md:min-h-42"
			>
				<h3 class="text-lg font-bold sm:text-xl">Electronics</h3>
			</div>

			<div
				class="hover:text-brand-white min-h-24 rounded-md bg-orange-300 px-5 py-5 duration-100 hover:scale-105 hover:cursor-pointer hover:bg-orange-400 md:min-h-42"
			>
				<h3 class="text-lg font-bold sm:text-xl">Appliances</h3>
			</div>
		</div>
	</div>
</div>
<Footer />
