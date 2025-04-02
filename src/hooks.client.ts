import type { HandleClientError } from '@sveltejs/kit';

// src/hooks.client.ts
export const handleError: HandleClientError = async ({ error, event, status }) => {
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
