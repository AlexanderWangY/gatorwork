<script lang="ts">
	import { browser } from '$app/environment';
	import { appSignOut } from '$lib/auth-client.js';
	import AvatarSection from '$lib/components/Account/AvatarSection.svelte';
	import EmailSection from '$lib/components/Account/EmailSection.svelte';
	import NameSection from '$lib/components/Account/NameSection.svelte';
	import SkeletonLoader from '$lib/components/Account/SkeletonLoader.svelte';
	import { Button } from 'bits-ui';

	export let data;

	let isEditNameModalOpen = false;
</script>

<div class="flex min-h-screen flex-row justify-center">
	<div class="w-full max-w-7xl p-6">
		<h1 class="mb-6 text-3xl font-bold">Account Settings</h1>

		{#if !browser}
			<SkeletonLoader />
		{:else if data.user}
			<div class="flex flex-col space-y-6">
				<div class="flex flex-col space-y-4">
					<AvatarSection user={{ name: data.user.name, image: data.user.image! }} />
					<div class="space-y-3">
						<NameSection name={data.user.name} {isEditNameModalOpen} />
						<EmailSection email={data.user.email} />
					</div>
				</div>
			</div>

			<Button.Root
				class="text-brand-white mt-8 cursor-pointer rounded-md bg-red-500 px-8 py-1.5 hover:bg-red-300"
				onclick={appSignOut}
			>
				Log Out
			</Button.Root>

			<h2>Account ID: {data.user.id}</h2>

			<div class="mt-18 flex w-full flex-col gap-8">
				<h2 class="text-brand-black text-3xl font-normal">Your Listings</h2>
				<p>This feature is coming soon!</p>
			</div>
		{:else}
			<h1 class="py-4 text-xl font-medium">User not found</h1>
		{/if}
	</div>
</div>
