import { authClient } from '$lib/auth-client';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { data: session } = await authClient.getSession();

	console.log('path', event.url.pathname);

	if (event.url.pathname.startsWith('/account') && !session) {
		return new Response(null, {
			status: 403,
			headers: {
				location: '/login'
			}
		});
	}

	return resolve(event);
};
