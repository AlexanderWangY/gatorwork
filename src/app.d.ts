import 'unplugin-icons/types/svelte';

declare global {
	namespace App {
		interface Error {
			message: string;
			status: number;
			errorId: string;
			action: string;
			reference: string;
		}
	}
}
