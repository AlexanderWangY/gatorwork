import { auth } from '$lib/auth';
import { error } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request }) => {
	const session = await auth.api.getSession({
		headers: request.headers
	});

	if (!session) {
		throw error(401);
	}

	return {
		listings: await prisma.listing.findMany({
			where: {
				userId: session.user.id
			},
			select: {
				coverImage: true,
				id: true,
				title: true,
				price: true,
				createdAt: true,
				status: true
			},
			orderBy: {
				createdAt: 'desc'
			}
		})
	};
};
