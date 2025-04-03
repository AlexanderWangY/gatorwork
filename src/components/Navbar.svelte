<script lang="ts">
	/*
	 * WHAT THE FUCK IS THIS FILE LMFAOOOOOOO I HATE MAKING MY OWN COMPONENTS LMFAOOOO
	 */
	import HoverMenu from './HoverMenu.svelte';
	import { authClient } from '$lib/auth-client';
	import { Button } from 'bits-ui';
	import MenuIcon from './MenuIcon.svelte';
	import { slide } from 'svelte/transition';
	import MobileNavbarItem from './MobileNavbarItem.svelte';
	import XIcon from './XIcon.svelte';
	import TablerChevronRight from '~icons/tabler/chevron-right';
	import TablerChevronLeft from '~icons/tabler/chevron-left';
	import { afterNavigate } from '$app/navigation';

	type MenuOptions = 'main' | 'categories';

	const session = authClient.useSession();

	let menuOpen = false;

	let currentMenu: MenuOptions = 'main';

	let menuItems = [
		{ label: 'Vehicles', href: '/browse?q=vehicles' },
		{ label: 'Electronics', href: '/browse?q=electronics' },
		{ label: 'Furniture', href: '/browse?q=furniture' },
		{ label: 'Clothing', href: '/browse?q=clothing' },
		{ label: 'Miscellaneous', href: '/browse?q=miscellaneous' }
	];

	let sessionData;
	$: sessionData = $session.data;

	const handleMenuClick = () => {
		menuOpen = !menuOpen;
		if (!menuOpen) currentMenu = 'main';
	};

	const changeCurrentMenu = (option: MenuOptions) => {
		currentMenu = option;
	};

	afterNavigate(() => {
		menuOpen = false;
	});
</script>

<div class="flex min-h-16 w-full flex-row items-center justify-center px-5">
	<!-- Logo + Name -->
	<div class="flex h-full max-w-7xl flex-1 flex-row items-center justify-between gap-10">
		<!-- Logo: Always Visible -->
		<div class="flex flex-row items-center justify-center">
			<a
				href="/"
				class="flex flex-row items-center justify-center gap-4 select-none hover:cursor-pointer"
			>
				<img src="/Logo.svg" alt="GatorMarket Logo" />
				<p class="text-xl font-black">GatorMarket</p>
			</a>
		</div>

		<!-- Burger Menu: Shown on sm-->
		<Button.Root
			onclick={handleMenuClick}
			class="flex h-full cursor-pointer items-center justify-center sm:hidden"
		>
			{#if menuOpen}
				<XIcon />
			{:else}
				<MenuIcon />
			{/if}
		</Button.Root>

		<!-- Nav Links & Auth: Hidden on sm -->
		<div class="hidden flex-1 flex-row items-center justify-between sm:flex">
			<!-- Navigation Links -->
			<div class="text-md flex flex-row items-center justify-center gap-6">
				<a class="hover:underline" href="/browse">Discover</a>
				<HoverMenu menuTitle="Categories" {menuItems} />
				<a class="hover:underline" href="/sell">Sell</a>
			</div>

			<!-- Account/Login -->
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
	</div>
</div>

<!-- FOR MOBILE-->

{#if menuOpen}
	<div
		class="expanded-menu transition-max-height overflow-hidden border-b-[1px] border-[#FFE6DF] duration-300 ease-out"
		style="max-height: 1000px;"
		transition:slide={{ duration: 300 }}
	>
		{#if currentMenu === 'main'}
			<MobileNavbarItem background="#F1F1F1" href="/browse" text="Discover">
				<span slot="icon">
					<TablerChevronRight class="text-brand-black" />
				</span>
			</MobileNavbarItem>

			<MobileNavbarItem onclick={() => changeCurrentMenu('categories')} text="Categories">
				<span slot="icon">
					<TablerChevronRight class="text-brand-black" />
				</span>
			</MobileNavbarItem>

			<MobileNavbarItem background="#F1F1F1" href="/browse" text="Sell">
				<span slot="icon">
					<TablerChevronRight class="text-brand-black" />
				</span>
			</MobileNavbarItem>

			{#if sessionData}
				<MobileNavbarItem background="#ff894a" color="#fffbfa" href="/account" text="My Account">
					<span slot="icon">
						<TablerChevronRight class="text-brand-white" />
					</span>
				</MobileNavbarItem>
			{:else}
				<div class="flex w-full flex-row">
					<MobileNavbarItem background="#ff894a" color="#fffbfa" href="/login" text="Login" />
					<MobileNavbarItem href="/signup" text="Sign Up" />
				</div>
			{/if}
		{/if}

		{#if currentMenu === 'categories'}
			<MobileNavbarItem background="#F1F1F1" onclick={() => changeCurrentMenu('main')} text="Back">
				<span slot="left-icon">
					<TablerChevronLeft class="text-brand-black" />
				</span>
			</MobileNavbarItem>

			{#each menuItems as item, index (item.label)}
				<MobileNavbarItem
					background={index % 2 === 0 ? undefined : '#F1F1F1'}
					href={item.href}
					text={item.label}
				>
					<span slot="icon">
						<TablerChevronRight class="text-brand-black" />
					</span>
				</MobileNavbarItem>
			{/each}
		{/if}
	</div>
{/if}

<style>
	.expanded-menu {
		max-height: 0;
	}
</style>
