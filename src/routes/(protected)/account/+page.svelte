<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import Button from '../../../components/CustomButton.svelte';
	import { goto } from '$app/navigation';

	const session = authClient.useSession();

	const onLogOut = async () => {
		await authClient.signOut();
		goto('/');
	};
</script>

<div class="flex h-[100vh] w-full flex-col items-center justify-center">
	<h1>Account Page</h1>
	<p>Welcome, {$session.data?.user.email}!</p>
	<Button text="Log Out" onClick={onLogOut} />
</div>
