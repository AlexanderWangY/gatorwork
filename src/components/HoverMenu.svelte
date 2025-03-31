<!-- HoverMenu.svelte -->
<script lang="ts">
	interface MenuItem {
		label: string;
		href: string;
	}

	export let menuTitle: string;
	export let menuItems: MenuItem[] = [];
</script>

<div class="group relative inline-block text-left">
	<!-- Main link that triggers the dropdown -->
	<p class="inline-flex items-center gap-1 hover:cursor-pointer hover:underline">
		{menuTitle}
		<svg
			class="text-brand-black h-4 transform transition-transform duration-200 ease-in-out group-hover:rotate-180"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			><!-- Icon from Tabler Icons by Paweł Kuna - https://github.com/tabler/tabler-icons/blob/master/LICENSE --><path
				fill="none"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="m6 9l6 6l6-6"
			/></svg
		>
	</p>

	<!-- Dropdown menu -->
	<div
		class="bg-brand-white invisible absolute left-0 z-10 mt-0 w-48 origin-top-left scale-95 transform rounded-md opacity-0 shadow-md transition-all duration-200 ease-in-out group-hover:visible group-hover:scale-100 group-hover:opacity-100"
	>
		<div class="bg-brand-white overflow-hidden rounded-md shadow-xs">
			{#each menuItems as item, index (item.label)}
				<a
					href={item.href}
					class="text-brand-black hover:bg-brand-orange hover:text-brand-white block px-4 py-2 text-sm"
					style={index !== 0 ? 'border-top: 1px solid #f0f0f0' : ''}
				>
					{item.label}
				</a>
			{/each}
		</div>
	</div>
</div>
