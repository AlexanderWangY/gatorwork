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

export const categoryToReadable: Record<Category, string> = {
	[Category.APPLIANCES]: 'Appliances',
	[Category.CARS]: 'Cars',
	[Category.MOPEDS]: 'Mopeds',
	[Category.MOTORCYCLES]: 'Motorcycles',
	[Category.BICYCLES]: 'Bicycles',
	[Category.ELECTRONICS]: 'Electronics',
	[Category.FURNITURE]: 'Furniture',
	[Category.TEXTBOOKS]: 'Textbooks',
	[Category.CLOTHING]: 'Clothing',
	[Category.SPORTS_EQUIPMENT]: 'Sports Equipment',
	[Category.GAMES]: 'Games',
	[Category.COMPUTERS]: 'Computers',
	[Category.HOME_DECOR]: 'Home Decor',
	[Category.KITCHENWARE]: 'Kitchenware',
	[Category.SCHOOL_SUPPLIES]: 'School Supplies',
	[Category.ART_SUPPLIES]: 'Art Supplies',
	[Category.MUSIC_INSTRUMENTS]: 'Music Instruments',
	[Category.TOOLS]: 'Tools'
};

export const categoryNames: string[] = Object.keys(categories);
