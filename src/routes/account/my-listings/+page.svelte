<script lang="ts">
	export let data;
</script>

<div class="bg-brand-white mx-auto min-h-[70vh] max-w-7xl p-4">
	<nav class="text-brand-gray mb-6 text-lg">
		<a href="/account" class="underline-offset-4 hover:underline">Account</a> &gt; My listings
	</nav>

	<div class="mb-6 flex flex-col gap-2">
		<h1 class="text-brand-black text-4xl font-bold">Your listings</h1>
	</div>

	<div class="grid w-full grid-cols-6 gap-2">
		{#each data.listings as listing (listing.id)}
			<div class="col-span-1">
				<a href={`/listing/${listing.id}`} class="block">
					<img src={listing.coverImage} alt={listing.title} class="h-48 w-full object-cover" />
					<h2 class="mt-2 text-xl font-semibold">{listing.title}</h2>
				</a>
			</div>
		{/each}
	</div>
</div>
