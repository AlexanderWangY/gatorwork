import { auth } from '$lib/auth';
import { error } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request, params }) => {
	const session = await auth.api.getSession({
		headers: request.headers
	});

	if (!session) {
		throw error(401);
	}

	const { listingId } = params;

	return {
		user: await prisma.user.findUnique({
			where: { id: session.user.id },
			select: { name: true, email: true, image: true, id: true }
		}),
		listing: await prisma.listing.findUnique({
			where: {
				id: listingId
			},
			include: {
				user: {
					select: { name: true, email: true, image: true, id: true }
				}
			}
		})
	};
};
