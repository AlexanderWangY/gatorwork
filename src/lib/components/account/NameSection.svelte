<script lang="ts">
	import EditModal from './EditModal.svelte';
	import TablerPencil from '~icons/tabler/pencil';
	export let name: string;
	export let isEditNameModalOpen: boolean;
</script>

<div class="flex flex-col space-y-0.5">
	<p class="text-brand-gray font-normal">Name</p>
	<div class="flex flex-row items-center gap-5">
		<p class="text-brand-black text-2xl font-medium md:text-3xl">{name}</p>
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
