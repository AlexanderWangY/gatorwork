<script lang="ts">
	export let text: string;
	export let background: string = '#fffbfa';
	export let href: string = '';
	export let onclick: () => void = () => {}; // Default no-op function
	export let color: string = '#333333';

	// Check if it's a link or button (onclick)
	let isLink = href !== '';
	let style = `background-color: ${background};`;
	let textStyles = `color: ${color};`;
</script>

<a class="flex-1" href={isLink ? href : undefined} on:click={!isLink ? onclick : undefined}>
	<div class="w-full px-5 py-3 select-none" {style}>
		<div class="flex items-center justify-between">
			<div class="flex flex-row items-center justify-center gap-3">
				<slot name="left-icon" />
				<p style={textStyles} class="cursor-pointer text-lg font-normal">{text}</p>
			</div>
			<slot name="icon" />
		</div>
	</div>
</a>
