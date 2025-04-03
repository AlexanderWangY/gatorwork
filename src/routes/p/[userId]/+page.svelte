<script lang="ts">
	import { browser } from '$app/environment';
	import { Avatar } from 'bits-ui';

	export let data;
</script>

<div class="flex min-h-screen flex-row justify-center">
	<div class="w-full max-w-7xl p-6">
		{#if !browser}
			<div class="flex w-full flex-col gap-5">
				<div class="h-48 w-48 animate-pulse rounded-full bg-zinc-300"></div>
				<div class="h-12 w-[35%] animate-pulse rounded-md bg-zinc-300"></div>
				<div class="h-12 w-[50%] animate-pulse rounded-md bg-zinc-300"></div>
			</div>
		{:else if data.user}
			<div class="flex flex-col space-y-6">
				<div class="flex flex-col space-y-4">
					<div>
						<Avatar.Root
							delayMs={0}
							class="h-48 w-48 rounded-full text-lg font-medium uppercase hover:cursor-pointer"
						>
							<div
								class="flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-gray-300"
							>
								<Avatar.Image src={data.user.image} alt={data.user.name} />
								<Avatar.Fallback class="text-4xl"
									>{data.user.name ? data.user.name.substring(0, 2) : 'U'}</Avatar.Fallback
								>
							</div>
						</Avatar.Root>
					</div>

					<!-- User info -->
					<div class="flex flex-col gap-3">
						<p class="text-brand-black text-2xl font-medium md:text-3xl">{data.user.name}</p>
						<p class="text-brand-gray">
							Joined {new Intl.DateTimeFormat('en-US', {
								month: 'long',
								day: 'numeric',
								year: 'numeric'
							}).format(data.user.createdAt)}
						</p>
					</div>
				</div>
			</div>

			<!-- User listings -->
			<div class="mt-18 flex w-full flex-col gap-8">
				<h2 class="text-brand-black text-3xl font-normal">Listings</h2>

				<p>This feature is coming soon!</p>

				<!-- <div class="grid w-full grid-cols-3">
					<div class="h-48 w-full bg-red-300"></div>
					<div class="h-48 w-full bg-blue-300"></div>
					<div class="h-48 w-full bg-green-300"></div>
				</div> -->
			</div>
		{:else}
			<h1 class="py-4 text-xl font-medium">User not found</h1>
		{/if}
	</div>
</div>
