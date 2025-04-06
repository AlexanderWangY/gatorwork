<script lang="ts">
	export let color: string = '#FFD08E'; // Default spinner color
	export let size: string = '1.5rem'; // Default size

	// Inline style for dynamic sizing and coloring
	const spinnerStyle = {
		width: size,
		height: size,
		borderColor: color
	};
</script>

<div
	class="animate-spin rounded-full border-4 border-t-4 border-solid"
	style="width: {spinnerStyle.width}; height: {spinnerStyle.height}; border-color: {spinnerStyle.borderColor} white white white;"
></div>
