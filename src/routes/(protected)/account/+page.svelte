<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { goto } from '$app/navigation';

	export let data;
	const onLogOut = async () => {
		await authClient.signOut();
		goto('/');
	};

	let newPfp: string;
	let name = data.user?.name;
	let bio = '';

	const saveProfile = () => {
		console.log(name, bio, newPfp);
	};

	const onImageSelect = (e: Event) => {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.readAsDataURL(file);

			reader.onload = (e: ProgressEvent<FileReader>) => {
				if (e.target?.result) {
					newPfp = e.target.result as string;
				}
			};
		}
	};
</script>

<div class="flex items-center justify-center py-16 md:py-32">
	<div class="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
		<h2 class="mb-6 text-center text-2xl font-semibold">Edit Profile</h2>

		<!-- Profile Picture Upload -->
		<div class="mb-4 flex justify-center">
			{#if newPfp}
				<img
					src={newPfp}
					alt="Profile Preview New"
					class="profile-pic-preview h-24 w-24 rounded-full"
				/>
			{:else if data.user?.image}
				<img
					src={data.user.image}
					alt="Profile Preview OLD"
					class="profile-pic-preview rounded-full"
				/>
			{:else}
				<img
					src="/images/default-profile-pic.png"
					alt="Profile Preview NONE"
					class="profile-pic-preview rounded-full"
				/>
			{/if}
		</div>

		<!-- File input to change profile picture -->
		<input
			type="file"
			accept="image/*"
			class="mb-4 block w-full text-sm text-gray-500"
			on:change={onImageSelect}
		/>

		<!-- Name Field -->
		<div class="mb-4">
			<label for="name" class="block text-sm font-medium text-gray-700">Name</label>
			<input
				id="name"
				type="text"
				placeholder="Enter your name"
				bind:value={name}
				class="mt-1 w-full rounded-md border border-gray-300 p-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
			/>
		</div>

		<!-- Bio Field -->
		<div class="mb-6">
			<label for="bio" class="block text-sm font-medium text-gray-700">Bio</label>
			<textarea
				id="bio"
				placeholder="Write something about yourself"
				bind:value={bio}
				rows="4"
				class="mt-1 w-full rounded-md border border-gray-300 p-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
			></textarea>
		</div>

		<!-- Save Button -->
		<button
			on:click={saveProfile}
			class="bg-brand-orange hover:bg-brand-light-orange focus:bg-brand-light-orange w-full cursor-pointer rounded-md py-2 font-semibold text-white focus:ring-2 focus:outline-none"
		>
			Save Profile
		</button>

		<!-- Log Out Button -->
		<button
			on:click={onLogOut}
			class="mt-4 w-full cursor-pointer rounded-md bg-red-500 py-2 font-semibold text-white hover:bg-red-600 focus:bg-red-600 focus:ring-2 focus:outline-none"
		>
			Log Out
		</button>
	</div>
</div>
