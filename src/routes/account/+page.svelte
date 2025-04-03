<script lang="ts">
	import { browser } from '$app/environment';
	import { Avatar, Button } from 'bits-ui';
	import BrandedTooltip from '../../components/BrandedTooltip.svelte';
	import TablerPencil from '~icons/tabler/pencil';
	import EditModal from '../../components/Account/EditModal.svelte';
	import { authClient } from '$lib/auth-client';
	import { goto } from '$app/navigation';

	export let data;

	let isEditNameModalOpen = false;

	const signOut = async () => {
		await authClient.signOut();
		goto('/');
	};
</script>

<div class="flex min-h-screen flex-row justify-center">
	<div class="w-full max-w-7xl p-6">
		<h1 class="mb-6 text-3xl font-bold">Account Settings</h1>
		{#if !browser}
			<div class="flex w-full flex-col gap-5">
				<div class="h-48 w-48 animate-pulse rounded-full bg-zinc-300"></div>
				<div class="h-12 w-[35%] animate-pulse rounded-md bg-zinc-300"></div>
				<div class="h-12 w-[50%] animate-pulse rounded-md bg-zinc-300"></div>
			</div>
		{:else if data.user}
			<div class="flex flex-col space-y-6">
				<div class="flex flex-col space-y-4">
					<!-- Avatar with tooltip for editing-->
					<div>
						<BrandedTooltip text="Click to change">
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
						</BrandedTooltip>
					</div>

					<!-- User info -->
					<div class="space-y-3">
						<div class="flex flex-col space-y-0.5">
							<p class="text-brand-gray font-normal">Name</p>
							<div class="flex flex-row items-center gap-5">
								<p class="text-brand-black text-2xl font-medium md:text-3xl">{data.user.name}</p>
								<EditModal
									isOpen={isEditNameModalOpen}
									title="Edit Name"
									description="Edit your name so people know who you are!"
									action="?/editName"
									inputName="name"
									label="New Name"
								>
									<button class="bg-brand-blue cursor-pointer rounded-sm p-1 hover:bg-blue-400">
										<TablerPencil class="text-brand-white h-5 w-5" />
									</button>
								</EditModal>
							</div>
						</div>

						<div class="flex flex-col space-y-0.5">
							<p class="text-brand-gray font-normal">Email</p>
							<div class="flex flex-row items-center gap-5">
								<p class="text-brand-black text-2xl font-medium md:text-3xl">{data.user.email}</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Button.Root
				class="text-brand-white mt-8 cursor-pointer rounded-md bg-red-500 px-8 py-1.5 hover:bg-red-300"
				onclick={signOut}>Log Out</Button.Root
			>

			<!-- User listings -->
			<div class="mt-18 flex w-full flex-col gap-8">
				<h2 class="text-brand-black text-3xl font-normal">Your Listings</h2>

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
