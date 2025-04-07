<!-- TruncateText.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';

	// Props
	export let text = '';

	// Element references
	let textElement: HTMLDivElement | null = null;

	// State
	let isTruncated = false;
	let isShowingMore = false;

	// Check if text is truncated after the component mounts
	onMount(() => {
		checkTruncation();
	});

	// Function to check if the text is truncated
	function checkTruncation() {
		if (textElement) {
			const { offsetHeight, scrollHeight } = textElement;
			isTruncated = offsetHeight < scrollHeight;
		}
	}

	// Toggle showing more/less text
	function toggleShowMore() {
		isShowingMore = !isShowingMore;
	}
</script>

<div>
	{#if isShowingMore}
		<div bind:this={textElement} class="text-brand-gray font-sans break-words whitespace-pre-wrap">
			{text}
		</div>
	{:else}
		<div
			bind:this={textElement}
			class="text-brand-gray line-clamp-10 overflow-hidden font-sans break-words whitespace-pre-wrap"
		>
			{text}
		</div>
	{/if}

	{#if isTruncated}
		<button
			on:click={toggleShowMore}
			class="text-brand-blue mt-1 cursor-pointer font-normal hover:text-blue-800"
		>
			{isShowingMore ? 'Read less' : 'Read more'}
		</button>
	{/if}
</div>
