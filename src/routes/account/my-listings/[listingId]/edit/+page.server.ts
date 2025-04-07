import { auth } from '$lib/auth';
import { error, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import type { Category, Condition, ListingStatus } from '@prisma/client';
import { categories } from '$lib/types/category';

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
				title: true,
				description: true,
				coverImage: true,
				price: true,
				status: true,
				images: true,
				category: true,
				condition: true
			}
		})
	};
};

export const actions = {
	updateListing: async ({ request, params }) => {
		const session = await auth.api.getSession({
			headers: request.headers
		});

		if (!session) {
			throw error(401);
		}

		const formData = await request.formData();

		const { listingId } = params;
		const title = formData.get('title') as string;
		const description = formData.get('description') as string;
		const price = parseFloat(formData.get('price') as string);
		const category = categories[formData.get('category') as string] as Category;
		const condition = formData.get('condition') as Condition;
		const status = formData.get('status') as ListingStatus;

		if (!title || !description || !price || !category || !condition || !status) {
			error(400);
		}

		if (!listingId) {
			error(401);
		}

		const updatedListing = await prisma.listing.update({
			where: {
				id: listingId,
				userId: session.user.id
			},
			data: {
				title,
				description,
				price,
				category,
				condition,
				status
			}
		});

		return {
			success: true,
			listingId: updatedListing.id
		};
	}
} satisfies Actions;
