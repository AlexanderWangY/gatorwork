<script lang="ts">
	import ItemPreview from '$lib/components/ItemPreview.svelte';
	import { categoryNames } from '$lib/types/category';
	import type { Condition } from '@prisma/client';
	import { Button, Select } from 'bits-ui';
	import MingcuteCamera2AiLine from '~icons/mingcute/camera-2-ai-line';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	let files: File[] = []; // Array to store the selected files
	let fileInput: HTMLInputElement | null = null; // Reference to the file input element
	let isSubmitting = false;
	let error: string | null = null;

	// For character counters!
	let title: string = '';
	let description: string = '';

	// Function to handle file selection
	const handleFileChange = (event: Event): void => {
		const input = event.target as HTMLInputElement;
		const selectedFiles = input.files ? Array.from(input.files) : [];
		files = [...files, ...selectedFiles].slice(0, 6); // Add up to 6 files
	};

	// Function to remove a file
	const removeFile = (index: number): void => {
		files = files.filter((_, i) => i !== index);
	};

	const setCoverPhoto = (index: number): void => {
		if (index === 0) return; // No need to swap if it's already the first one

		let tmp = files[index];
		files[index] = files[0];
		files[0] = tmp;
	};

	interface CategoryOptions {
		value: string;
		label: string;
	}

	let value: string = '';

	const categories: CategoryOptions[] = categoryNames.map((category) => ({
		value: category,
		label: category
	}));

	interface ConditionOptions {
		value: Condition;
		title: string;
		description: string;
	}

	let selectedCondition = '';

	const conditionOptions: ConditionOptions[] = [
		{
			value: 'NEW',
			title: 'New',
			description: 'Brand new item, never used or opened. In original packaging.'
		},
		{
			value: 'LIKE_NEW',
			title: 'Like New',
			description: 'Used item in excellent condition. No visible wear and tear.'
		},
		{
			value: 'GOOD',
			title: 'Good',
			description: 'Used item in good condition. Some visible wear and tear.'
		},
		{
			value: 'FAIR',
			title: 'Fair',
			description: 'Used item in fair condition. Noticeable wear and tear.'
		},
		{
			value: 'POOR',
			title: 'Poor',
			description: 'Used item in poor condition. Significant wear and tear.'
		}
	];

	function handleSelection(value: Condition) {
		selectedCondition = value;
	}
</script>

<div class="mx-auto min-h-screen max-w-5xl p-6 lg:py-12">
	<!-- Breadcrumb -->
	<nav class="text-brand-gray text-md mb-6 md:text-lg">
		<a href="/account" class="underline-offset-4 hover:underline">Account</a> &gt; Create new listing
	</nav>

	<!-- Title -->
	<div class="mb-12 flex flex-col gap-2">
		<h1 class="text-brand-black text-2xl font-bold md:text-4xl">Create a new listing</h1>
	</div>

	<!-- Form -->
	<form
		class="flex flex-col gap-12"
		method="POST"
		action="?/createListing"
		enctype="multipart/form-data"
		use:enhance={({ cancel, formData }) => {
			// Check form validity before enhancing

			console.log('Form submitted');
			if (files.length === 0) {
				error = 'Please upload at least one image';
				cancel();
				return;
			}

			if (fileInput) {
				fileInput.value = '';
			}

			formData.delete('photos'); // Remove the default file input from FormData

			// Manually append all files from our files array to the FormData
			files.forEach((file) => {
				formData.append(`photos`, file);
			});

			isSubmitting = true;
			error = null;

			return async ({ result }) => {
				isSubmitting = false;

				if (result.type === 'success') {
					// If the server returned a listingId, navigate to it
					if (result.data && result.data.listingId) {
						await goto(`/listing/${result.data.listingId}`);
					}
				} else if (result.type === 'error') {
					error = result.error?.message || 'An error occurred while creating your listing';
				}
			};
		}}
	>
		<!-- Error message display -->
		{#if error}
			<div class="border-l-4 border-red-500 bg-red-100 p-4 text-red-700" role="alert">
				<p>{error}</p>
			</div>
		{/if}

		<!-- Picture upload -->
		<div class="flex flex-col gap-4">
			{#if files.length > 0}
				<div class="grid grid-cols-3 gap-2 md:grid-cols-4">
					{#each files as file, idx (idx)}
						<ItemPreview
							{file}
							{idx}
							onRemove={removeFile}
							onClick={setCoverPhoto}
							isCoverPhoto={idx === 0}
						/>
					{/each}
				</div>

				<p class="text-brand-gray md:text-md text-sm">
					Click on any picture to set it as the cover photo.
				</p>
			{/if}

			<div>
				<!-- Button to trigger file input -->
				<button
					class="hover:border-brand-gray text-brand-gray hover:text-brand-black flex w-full cursor-pointer flex-col items-center justify-center border-[1px] border-[#CDCDCD] py-20 md:py-28"
					type="button"
					on:click={() => fileInput?.click()}
				>
					<MingcuteCamera2AiLine class="inline-block h-6 w-6" />
					<span>Upload Pictures</span>
					<span class="text-sm">{files.length} / 6 remaining</span>
				</button>

				<!-- File input -->
				<input
					bind:this={fileInput}
					type="file"
					name="photos"
					accept="image/png, image/jpeg, image/jpg, image/webp"
					multiple
					on:change={handleFileChange}
					style="display: none"
				/>
			</div>
		</div>

		<div class="flex flex-col gap-6">
			<h2 class="text-2xl font-bold">Item Information</h2>

			<div class="flex flex-col gap-4">
				<div class="flex flex-col">
					<div class="flex w-full flex-row items-center justify-between">
						<label for="title" class="text-lg">Title</label>
						<p class="text-brand-gray text-sm">{title.length}/80</p>
					</div>
					<input
						type="text"
						name="title"
						maxlength="80"
						bind:value={title}
						id="title"
						class="focus:border-brand-blue mt-2 rounded-md border border-gray-300 p-2 focus:outline-none"
						placeholder="Enter the title of your item"
						required
					/>
				</div>

				<div class="flex flex-col">
					<div class="flex w-full flex-row items-center justify-between">
						<label for="description" class="text-lg">Description</label>
						<p class="text-brand-gray text-sm">{description.length}/1000</p>
					</div>
					<textarea
						id="description"
						name="description"
						bind:value={description}
						maxlength="1000"
						rows="8"
						class="focus:border-brand-blue mt-2 rounded-md border border-gray-300 p-2 focus:outline-none"
						placeholder="Enter the description of your item. Try to be specific!"
						required
					></textarea>
				</div>

				<div class="flex w-full flex-col md:w-1/2 lg:w-1/4">
					<label for="price" class="text-lg">Price</label>
					<div class="relative mt-2">
						<!-- Dollar symbol inside the input -->
						<span class="absolute top-1/2 left-2 -translate-y-1/2 transform text-gray-400">$</span>
						<input
							id="price"
							name="price"
							type="number"
							step="0.01"
							class="focus:border-brand-blue w-full rounded-md border border-gray-300 p-2 pl-8 focus:outline-none"
							required
						/>
					</div>
				</div>

				<div class="flex w-full flex-col md:w-1/2 lg:w-1/4">
					<label for="category" class="text-lg">Category</label>
					<Select.Root
						required
						name="category"
						type="single"
						onValueChange={(v) => (value = v)}
						items={categories}
					>
						<Select.Trigger
							class="focus:border-brand-blue mt-2 flex w-full cursor-pointer items-center justify-between rounded-md border border-gray-300 p-2 focus:outline-none"
							aria-label="Select a category"
						>
							{value !== '' ? value : 'Select a category'}
						</Select.Trigger>
						<Select.Portal>
							<Select.Content class="bg-brand-white w-full rounded-md shadow-lg" sideOffset={10}>
								<Select.Viewport class="w-full p-1">
									{#each categories as category, i (i + category.value)}
										<Select.Item
											class="hover:bg-brand-blue hover:text-brand-white flex cursor-pointer items-center rounded-md p-2"
											value={category.value}
											label={category.label}
										>
											{#snippet children({ selected })}
												{category.label}
												{#if selected}
													<div class="text-brand-black"></div>
												{/if}
											{/snippet}
										</Select.Item>
									{/each}
								</Select.Viewport>
							</Select.Content>
						</Select.Portal>
					</Select.Root>
				</div>
			</div>

			<div class="flex w-full flex-col gap-2">
				<label for="price" class="text-lg">Condition</label>
				<div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
					{#each conditionOptions as option (option.value)}
						<label class="block cursor-pointer" for={option.value}>
							<div
								class={`flex min-h-full flex-col items-center justify-center rounded-md border-2 p-6 transition-all duration-300 ease-in-out hover:shadow-lg ${selectedCondition === option.value ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
							>
								<input
									type="radio"
									required
									id={option.value}
									name="condition"
									value={option.value}
									class="sr-only"
									on:change={() => handleSelection(option.value)}
									checked={selectedCondition === option.value}
								/>
								<h3 class="mb-2 text-center text-xl font-semibold">{option.title}</h3>
								<p class="text-center text-sm text-gray-600">
									{option.description}
								</p>
							</div>
						</label>
					{/each}
				</div>
			</div>

			<Button.Root
				type="submit"
				disabled={isSubmitting}
				class="bg-brand-blue text-brand-white rounded-md py-3 hover:cursor-pointer hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70 sm:px-7"
			>
				{#if isSubmitting}
					Submitting...
				{:else}
					Submit Listing
				{/if}
			</Button.Root>
		</div>
	</form>
</div>
