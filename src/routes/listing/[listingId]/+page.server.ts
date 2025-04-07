import { prisma } from '$lib/server/prisma';
import { error, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { auth } from '$lib/auth';

export const load: PageServerLoad = async ({ params }) => {
	const { listingId } = params;

	return {
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

export const actions = {
	markSold: async ({ request, params }) => {
		const session = await auth.api.getSession({
			headers: request.headers
		});

		if (!session) {
			throw error(401);
		}

		const { listingId } = params;

		// Mark the listing as sold
		await prisma.listing.update({
			where: {
				id: listingId,
				userId: session.user.id
			},
			data: {
				status: 'SOLD'
			}
		});

		return {
			success: true,
			message: 'Listing marked as sold successfully'
		};
	},
	markActive: async ({ request, params }) => {
		const session = await auth.api.getSession({
			headers: request.headers
		});

		if (!session) {
			throw error(401);
		}

		const { listingId } = params;

		// Mark the listing as active
		await prisma.listing.update({
			where: {
				id: listingId,
				userId: session.user.id
			},
			data: {
				status: 'ACTIVE'
			}
		});

		return {
			success: true,
			message: 'Listing marked as active successfully'
		};
	},
	markInactive: async ({ request, params }) => {
		const session = await auth.api.getSession({
			headers: request.headers
		});

		if (!session) {
			throw error(401);
		}

		const { listingId } = params;

		// Mark the listing as inactive
		await prisma.listing.update({
			where: {
				id: listingId,
				userId: session.user.id
			},
			data: {
				status: 'INACTIVE'
			}
		});

		return {
			success: true,
			message: 'Listing marked as inactive successfully'
		};
	}
} satisfies Actions;
