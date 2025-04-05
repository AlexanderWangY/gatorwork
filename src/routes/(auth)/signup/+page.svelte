<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import Button from '../../../lib/components/CustomButton.svelte';

	let email = '';
	let password = '';
	let confirmPassword = '';
	let errorMessage = '';

	let sentVerificationEmail = false;

	let isLoading = false;

	const handleSubmit = async () => {
		errorMessage = '';

		if (password !== confirmPassword) {
			errorMessage = 'Passwords do not match';
			return;
		}

		if (!email.endsWith('@ufl.edu')) {
			errorMessage = 'Please use your UF email';
			return;
		}

		isLoading = true;

		await authClient.signUp.email(
			{
				email,
				password,
				name: 'UF Student',
				callbackURL: '/login'
			},
			{
				onError: (ctx) => {
					errorMessage = ctx.error.message;
					isLoading = false;
				},
				onSuccess: async () => {
					sentVerificationEmail = true;
				}
			}
		);
		isLoading = false;
	};
</script>

<div class="flex min-h-screen items-center justify-center">
	<div class="w-full max-w-md rounded-lg p-8 shadow-sm">
		<h2 class="mb-6 text-center text-2xl font-semibold">Sign Up</h2>
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

			<div class="mb-6">
				<label for="confirmPassword" class="text-brand-black block text-sm font-medium"
					>Confirm Password</label
				>
				<input
					id="confirmPassword"
					type="password"
					bind:value={confirmPassword}
					placeholder="Confirm your password"
					class="focus:ring-brand-blue mt-2 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
					required
				/>
			</div>

			{#if errorMessage}
				<p class="mb-4 text-sm text-red-500">{errorMessage}</p>
			{/if}

			{#if sentVerificationEmail}
				<p class="mb-4 text-sm text-green-500">Verification email sent! Please check your inbox.</p>
			{/if}

			<div class="flex w-full">
				<Button text="Sign Up" variant="primary" type="submit" {isLoading} fullWidth />
			</div>
		</form>

		<p class="mt-4 text-center text-sm">
			Already have an account? <a href="/login" class="hover:text-brand-blue text-blue-500"
				>Log in</a
			>
		</p>
	</div>
</div>
