import { goto } from '$app/navigation';
import { createAuthClient } from 'better-auth/svelte';

export const authClient = createAuthClient();

export async function appSignOut() {
	await authClient.signOut();
	goto('/');
}
