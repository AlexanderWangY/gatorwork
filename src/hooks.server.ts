import { auth } from '$lib/auth';
import { protectedRoutes } from '$lib/routeGuard';
import { redirect, type HandleServerError } from '@sveltejs/kit';
import { svelteKitHandler } from 'better-auth/svelte-kit';

export async function handle({ event, resolve }) {
	const headers = event.request.headers;

	const isProtectedRoute = protectedRoutes.some((route) => event.url.pathname.startsWith(route));

	const session = await auth.api.getSession({
		headers: headers
	});

	if (!session && isProtectedRoute) {
		throw redirect(303, `/login?redirect=${event.url.pathname}`);
	}

	if ((session && event.url.pathname === '/login') || event.url.pathname === '/signup') {
		throw redirect(303, '/account');
	}

	return svelteKitHandler({ event, resolve, auth });
}

export const handleError: HandleServerError = async ({ error, event, status }) => {
	const errorId = crypto.randomUUID();

	// Log to Sentry/error tracking (example)
	console.error(`[${errorId}] Client Error:`, { error, status, event });

	return {
		message: 'Something went wrong. Our team has been notified.',
		status,
		errorId,
		action: 'Please try again later or contact support if the issue persists.',
		reference: `Error ID: ${errorId}`
	};
};
