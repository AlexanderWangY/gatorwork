<script lang="ts">
	import { browser } from '$app/environment';
	import { Avatar, Button } from 'bits-ui';
	import { formatCurrency } from '$lib/utils/currency';
	import TablerChevronRight from '~icons/tabler/chevron-right';
	import { conditionToReadable } from '$lib/types/condition';
	import { categoryToReadable } from '$lib/types/category.js';
	import { ListingStatus } from '@prisma/client';

	export let data;

	let selectedImageIndex = 0;
</script>

<div class="bg-brand-white mx-auto min-h-[70vh] max-w-7xl p-4">
	{#if !browser}
		<div class="flex flex-col justify-between gap-6 md:flex-row md:gap-12">
			<!-- Image Gallery Skeleton -->
			<div class="flex flex-col-reverse gap-4 overflow-auto md:flex-row">
				<!-- Thumbnail Images Skeleton -->
				<div class="flex flex-row flex-wrap gap-2 md:flex-col">
					{#each [0, 1, 2, 3] as idx (idx)}
						<div class="flex aspect-square h-16 cursor-pointer items-center justify-center md:h-24">
							<div class="h-full w-full animate-pulse rounded-md bg-zinc-200"></div>
						</div>
					{/each}
				</div>

				<!-- Main Image Skeleton -->
				<div
					class="flex aspect-square h-[90vw] w-[90vw] items-center justify-center md:h-[50vh] md:w-[50vh]"
				>
					<div class="h-full w-full animate-pulse rounded-md bg-zinc-200"></div>
				</div>
			</div>

			<!-- Listing Details Skeleton -->
			<div class="flex flex-1 flex-col gap-6">
				<div class="flex flex-col gap-2">
					<div class="h-8 w-3/4 animate-pulse rounded-md bg-zinc-200"></div>
					<div class="h-6 w-1/2 animate-pulse rounded-md bg-zinc-200"></div>
				</div>

				<!-- Description Skeleton -->
				<div class="mt-4 flex flex-col gap-2">
					<div class="h-6 w-1/4 animate-pulse rounded-md bg-zinc-200"></div>
					<div class="h-4 w-3/4 animate-pulse rounded-md bg-zinc-200"></div>
				</div>

				<div>
					<div class="h-6 w-1/4 animate-pulse rounded-md bg-zinc-200"></div>

					<ul class="mt-2 flex flex-col gap-2">
						<li class="flex items-center gap-2">
							<div class="h-4 w-1/3 animate-pulse rounded-md bg-zinc-200"></div>
						</li>
						<li class="flex items-center gap-2">
							<div class="h-4 w-1/3 animate-pulse rounded-md bg-zinc-200"></div>
						</li>
						<li class="flex items-center gap-2">
							<div class="h-4 w-1/3 animate-pulse rounded-md bg-zinc-200"></div>
						</li>
					</ul>
				</div>

				<div>
					<div class="mb-8 h-12 w-12 animate-pulse rounded-full bg-zinc-200"></div>
					<div class="flex flex-1 flex-col gap-2">
						<div class="h-4 w-3/4 animate-pulse rounded-md bg-zinc-200"></div>
						<div class="h-4 w-1/2 animate-pulse rounded-md bg-zinc-200"></div>
					</div>
				</div>
			</div>
		</div>
	{:else if data.listing}
		<div class="flex flex-col justify-between gap-6 pb-24 md:flex-row md:gap-12 md:pt-8">
			<!-- Image Gallery -->
			<div class="flex flex-col-reverse gap-4 overflow-auto md:flex-row">
				<!-- Thumbnail Images -->
				<div class="flex flex-row flex-wrap gap-2 md:flex-col">
					{#each data.listing.images as image, index (index)}
						<button
							class="flex aspect-square h-16 cursor-pointer items-center justify-center md:h-24"
							style={`opacity: ${selectedImageIndex === index ? 1 : 0.5}`}
							on:click={() => (selectedImageIndex = index)}
						>
							<img src={image} alt="Thumbnail" class="h-full w-full object-cover" />
						</button>
					{/each}
				</div>
				<!-- Main Image -->
				<div class="flex h-full w-full items-center justify-center">
					<img
						src={data.listing.images[selectedImageIndex]}
						alt="Main"
						class="h-full w-full object-cover"
					/>
				</div>
			</div>

			<!-- Listing Details -->
			<div class="flex flex-1 flex-col gap-6">
				<div class="flex flex-col gap-2">
					<h1 class="text-brand-black text-3xl">{data.listing.title}</h1>
					<div class="flex flex-row items-center gap-4">
						<h2
							class={`text-brand-black text-2xl font-bold ${data.listing.status === ListingStatus.SOLD ? 'text-brand-gray line-through' : ''}`}
						>
							{formatCurrency(data.listing.price)}
						</h2>

						{#if data.listing.status === ListingStatus.SOLD}
							<span class="text-brand-white rounded-md bg-green-700 px-6 py-1 text-sm font-bold">
								SOLD
							</span>
						{:else if data.listing.status === ListingStatus.INACTIVE}
							<span class="text-brand-white bg-brand-gray rounded-md px-6 py-1 text-sm font-bold">
								INACTIVE
							</span>
						{/if}
					</div>
				</div>

				<!-- Description -->
				<div class="mt-4 flex flex-col gap-2">
					<h3 class="text-brand-black text-xl font-normal">Description</h3>
					<p class="text-brand-gray">{data.listing.description}</p>
				</div>

				<div>
					<h3 class="text-brand-black text-xl font-normal">Details</h3>

					<ul class="mt-2 flex flex-col gap-2">
						<li class="flex items-center gap-2">
							<span class="text-brand-gray">Condition:</span>
							<span class="text-brand-black">{conditionToReadable[data.listing.condition]}</span>
						</li>
						<li class="flex items-center gap-2">
							<span class="text-brand-gray">Category:</span>
							<span class="text-brand-black">{categoryToReadable[data.listing.category]}</span>
						</li>
						<li class="flex items-center gap-2">
							<span class="text-brand-gray">Posted on:</span>
							<span class="text-brand-black">
								{new Intl.DateTimeFormat('en-US', {
									month: 'long',
									day: '2-digit',
									year: 'numeric'
								}).format(new Date(data.listing.createdAt))}</span
							>
						</li>
					</ul>
				</div>

				{#if data.listing.status === ListingStatus.ACTIVE && data.user?.id !== data.listing.userId}
					<Button.Root
						href={`/account/messages/${data.listing.userId}?listingId=${data.listing.id}`}
						class="text-brand-white bg-brand-orange hover:bg-brand-light-orange mt-4 w-fit cursor-pointer rounded-md px-12 py-2 font-bold"
						>Message Seller</Button.Root
					>
				{/if}

				{#if data.user?.id === data.listing.userId}
					<div class="flex flex-row gap-4">
						<Button.Root
							href={`/account/my-listings/${data.listing.id}/edit`}
							class="text-brand-white bg-brand-blue mt-4 w-fit cursor-pointer rounded-md px-6 py-2 font-bold hover:bg-blue-800"
							>Edit Listing</Button.Root
						>

						<Button.Root
							href={`/account/my-listings/${data.listing.id}/delete`}
							class="text-brand-white mt-4 w-fit cursor-pointer rounded-md bg-red-600 px-6 py-2 font-bold hover:bg-red-500"
							>Delete Listing</Button.Root
						>
					</div>
				{/if}

				<div>
					<Button.Root
						href={`/p/${data.listing.user.id}`}
						class="flex w-fit cursor-pointer flex-row items-center justify-center gap-2 rounded-md py-1.5 pr-8 pl-1 hover:bg-zinc-100"
					>
						<Avatar.Root class="h-12 w-12 cursor-pointer select-none">
							<Avatar.Image
								class="aspect-square h-full w-full rounded-full object-cover"
								src={data.listing.user.image ??
									'https://i.pinimg.com/474x/25/1c/e1/251ce139d8c07cbcc9daeca832851719.jpg'}
								alt="User Avatar"
							/>
							<Avatar.Fallback
								class="flex aspect-square h-full w-full items-center justify-center rounded-full bg-zinc-200"
							>
								UF
							</Avatar.Fallback>
						</Avatar.Root>

						<div class="flex flex-1 flex-col items-start justify-center">
							<p class="text-brand-black text-md font-bold">{data.listing.user.name}</p>
							<div class="text-brand-gray flex flex-row items-center text-sm">
								<p>View Seller</p>
								<TablerChevronRight class="text-brand-gray ml-1 h-4 w-4" />
							</div>
						</div>
					</Button.Root>
				</div>
			</div>
		</div>
	{:else}
		<div class="flex h-[80vh] flex-col items-center justify-center gap-2">
			<h2 class="text-brand-black text-2xl">That's weird...</h2>
			<p class="text-md text-gray-500">We couldn't find the listing you're looking for.</p>
			<Button.Root
				href="/"
				class="text-brand-white bg-brand-orange hover:bg-brand-light-orange mt-4 cursor-pointer rounded-md px-12 py-2 font-bold"
				>Home</Button.Root
			>
		</div>
	{/if}
</div>
