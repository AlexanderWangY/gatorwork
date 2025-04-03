<script lang="ts">
	import { Dialog, Label } from 'bits-ui';

	// Props
	export let isOpen = false;
	export let isLoading = false;

	export let title: string;
	export let description: string;
	export let action: string;
	export let inputName: string;
	export let label: string;
</script>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Trigger><slot /></Dialog.Trigger>
	<Dialog.Portal>
		<Dialog.Overlay class="fixed inset-0 bg-black/50" />
		<Dialog.Content
			class="fixed top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg"
		>
			<Dialog.Title class="text-center text-lg font-semibold">{title}</Dialog.Title>
			<p class="mt-2 text-sm text-gray-600">{description}</p>

			<form class="mt-4" method="POST" {action}>
				<div>
					<Label.Root for={inputName} class="block text-sm font-medium">{label}</Label.Root>
					<input
						maxlength={30}
						id={inputName}
						name={inputName}
						class="mt-1 w-full rounded border p-2 text-sm"
						required
					/>
				</div>

				<div class="mt-4 flex justify-end gap-2">
					<Dialog.Close
						type="button"
						class="cursor-pointer rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
					>
						Cancel
					</Dialog.Close>
					<button
						type="submit"
						disabled={isLoading}
						class="bg-brand-blue cursor-pointer rounded px-4 py-2 text-white hover:bg-blue-700 disabled:bg-blue-400"
					>
						{isLoading ? 'Saving...' : 'Save'}
					</button>
				</div>
			</form>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
