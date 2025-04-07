import { auth } from '$lib/auth';
import { error, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ request, params }) => {
	const session = await auth.api.getSession({
		headers: request.headers
	});

	if (!session) {
		throw error(401);
	}

	const { listingId } = params;

	return {
		listing: await prisma.listing.findUnique({
			where: {
				id: listingId,
				userId: session.user.id
			},
			select: {
				id: true,
				title: true
			}
		})
	};
};

export const actions = {
	deleteListing: async ({ request, params }) => {
		const session = await auth.api.getSession({
			headers: request.headers
		});

		if (!session) {
			throw error(401);
		}

		const { listingId } = params;

		// Delete the listing
		await prisma.listing.delete({
			where: {
				id: listingId,
				userId: session.user.id
			}
		});

		return {
			success: true,
			message: 'Listing deleted successfully'
		};
	}
} satisfies Actions;
