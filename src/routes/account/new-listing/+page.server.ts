import { auth } from '$lib/auth';
import { error, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { categories } from '$lib/types/category';
import type { Condition } from '@prisma/client';
import { put } from '@vercel/blob';
import { prisma } from '$lib/server/prisma';
import sharp from 'sharp';

// This is needed so the server hooks can run for authenticated routes
export const load: PageServerLoad = async () => {
	return {};
};

export const actions = {
	createListing: async ({ request }) => {
		// Check if user is authenticated
		const session = await auth.api.getSession({
			headers: request.headers
		});

		if (!session || !session.user) {
			throw error(401);
		}

		const form = await request.formData();
		const photos = form.getAll('photos') as File[];
		const title = form.get('title') as string;
		const description = form.get('description') as string;
		const category = categories[form.get('category') as string];
		const price = form.get('price') as unknown as number;
		const condition = form.get('condition') as Condition;

		const urls: string[] = [];

		// Upload photos to vercel blob
		for (const photo of photos) {
			if (!photo || !photo.type.startsWith('image/')) {
				throw error(400);
			}

			const buffer = await photo.arrayBuffer();

			const processedBuffer = await sharp(Buffer.from(buffer))
				.resize(500, 500, { fit: 'cover' })
				.jpeg({ quality: 80 })
				.toBuffer();

			const { url } = await put(photo.name, processedBuffer, { access: 'public' });
			urls.push(url);
		}

		const listing = await prisma.listing.create({
			data: {
				title,
				description,
				category,
				price: Number(price),
				condition,
				images: urls,
				coverImage: urls[0],
				userId: session.user.id,
				status: 'ACTIVE'
			}
		});

		if (!listing) {
			throw error(500);
		}

		return {
			success: true,
			listingId: listing.id
		};
	}
} satisfies Actions;
