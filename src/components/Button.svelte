<script lang="ts">
	import Spinner from './Spinner.svelte';

	// Define props with default values
	export let text: string = 'Click me'; // Default text
	export let variant: 'primary' | 'secondary' | 'tertiary' | 'disabled' = 'primary'; // Button variant
	export let size: 'small' | 'medium' | 'large' = 'medium'; // Button size
	export let isDisabled: boolean = false; // Disabled state
	export let isLoading: boolean = false; // Loading state
	export let customClass: string = ''; // Additional custom classes
	export let onClick: () => void = () => {}; // Click handler
	export let type: "button" | "reset" | "submit" = 'button'; // Button type
	export let fullWidth: boolean = false; // Full width button	

	// Dynamic classes for styling
	const baseClasses = 'font-bold rounded-md py-1.5 px-8 transition-all';
	const variantClasses = {
		primary: 'bg-brand-orange text-brand-white hover:bg-orange-300 hover:cursor-pointer',
		secondary: 'bg-gray-300 text-gray-700 hover:bg-gray-400 hover:cursor-pointer',
		tertiary: 'bg-transparent text-brand-orange hover:bg-orange-100 hover:cursor-pointer',
		disabled: 'bg-gray-300 text-gray-400 hover:cursor-not-allowed'
	};
	const sizeClasses = {
		small: 'py-1 px-4 text-sm',
		medium: 'py-1.5 px-6',
		large: 'py-2 px-8 text-lg'
	};

	// Compute final button classes
	const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${customClass} ${fullWidth ? "w-full" : "w-auto"} flex justify-center items-center`;
	const spinnerSize = size === 'small' ? '1rem' : size === 'medium' ? '1.5rem' : '2rem';
</script>

<button type={type} class={buttonClasses} disabled={isDisabled} on:click={isDisabled || isLoading ? undefined : onClick}>
	{#if isLoading}
		<Spinner color="#FFD08E" size={spinnerSize} />
	{:else}
		{text}
	{/if}
</button>
