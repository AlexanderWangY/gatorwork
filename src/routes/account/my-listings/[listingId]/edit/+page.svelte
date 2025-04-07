<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { categoryNames, categoryToReadable } from '$lib/types/category.js';

	export let data;

	const { listing } = data;

	let title = listing?.title;
	let description = listing?.description;
	let price = listing?.price;
	let category = listing?.category;
	let condition = listing?.condition;
	let status = listing?.status;
	let listingId = listing?.id;

	let isSubmitting = false;
	let errorMessage: string | null = null;
</script>

<div class="bg-brand-white mx-auto min-h-[70vh] max-w-5xl p-4">
	{#if listing}
		<nav class="text-brand-gray mb-6 text-lg">
			<a href="/account" class="underline-offset-4 hover:underline">Account</a> &gt;
			<a href="/account/my-listings" class="underline-offset-4 hover:underline">My listings</a> &gt;
			Edit listing
		</nav>

		<div class="flex- mb-6 flex flex-col gap-2">
			<h1 class="text-brand-black text-4xl font-bold">Edit Listing</h1>
			<a
				href={`/listing/${listingId}`}
				class="text-brand-gray cursor-pointer text-lg underline-offset-4 hover:underline"
				>Editing {listing?.title}</a
			>
		</div>

		<form
			method="POST"
			action="?/updateListing"
			class="space-y-6"
			use:enhance={() => {
				isSubmitting = true;
				errorMessage = null;

				return async ({ result }) => {
					isSubmitting = false;

					if (result.type === 'success') {
						// If the server returned a listingId, navigate to it
						if (result.data && result.data.listingId) {
							await goto(`/listing/${result.data.listingId}`);
						}
					} else if (result.type === 'error') {
						errorMessage = result.error?.message || 'An error occurred while creating your listing';
					}
				};
			}}
		>
			{#if errorMessage}
				<div class="mb-4 rounded-md bg-red-100 p-4 text-red-700">
					{errorMessage}
				</div>
			{/if}

			<div class="flex flex-col gap-1">
				<label for="title" class="text-brand-black font-medium">Title</label>
				<input
					type="text"
					id="title"
					maxlength="80"
					name="title"
					bind:value={title}
					class="border-brand-gray rounded border p-3 text-lg"
					required
				/>
			</div>

			<div class="flex flex-col gap-1">
				<label for="description" class="text-brand-black font-medium">Description</label>
				<textarea
					id="description"
					name="description"
					maxlength="1000"
					bind:value={description}
					rows="6"
					class="border-brand-gray rounded border p-3 text-lg"
					required
				></textarea>
			</div>

			<div class="flex flex-col gap-1">
				<label for="price" class="text-brand-black font-medium">Price</label>
				<input
					type="number"
					id="price"
					name="price"
					bind:value={price}
					step="0.01"
					class="border-brand-gray rounded border p-3 text-lg"
					required
				/>
			</div>

			<div class="flex flex-col gap-1">
				<label for="category" class="text-brand-black font-medium">Category</label>
				<select
					id="category"
					name="category"
					bind:value={categoryToReadable[category!]}
					placeholder="Select a category"
					class="border-brand-gray rounded border p-3 text-lg"
					required
				>
					{#each categoryNames as categoryName (categoryName)}
						<option value={categoryName}>{categoryName}</option>
					{/each}
				</select>
			</div>

			<div class="flex flex-col gap-1">
				<label for="condition" class="text-brand-black font-medium">Condition</label>
				<select
					id="condition"
					name="condition"
					bind:value={condition}
					class="border-brand-gray rounded border p-3 text-lg"
					required
				>
					<option value="NEW">New</option>
					<option value="LIKE_NEW">Like New</option>
					<option value="GOOD">Good</option>
					<option value="FAIR">Fair</option>
					<option value="POOR">Poor</option>
				</select>
			</div>

			<div class="flex flex-col gap-1">
				<label for="status" class="text-brand-black font-medium">Status</label>
				<select
					id="status"
					name="status"
					bind:value={status}
					class="border-brand-gray rounded border p-3 text-lg"
					required
				>
					<option value="ACTIVE">Active</option>
					<option value="INACTIVE">Inactive</option>
					<option value="SOLD">Sold</option>
				</select>
			</div>

			<div class="pt-4">
				<button
					type="submit"
					class="bg-brand-blue cursor-pointer rounded-md px-6 py-3 text-lg font-semibold text-white transition hover:bg-blue-700"
				>
					{#if isSubmitting}
						Submitting...
					{:else}
						Update Listing
					{/if}
				</button>
			</div>
		</form>
	{:else}
		<div>
			<h1 class="text-brand-black text-4xl font-bold">Listing not found</h1>
			<p class="text-brand-gray mt-2 text-lg">
				The listing you are trying to edit does not exist or has been removed.
			</p>
			<a href="/account/my-listings" class="text-brand-blue underline">Go back to My Listings</a>
		</div>
	{/if}
</div>
