import { Condition } from '@prisma/client';

export const conditionToReadable: Record<Condition, string> = {
	[Condition.NEW]: 'New',
	[Condition.LIKE_NEW]: 'Like New',
	[Condition.GOOD]: 'Good',
	[Condition.FAIR]: 'Fair',
	[Condition.POOR]: 'Poor'
};

export const readableToCondition: Record<string, Condition> = {
	New: Condition.NEW,
	'Like New': Condition.LIKE_NEW,
	Good: Condition.GOOD,
	Fair: Condition.FAIR,
	Poor: Condition.POOR
};
