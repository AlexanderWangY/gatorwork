<script lang="ts">
	import { Button } from 'bits-ui';
	import MingcuteDelete2Line from '~icons/mingcute/delete-2-line';

	export let file: File;
	export let idx: number;

	export let onRemove: (idx: number) => void;
	export let onClick: (idx: number) => void;
	export let isCoverPhoto: boolean = false;
</script>

<div class="relative aspect-square w-full overflow-hidden">
	<Button.Root
		onclick={() => onClick(idx)}
		type="button"
		class="group relative aspect-square w-full cursor-pointer"
	>
		<img
			src={URL.createObjectURL(file)}
			alt="preview"
			class="h-full w-full rounded-md border border-gray-300 object-cover"
		/>

		<div
			class="bg-brand-black absolute top-0 left-0 h-full w-full opacity-0 duration-150 ease-in-out group-hover:opacity-30"
		>
			<!-- Your content goes here -->
		</div>
	</Button.Root>
	<button
		type="button"
		on:click={() => onRemove(idx)}
		class="absolute top-2 right-2 flex cursor-pointer items-center justify-center rounded-full bg-red-500 p-1.5 text-white hover:bg-red-600"
	>
		<MingcuteDelete2Line class="h-5 w-5 md:h-6 md:w-6" />
	</button>

	<!-- Position Cover Photo Text at Bottom -->
	{#if isCoverPhoto}
		<p
			class="bg-brand-blue text-brand-white absolute bottom-0 w-full rounded-b-md py-1 text-center"
		>
			Cover Photo
		</p>
	{/if}
</div>
