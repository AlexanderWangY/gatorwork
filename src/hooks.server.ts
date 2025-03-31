import { auth } from '$lib/auth';
import { redirect } from '@sveltejs/kit';
import { svelteKitHandler } from 'better-auth/svelte-kit';

const protectedRoutes: string[] = ['/account', '/create'];

export async function handle({ event, resolve }) {
	// const { data: session } = await authClient.getSession();

	// if (!session && event.url.pathname === '/account') {
	//     console.log('redirecting to login');

	// 	return new Response(null, {
	// 		status: 403,
	// 		headers: {
	// 			location: '/login'
	// 		}
	// 	});
	// }

	// const headers = event.request.headers;

	const isProtectedRoute = protectedRoutes.some((route) => event.url.pathname.startsWith(route));

	const session = await auth.api.getSession({
		headers: headers
	});

	if (!session && isProtectedRoute) {
		throw redirect(303, '/login');
	}

	if ((session && event.url.pathname === '/login') || event.url.pathname === '/signup') {
		throw redirect(303, '/account');
	}

	return svelteKitHandler({ event, resolve, auth });
}
