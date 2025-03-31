<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { redirect } from '@sveltejs/kit';
	import Button from '../../../components/Button.svelte';
	import { goto } from '$app/navigation';

	const session = authClient.useSession();

    const onLogOut = async () => {
        await authClient.signOut();
        goto('/');
    };
</script>

<div class="h-[100vh] w-full flex flex-col justify-center items-center">
    <h1>Account Page</h1>
    <p>Welcome, {$session.data?.user.email}!</p>
    <Button text="Log Out" onClick={onLogOut} />
</div>
