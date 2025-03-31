<script lang="ts">
	import HoverMenu from './HoverMenu.svelte';
	import { authClient } from '$lib/auth-client';

	const session = authClient.useSession();

	let sessionData;
	$: sessionData = $session.data;
</script>

<div class="flex min-h-16 w-full flex-row items-center justify-between px-5 lg:px-56">
	<!-- Logo + Name -->
	<div class="flex flex-row items-center justify-center gap-12">
		<a
			href="/"
			class="flex flex-row items-center justify-center gap-4 select-none hover:cursor-pointer"
		>
			<img src="/Logo.svg" alt="GatorMarket Logo" />
			<p class="text-xl font-black">GatorMarket</p>
		</a>

		<!-- Navigation Links -->
		<div class="text-md flex flex-row items-center justify-center gap-6">
			<a class="hover:underline" href="/browse">Browse</a>
			<HoverMenu
				menuTitle="Categories"
				menuItems={[
					{
						label: 'Vehicles',
						href: '/browse?q=vehicles'
					},
					{
						label: 'Electronics',
						href: '/browse?q=electronics'
					},
					{
						label: 'Furniture',
						href: '/browse?q=furniture'
					},
					{
						label: 'Clothing',
						href: '/browse?q=clothing'
					},
					{
						label: 'Miscellaneous',
						href: '/browse?q=miscellaneous'
					}
				]}
			/>
			<a class="hover:underline" href="/profile">Sell</a>
		</div>
	</div>

	<div class="flex flex-row items-center justify-center">
		{#if sessionData}
			<a class="hover:underline" href="/account">My Account</a>
		{:else}
			<div class="flex flex-row gap-4">
				<a class="hover:underline" href="/login">Login</a>
				<a class="hover:underline" href="/signup">Sign Up</a>
			</div>
		{/if}
	</div>
</div>
