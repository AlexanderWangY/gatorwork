<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import Navbar from '../../components/Navbar.svelte';

	export async function load() {
		const session = authClient.useSession();

		if (!session) {
			return {
				status: 403,
				redirect: '/login'
			};
		}

		return {
			props: {
				session
			}
		};
	}
</script>

<Navbar />
<slot />
