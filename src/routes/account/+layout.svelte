<script lang="ts">
	import { Tooltip } from 'bits-ui';
	let { children } = $props();
</script>

<Tooltip.Provider>
	{@render children()}
</Tooltip.Provider>
