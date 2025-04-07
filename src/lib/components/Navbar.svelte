<script lang="ts">
	import TablerChevronDown from '~icons/tabler/chevron-down';
	import TablerChevronRight from '~icons/tabler/chevron-right';
	import { onMount } from 'svelte';
	import { authClient } from '$lib/auth-client';
	import { Avatar, Button, DropdownMenu } from 'bits-ui';
	import MingcuteMessage1Line from '~icons/mingcute/message-1-line';
	import MingcuteBookmarkLine from '~icons/mingcute/bookmark-line';
	import MingcuteBox2Line from '~icons/mingcute/box-2-line';
	import MingcuteSettings1Line from '~icons/mingcute/settings-1-line';
	import MingcuteExitLine from '~icons/mingcute/exit-line';
	import MingcuteQuestionLine from '~icons/mingcute/question-line';
	import MingcuteSafeShield2Fill from '~icons/mingcute/safe-shield-2-fill';
	import MingcuteMenuFill from '~icons/mingcute/menu-fill';
	import MakiCross from '~icons/maki/cross';
	import MingcuteEnterDoorLine from '~icons/mingcute/enter-door-line';
	import MingcuteUser1Line from '~icons/mingcute/user-1-line';
	import MingcuteGrid2Line from '~icons/mingcute/grid-2-line';
	import MingcuteSearch2Line from '~icons/mingcute/search-2-line';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import MenuDivider from './MenuDivider.svelte';
	import { browser } from '$app/environment';

	const session = authClient.useSession();
	let sessionData;
	$: sessionData = $session.data;

	let isDrawerNavigationOpen = false;
	let isCategoryMenuOpen = false;
	let menuButton: HTMLElement;
	let menuItems = [
		{ label: 'Textbooks', href: '/browse?category=textbooks' },
		{ label: 'Electronics', href: '/browse?category=electronics' },
		{ label: 'Furniture', href: '/browse?category=furniture' },
		{ label: 'Clothing', href: '/browse?category=clothing' },
		{ label: 'Miscellaneous', href: '/browse?category=other' }
	];

	async function handleLogout() {
		await authClient.signOut();
		goto('/');
	}

	function closeDrawer() {
		isDrawerNavigationOpen = false;
	}

	function openDrawer() {
		isDrawerNavigationOpen = true;
	}

	// This stops scrolling when navigation drawer is open!
	let scrollTop: number | null = null;
	let scrollLeft: number | null = null;

	function disableScroll() {
		if (browser) {
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

			window.onscroll = function () {
				window.scrollTo(scrollLeft!, scrollTop!);
			};
		}
	}

	function enableScroll() {
		if (browser) {
			window.onscroll = null;
		}
	}

	// BUG: If you open the drawer and then resize the window, it will not close
	$: if (isDrawerNavigationOpen) {
		disableScroll();
	} else {
		enableScroll();
	}

	// This is for handling for the category menu

	// Close menu when clicking outside
	function handleClickOutside(event: MouseEvent) {
		if (isCategoryMenuOpen && menuButton && !menuButton.contains(event.target as Node)) {
			isCategoryMenuOpen = false;
		}
	}

	// Close menu after navigation
	function handleMenuItemClick() {
		isCategoryMenuOpen = false;
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<!-- Desktop Navbar -->
<div class="relative flex w-full flex-row items-center justify-between p-4 md:px-12">
	<!-- Left side -->
	<div class="flex flex-row items-center gap-12">
		<!-- Logo + Brand Name -->
		<a href="/" class="flex cursor-pointer items-center justify-center gap-3 select-none">
			<img src="/Logo.svg" alt="GatorMarket Logo" class="aspect-square h-8 lg:h-10" />
			<span class="text-brand-black text-xl font-black lg:text-2xl">GatorMarket</span>
		</a>
		<!-- Options -->
		<div class="text-brand-black hidden flex-row items-center gap-6 text-lg lg:flex">
			<a class="underline-offset-4 hover:underline" href="/browse?sort=latest">Newest Listings</a>
			<div class="relative">
				<button
					bind:this={menuButton}
					class="flex flex-row items-center justify-center underline-offset-4 hover:cursor-pointer hover:underline"
					on:click={(e) => {
						e.stopPropagation();
						isCategoryMenuOpen = !isCategoryMenuOpen;
					}}
				>
					<p>Categories</p>
					<TablerChevronDown
						class={`text-brand-black ml-1 h-4 w-4 transition-transform duration-200 ${isCategoryMenuOpen ? 'rotate-180' : ''}`}
					/>
				</button>
				{#if isCategoryMenuOpen}
					<div
						class="bg-brand-white absolute left-0 z-10 mt-1 w-48 origin-top-left scale-100 transform rounded-md opacity-100 shadow-md transition-all duration-200 ease-in-out"
					>
						<div class="overflow-hidden rounded-md shadow-xs">
							{#each menuItems as item, index (item.label)}
								<a
									href={item.href}
									class="text-brand-black hover:bg-brand-orange hover:text-brand-white text-md block px-4 py-2"
									style={index !== 0 ? 'border-top: 1px solid #f0f0f0' : ''}
									on:click={handleMenuItemClick}
								>
									{item.label}
								</a>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
	<!-- Right side -->

	<div class="hidden flex-row items-center justify-center lg:flex">
		{#if sessionData}
			<div class="text-brand-white flex flex-row items-center justify-center gap-6 text-lg">
				<Button.Root href="/account/saved">
					<MingcuteBookmarkLine class="text-brand-black h-6 w-6 cursor-pointer" />
				</Button.Root>

				<Button.Root href="/account/messages">
					<MingcuteMessage1Line class="text-brand-black h-6 w-6 cursor-pointer" />
				</Button.Root>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Avatar.Root class="group relative h-10 w-10 cursor-pointer select-none">
							<Avatar.Image
								class="relative z-10 aspect-square h-full w-full rounded-full object-cover"
								src={sessionData.user.image ??
									'https://i.pinimg.com/474x/25/1c/e1/251ce139d8c07cbcc9daeca832851719.jpg'}
								alt="User Avatar"
							/>
							<Avatar.Fallback
								class="relative z-10 flex aspect-square h-full w-full items-center justify-center rounded-full bg-zinc-200"
							>
								UF
							</Avatar.Fallback>

							<!-- Background Circle Scale on Hover -->
							<div
								class="absolute top-1/2 left-1/2 z-0 h-full w-full -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-zinc-300 transition-transform duration-150 ease-in-out group-hover:scale-115"
							></div>
						</Avatar.Root>
					</DropdownMenu.Trigger>

					<!-- Dropdown Content -->
					<DropdownMenu.Portal>
						<DropdownMenu.Content
							sideOffset={10}
							class="bg-brand-white rounded-md border-[1px] border-[#EBEBEB] px-4 py-4"
						>
							<!-- Avatar + View Profile -->
							<DropdownMenu.Item>
								<Button.Root
									href="/account"
									class="flex cursor-pointer flex-row items-center justify-center gap-2 rounded-md py-1.5 pr-18 hover:bg-zinc-100"
								>
									<Avatar.Root class="h-14 w-14 cursor-pointer select-none">
										<Avatar.Image
											class="aspect-square h-full w-full rounded-full object-cover"
											src={sessionData.user.image ??
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
										<p class="text-brand-black text-lg font-bold">{sessionData.user.name}</p>
										<div class="text-brand-gray flex flex-row items-center text-sm">
											<p>View Profile</p>
											<TablerChevronRight class="text-brand-gray aspect-square h-5" />
										</div>
									</div>
								</Button.Root>
							</DropdownMenu.Item>

							<DropdownMenu.Separator class="mt-2 mb-3 w-full border-[1px] border-[#C4C4C4]" />

							<DropdownMenu.Group aria-label="Account Options">
								<div class="flex flex-col gap-3.5">
									<!-- My Listings -->
									<DropdownMenu.Item>
										<Button.Root
											href="/account/my-listings"
											class="flex cursor-pointer flex-row items-center gap-2"
										>
											<MingcuteBox2Line class="text-brand-black aspect-square h-5" />
											<p class="text-brand-black text-lg">My Listings</p>
										</Button.Root>
									</DropdownMenu.Item>

									<!-- Saved Items -->
									<DropdownMenu.Item>
										<Button.Root
											href="/account/saved"
											class="flex cursor-pointer flex-row items-center gap-2"
										>
											<MingcuteBookmarkLine class="text-brand-black aspect-square h-5" />
											<p class="text-brand-black text-lg">Saved Items</p>
										</Button.Root>
									</DropdownMenu.Item>

									<!-- Messages -->
									<DropdownMenu.Item>
										<Button.Root
											href="/account/messages"
											class="flex cursor-pointer flex-row items-center gap-2"
										>
											<MingcuteMessage1Line class="text-brand-black aspect-square h-5" />
											<p class="text-brand-black text-lg">Messages</p>
										</Button.Root>
									</DropdownMenu.Item>

									<!-- Settings -->
									<DropdownMenu.Item>
										<Button.Root
											href="/account"
											class="flex cursor-pointer flex-row items-center gap-2"
										>
											<MingcuteSettings1Line class="text-brand-black aspect-square h-5" />
											<p class="text-brand-black text-lg">Settings</p>
										</Button.Root>
									</DropdownMenu.Item>

									<!-- Log Out -->
									<DropdownMenu.Item>
										<Button.Root
											onclick={handleLogout}
											class="flex cursor-pointer flex-row items-center gap-2"
										>
											<MingcuteExitLine class="aspect-square h-5 text-red-500" />
											<p class="text-lg text-red-500">Log out</p>
										</Button.Root>
									</DropdownMenu.Item>
								</div>
							</DropdownMenu.Group>
							<DropdownMenu.Separator class="my-3 w-full border-[1px] border-[#C4C4C4]" />
							<DropdownMenu.Group aria-label="Help Menu">
								<div class="flex flex-col gap-3.5">
									<!-- My Listings -->
									<DropdownMenu.Item>
										<Button.Root
											href="/support"
											class="flex cursor-pointer flex-row items-center gap-2"
										>
											<MingcuteQuestionLine class="text-brand-black aspect-square h-5" />
											<p class="text-brand-black text-lg">Support</p>
										</Button.Root>
									</DropdownMenu.Item>

									<!-- Saved Items -->
									<DropdownMenu.Item>
										<Button.Root
											href="/safety"
											class="flex cursor-pointer flex-row items-center gap-2"
										>
											<MingcuteSafeShield2Fill class="text-brand-black aspect-square h-5" />
											<p class="text-brand-black text-lg">Safety Tips</p>
										</Button.Root>
									</DropdownMenu.Item>
								</div>
							</DropdownMenu.Group>
						</DropdownMenu.Content>
					</DropdownMenu.Portal>
				</DropdownMenu.Root>
			</div>
		{:else}
			<div class="text-brand-black flex flex-row items-center justify-center gap-6 text-lg">
				<a class="underline-offset-4 hover:underline" href="/signup">Sign up</a>
				<a class="underline-offset-4 hover:underline" href="/login">Log in</a>
			</div>
		{/if}
		<div class="mx-6 h-6 border-l border-gray-300"></div>
		<Button.Root
			href="/account/new-listing"
			class="text-brand-white bg-brand-blue cursor-pointer rounded-md px-10 py-1 text-lg font-bold hover:bg-blue-700"
		>
			Sell
		</Button.Root>
	</div>

	<!-- Right Side Mobile -->
	<div class="flex flex-row items-center justify-center lg:hidden">
		<Button.Root onclick={openDrawer}>
			<MingcuteMenuFill class="text-brand-black h-6 w-6 cursor-pointer lg:hidden" />
		</Button.Root>
	</div>

	{#if isDrawerNavigationOpen}
		<Button.Root onclick={closeDrawer} class="absolute top-4 left-4 z-50 lg:hidden">
			<MakiCross class="text-brand-white h-6 w-6 cursor-pointer" />
		</Button.Root>
	{/if}

	<!-- Mobile Drawer -->
	{#if isDrawerNavigationOpen}
		<button
			aria-label="Close drawer"
			class="bg-opacity-50 fixed inset-0 z-30 bg-black opacity-40 lg:hidden"
			on:click={closeDrawer}
			transition:fade={{ duration: 300, easing: cubicOut }}
		></button>
	{/if}

	<div
		class="fixed top-0 right-0 z-40 h-full max-w-md transform overflow-y-scroll bg-white shadow-lg transition-transform duration-200 ease-in-out lg:hidden {isDrawerNavigationOpen
			? 'translate-x-0'
			: 'translate-x-full'}"
	>
		<div class="flex flex-col gap-4 p-5">
			{#if sessionData}
				<Button.Root
					href="/account"
					onclick={closeDrawer}
					class="flex cursor-pointer flex-row items-center justify-center gap-2 rounded-md"
				>
					<Avatar.Root class="h-14 w-14 cursor-pointer select-none">
						<Avatar.Image
							class="aspect-square h-full w-full rounded-full object-cover"
							src={sessionData.user.image ??
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
						<p class="text-brand-black text-lg font-bold">{sessionData.user.name}</p>
						<div class="text-brand-gray flex flex-row items-center text-sm">
							<p>View Profile</p>
							<TablerChevronRight class="text-brand-gray aspect-square h-5" />
						</div>
					</div>
				</Button.Root>
			{/if}

			<Button.Root
				onclick={closeDrawer}
				href="/account/new-listing"
				class="bg-brand-blue text-brand-white text-md rounded-md px-20 py-2.5 font-bold hover:bg-blue-700"
			>
				List an Item
			</Button.Root>

			<div class="flex flex-col gap-3.5">
				<Button.Root
					onclick={closeDrawer}
					href="/categories"
					class="flex cursor-pointer flex-row items-center gap-2"
				>
					<MingcuteGrid2Line class="text-brand-black aspect-square h-6 align-middle" />
					<p class="text-brand-black text-lg">Browse Categories</p>
				</Button.Root>
				<Button.Root
					onclick={closeDrawer}
					href="/search"
					class="flex cursor-pointer flex-row items-center gap-2"
				>
					<MingcuteSearch2Line class="text-brand-black aspect-square h-6 align-middle" />
					<p class="text-brand-black text-lg">Search</p>
				</Button.Root>

				{#if !sessionData}
					<Button.Root
						onclick={closeDrawer}
						href="/signup"
						class="flex cursor-pointer flex-row items-center gap-2"
					>
						<MingcuteUser1Line class="text-brand-black aspect-square h-6 align-middle" />
						<p class="text-brand-black text-lg">Sign up</p>
					</Button.Root>

					<Button.Root
						onclick={closeDrawer}
						href="/login"
						class="flex cursor-pointer flex-row items-center gap-2"
					>
						<MingcuteEnterDoorLine class="text-brand-black aspect-square h-6 align-middle" />
						<p class="text-brand-black text-lg">Log in</p>
					</Button.Root>
				{/if}
			</div>

			{#if sessionData}
				<div class="flex flex-col gap-2">
					<MenuDivider title="Account" />

					<div class="flex flex-col gap-3.5">
						<Button.Root
							onclick={closeDrawer}
							href="/account/my-listings"
							class="flex cursor-pointer flex-row items-center gap-2"
						>
							<MingcuteBox2Line class="text-brand-black aspect-square h-6 align-middle" />
							<p class="text-brand-black text-lg">My Listings</p>
						</Button.Root>

						<Button.Root
							onclick={closeDrawer}
							href="/account/saved"
							class="flex cursor-pointer flex-row items-center gap-2"
						>
							<MingcuteBookmarkLine class="text-brand-black aspect-square h-6 align-middle" />
							<p class="text-brand-black text-lg">Saved Items</p>
						</Button.Root>

						<Button.Root
							onclick={closeDrawer}
							href="/account/messages"
							class="flex cursor-pointer flex-row items-center gap-2"
						>
							<MingcuteMessage1Line class="text-brand-black aspect-square h-6 align-middle" />
							<p class="text-brand-black text-lg">Messages</p>
						</Button.Root>

						<Button.Root
							onclick={closeDrawer}
							href="/account"
							class="flex cursor-pointer flex-row items-center gap-2"
						>
							<MingcuteSettings1Line class="text-brand-black aspect-square h-6 align-middle" />
							<p class="text-brand-black text-lg">Settings</p>
						</Button.Root>

						<Button.Root
							onclick={() => {
								handleLogout();
								closeDrawer();
							}}
							class="flex cursor-pointer flex-row items-center gap-2"
						>
							<MingcuteExitLine class="aspect-square h-6 align-middle text-red-500" />
							<p class="text-lg text-red-500">Log out</p>
						</Button.Root>
					</div>
				</div>
			{/if}

			<MenuDivider title="Help" />

			<div class="flex flex-col gap-3.5">
				<Button.Root
					onclick={closeDrawer}
					href="/support"
					class="flex cursor-pointer flex-row items-center gap-2"
				>
					<MingcuteQuestionLine class="text-brand-black aspect-square h-6 align-middle" />
					<p class="text-brand-black text-lg">Support</p>
				</Button.Root>

				<Button.Root
					onclick={closeDrawer}
					href="/safety"
					class="flex cursor-pointer flex-row items-center gap-2"
				>
					<MingcuteSafeShield2Fill class="text-brand-black aspect-square h-6 align-middle" />
					<p class="text-brand-black text-lg">Safety Tips</p>
				</Button.Root>
			</div>
		</div>

		<div
			class="text-brand-gray absolute bottom-0 left-0 flex w-full flex-row items-center justify-between p-4 text-sm underline underline-offset-4"
		>
			<Button.Root onclick={closeDrawer} href="/terms">Terms of Service</Button.Root>
			<Button.Root onclick={closeDrawer} href="/privacy">Privacy Policy</Button.Root>
		</div>
	</div>
</div>
