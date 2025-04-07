<script lang="ts">
	import MdiGithub from '~icons/mdi/github';
	import MdiLinkedin from '~icons/mdi/linkedin';

	interface SocialLink {
		name: string;
		url: string;
		icon: string;
	}

	interface QuickLink {
		name: string;
		url: string;
	}

	const socialLinks: SocialLink[] = [
		{ name: 'GitHub', url: 'https://github.com/AlexanderWangY/gatormarket', icon: 'github' },
		{ name: 'LinkedIn', url: 'https://linkedin.com/in/AlexanderWangY', icon: 'linkedin' }
	];

	const quickLinks: QuickLink[] = [
		{ name: 'Home', url: '/' },
		{ name: 'Discover', url: '/Discover' },
		{ name: 'Make a Listing', url: '/account/new-listing' },
		{ name: 'About Us', url: '/about' },
		{ name: 'Blog', url: '/blog' }
	];

	const helpLinks: QuickLink[] = [
		{ name: 'Safety Tips', url: '/safety' },
		{ name: 'Support', url: '/support' }
	];

	const legalLinks: QuickLink[] = [
		{ name: 'Terms of Service', url: '/terms' },
		{ name: 'Privacy Policy', url: '/privacy' },
		{ name: 'Cookies Policy', url: '/cookies' }
	];
</script>

<footer class="bg-brand-black text-brand-white">
	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-12 md:grid-cols-6">
			<!-- Company Info -->
			<div class="space-y-4 md:col-span-2">
				<div class="flex items-center gap-2">
					<img src="/Logo.svg" alt="GatorMarket Logo" class="h-8" />
					<h3 class="text-lg font-semibold" style="color: #FF894A;">GatorMarket</h3>
				</div>
				<p class="text-brand-white text-sm">
					GatorMarket is the trusted marketplace for verified University of Florida students to buy
					and sell second-hand items.
				</p>
			</div>

			<!-- Quick Links -->
			<div class="space-y-4">
				<h4 class="text-brand-orange text-lg font-semibold">Quick Links</h4>
				<ul class="space-y-2">
					{#each quickLinks as link (link.name)}
						<li>
							<a href={link.url} class="hover:text-brand-orange text-sm transition-colors"
								>{link.name}</a
							>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Help -->
			<div class="space-y-4">
				<h4 class="text-brand-orange text-lg font-semibold">Help</h4>
				<ul class="space-y-2">
					{#each helpLinks as link (link.name)}
						<li>
							<a href={link.url} class="hover:text-brand-orange text-sm transition-colors"
								>{link.name}</a
							>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Legal -->
			<div class="space-y-4">
				<h4 class="text-brand-orange text-lg font-semibold">Legal</h4>
				<ul class="space-y-2">
					{#each legalLinks as link (link.name)}
						<li>
							<a href={link.url} class="hover:text-brand-orange text-sm transition-colors"
								>{link.name}</a
							>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Contact -->
			<div class="space-y-4">
				<h4 class="text-brand-orange text-lg font-semibold">Contact</h4>
				<div class="space-y-1 text-sm">
					<a
						href="mailto:contact@getrewala.com"
						target="_blank"
						class="block underline-offset-4 hover:underline">contact@getrewala.com</a
					>
					<p>Phone support coming soon</p>
				</div>
			</div>

			<!-- Social Links -->
			<div class="space-y-4">
				<h4 class="text-brand-orange text-lg font-semibold">Connect</h4>
				<p class="text-sm text-[#5B5B5B]">Open source project — feel free to contribute!</p>
				<div class="flex space-x-4">
					{#each socialLinks as social (social.name)}
						<a
							href={social.url}
							aria-label={social.name}
							class="hover:text-brand-white text-brand-gray transition-colors"
							target="_blank"
							rel="noopener noreferrer"
						>
							{#if social.icon === 'github'}
								<MdiGithub class="h-8 w-8" />
							{:else if social.icon === 'linkedin'}
								<MdiLinkedin class="h-8 w-8" />
							{/if}
						</a>
					{/each}
				</div>
			</div>
		</div>
	</div>
</footer>
