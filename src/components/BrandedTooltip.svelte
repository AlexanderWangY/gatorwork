<script lang="ts">
	import { Tooltip } from 'bits-ui';

	export let text: string;
</script>

<Tooltip.Root delayDuration={200}>
	<Tooltip.Trigger class="inline-block rounded-full border">
		<slot />
	</Tooltip.Trigger>
	<Tooltip.Content sideOffset={8}>
		<div class="text-brand-white bg-brand-orange rounded-md px-8 py-2">{text}</div>
	</Tooltip.Content>
</Tooltip.Root>
