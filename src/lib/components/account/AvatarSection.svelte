<script lang="ts">
	import { Avatar } from 'bits-ui';
	import BrandedTooltip from '../BrandedTooltip.svelte';
	import Spinner from '../Spinner.svelte';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let user: { name: string; image: string };
	let fileInput: HTMLInputElement | null = null;
	let formRef: HTMLFormElement | null = null;
	let isUploading = false;

	function openFileSelector() {
		if (fileInput) {
			fileInput.click();
		}
	}

	function onFileSelect() {
		formRef?.requestSubmit();
	}

	const handleEnhance: SubmitFunction = () => {
		// Start loading state
		isUploading = true;

		return async ({ result, update }) => {
			if (result.type === 'success') {
				// Custom update logic if needed
				await update();
			}

			// End loading state regardless of result
			isUploading = false;
		};
	};
</script>

<form
	bind:this={formRef}
	method="POST"
	action="?/updateAvatar"
	enctype="multipart/form-data"
	use:enhance={handleEnhance}
>
	<input
		type="file"
		accept="image/png, image/jpeg"
		name="avatar"
		class="hidden"
		bind:this={fileInput}
		on:change={onFileSelect}
	/>
	<button on:click={openFileSelector}>
		<BrandedTooltip text="Click to change">
			<Avatar.Root
				delayMs={0}
				class="aspect-square h-36 rounded-full bg-zinc-100 text-lg font-medium uppercase hover:cursor-pointer"
			>
				<div
					class="flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-gray-300"
				>
					{#if isUploading}
						<Spinner size="2em" color="black" />
					{:else}
						<Avatar.Image src={user.image} alt={user.name} />
						<Avatar.Fallback class="text-4xl font-bold">
							{user.name ? user.name.substring(0, 2) : 'U'}
						</Avatar.Fallback>
					{/if}
				</div>
			</Avatar.Root>
		</BrandedTooltip>
	</button>
</form>
