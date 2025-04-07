import { Category } from '@prisma/client';

// Define the CategoryMapping type with name and categoryId fields
export type CategoryMapping = {
	name: string;
	categoryId: Category;
};

// Example categories with name and categoryId using the Prisma Category enum
export const categories: Record<string, Category> = {
	Appliances: Category.APPLIANCES,
	Cars: Category.CARS,
	Mopeds: Category.MOPEDS,
	Motorcycles: Category.MOTORCYCLES,
	Bicycles: Category.BICYCLES,
	Electronics: Category.ELECTRONICS,
	Furniture: Category.FURNITURE,
	Textbooks: Category.TEXTBOOKS,
	Clothing: Category.CLOTHING,
	'Sports Equipment': Category.SPORTS_EQUIPMENT,
	Games: Category.GAMES,
	Computers: Category.COMPUTERS,
	'Home Decor': Category.HOME_DECOR,
	Kitchenware: Category.KITCHENWARE,
	'School Supplies': Category.SCHOOL_SUPPLIES,
	'Art Supplies': Category.ART_SUPPLIES,
	'Music Instruments': Category.MUSIC_INSTRUMENTS,
	Tools: Category.TOOLS
};

export const categoryNames: string[] = Object.keys(categories);
