<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { Button } from 'bits-ui';

	export let data;

	const { listing } = data;

	let title = listing?.title;
	let listingId = listing?.id;

	let isSubmitting = false;
	let errorMessage: string | null = null;
</script>

<div class="bg-brand-white mx-auto min-h-[70vh] max-w-5xl p-4">
	{#if listing}
		<nav class="text-brand-gray mb-6 text-lg">
			<a href="/account" class="underline-offset-4 hover:underline">Account</a> &gt;
			<a href="/account/my-listings" class="underline-offset-4 hover:underline">My listings</a> &gt;
			Delete listing
		</nav>

		<div class="flex- mb-6 flex flex-col gap-2">
			<h1 class="text-brand-black text-4xl font-bold">Delete Listing</h1>
			<a
				href={`/listing/${listingId}`}
				class="text-brand-gray cursor-pointer text-lg underline-offset-4 hover:underline"
				>Deleting {listing?.title}</a
			>
		</div>

		<form
			method="POST"
			action="?/deleteListing"
			class="space-y-6"
			use:enhance={({ cancel, formData }) => {
				isSubmitting = true;
				errorMessage = null;

				if (!formData.get('confirmation') || formData.get('confirmation') !== title) {
					errorMessage = 'Confirmation text does not match the listing title';
					isSubmitting = false;
					cancel();
					return;
				}

				return async ({ result }) => {
					isSubmitting = false;

					if (result.type === 'success') {
						await goto(`/account/my-listings`);
					} else if (result.type === 'error') {
						errorMessage = result.error?.message || 'An error occurred while deleting your listing';
					}
				};
			}}
		>
			<div class="flex flex-col gap-2">
				<h2 class="text-brand-black text-xl font-bold">
					Are you sure you want to delete this listing? This action cannot be undone.
				</h2>
				<label for="confirmation" class="text-brand-black font-medium">
					Confirm by typing "{title}"
				</label>
				<input
					type="text"
					id="confirmation"
					name="confirmation"
					class="border-brand-gray focus:ring-brand-blue rounded-md border p-3 text-lg focus:ring-2 focus:outline-none"
					required
				/>
			</div>

			{#if errorMessage}
				<p class="mt-2 text-sm text-red-500">{errorMessage}</p>
			{/if}

			<div>
				<Button.Root
					type="submit"
					class="text-brand-white cursor-pointer rounded-md bg-red-600 px-8 py-3 font-bold transition hover:bg-red-700 focus:ring-2 focus:ring-red-400 focus:outline-none"
				>
					{isSubmitting ? 'Deleting...' : 'Delete Listing'}
				</Button.Root>
			</div>
		</form>
	{:else}
		<div>
			<h1 class="text-brand-black text-4xl font-bold">Listing not found</h1>
			<p class="text-brand-gray mt-2 text-lg">
				The listing you are trying to delete does not exist or has been removed.
			</p>
			<a href="/account/my-listings" class="text-brand-blue underline">Go back to My Listings</a>
		</div>
	{/if}
</div>
