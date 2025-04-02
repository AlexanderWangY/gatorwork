import type { PageServerLoad } from './$types';

// This is needed so the server hooks can run for authenticated routes
export const load: PageServerLoad = async () => {
	return {};
};
