import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';

function getModulePath(moduleName: string) {
	try {
		const moduleUrl = import.meta.resolve(moduleName);
		const modulePath = fileURLToPath(moduleUrl);
		return (
			modulePath.substring(0, modulePath.lastIndexOf('node_modules')).replace(/\/+$/, '') || ''
		);
	} catch (error) {
		console.error(`Module ${moduleName} resolution failed:`, (error as Error).message);
		return '';
	}
}

const prismaNodeModulesPath = `${getModulePath('@prisma/client')}/node_modules`;

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		Icons({
			compiler: 'svelte'
		})
	],
	resolve: {
		alias: {
			'.prisma/client/index-browser': `${prismaNodeModulesPath}/.prisma/client/index-browser.js`
		}
	}
});
