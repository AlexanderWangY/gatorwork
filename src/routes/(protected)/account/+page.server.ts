import { auth } from '$lib/auth';
import { prisma } from '$lib/server/prisma';
import { error, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// This is needed so the server hooks can run for authenticated routes
export const load: PageServerLoad = async ({ request }) => {
	const session = await auth.api.getSession({
		headers: request.headers
	});

	if (!session) {
		throw error(401);
	}

	return {
		user: await prisma.user.findUnique({
			where: { id: session.user.id },
			select: { name: true, email: true, image: true }
		})
	};
};

export const actions = {} satisfies Actions;
