import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

// This is needed so the server hooks can run for authenticated routes
export const load: PageServerLoad = async ({ params }) => {
	const { userId } = params;

	return {
		user: await prisma.user.findUnique({
			where: { id: userId },
			select: { id: true, name: true, email: true, image: true, createdAt: true }
		})
	};
};
