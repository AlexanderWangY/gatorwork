<script lang="ts">
	import { formatCurrency } from '$lib/utils/currency.js';

	export let data;
</script>

<div class="bg-brand-white mx-auto min-h-[70vh] max-w-7xl p-4">
	<nav class="text-brand-gray mb-6 text-lg">
		<a href="/account" class="underline-offset-4 hover:underline">Account</a> &gt; My listings
	</nav>

	<div class="mb-6 flex flex-col gap-2">
		<h1 class="text-brand-black text-4xl font-bold">Your listings</h1>
	</div>

	<div class="grid w-full grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 md:gap-3 lg:grid-cols-5">
		{#each data.listings as listing (listing.id)}
			<div class="col-span-1">
				<a href={`/listing/${listing.id}`} class="block">
					<img
						src={listing.coverImage}
						alt={listing.title}
						class="aspect-square w-full object-cover"
					/>
					<h2 class="mt-2 text-xl font-semibold">{listing.title}</h2>
					<p class="text-brand-gray text-lg font-bold">{formatCurrency(listing.price)}</p>
				</a>
			</div>
		{/each}
	</div>

	{#if data.listings.length === 0}
		<div class="mt-12 flex flex-col items-center justify-center text-center">
			<p class="text-brand-gray mb-4 text-xl">You haven't posted any listings yet.</p>
			<a
				href="/account/new-listing"
				class="bg-brand-blue rounded-md px-6 py-3 text-lg font-bold text-white transition hover:bg-blue-700"
			>
				Create Your First Listing
			</a>
		</div>
	{/if}
</div>
