<script lang="ts">
	import { page } from '$app/state';
	import { authClient } from '$lib/auth-client';
	import Button from '../../../components/CustomButton.svelte';

	let email = '';
	let password = '';
	let errorMessage = '';

	let isLoading = false;

	const handleSubmit = async () => {
		isLoading = true;

		await authClient.signIn.email(
			{
				email,
				password,
				callbackURL: page.url.searchParams.get('redirect') || '/account'
			},
			{
				onError: (ctx) => {
					errorMessage = ctx.error.message;
				}
			}
		);

		isLoading = false;
	};
</script>

<div class="flex min-h-screen items-center justify-center">
	<div class="w-full max-w-md rounded-lg p-8 shadow-sm">
		<h2 class="mb-6 text-center text-2xl font-semibold">Log In</h2>
		<form on:submit|preventDefault={handleSubmit}>
			<div class="mb-4">
				<label for="email" class="text-brand-black block text-sm font-medium">Email</label>
				<input
					id="email"
					type="email"
					bind:value={email}
					placeholder="Enter your email"
					class="focus:ring-brand-blue mt-2 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
					required
				/>
			</div>

			<div class="mb-4">
				<label for="password" class="text-brand-black block text-sm font-medium">Password</label>
				<input
					id="password"
					type="password"
					bind:value={password}
					placeholder="Enter your password"
					class="focus:ring-brand-blue mt-2 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
					required
				/>
			</div>

			{#if errorMessage}
				<p class="mb-4 text-sm text-red-500">{errorMessage}</p>
			{/if}

			<Button text="Log In" variant="primary" type="submit" {isLoading} fullWidth />
		</form>

		<p class="mt-4 text-center text-sm">
			Don't have an account? <a href="/signup" class="hover:text-brand-blue text-blue-500"
				>Sign Up</a
			>
		</p>
	</div>
</div>
