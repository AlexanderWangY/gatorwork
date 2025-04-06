<script lang="ts">
	import { Accordion } from 'bits-ui';

	interface FAQItem {
		question: string;
		answer: string;
	}

	const faqItems: FAQItem[] = [
		{
			question: 'Can anyone join?',
			answer: 'Only users with a @ufl.edu email can sign up.'
		},
		{
			question: 'How can I contribute to GatorMarket?',
			answer:
				"Did you know we're open source? You can find us at https://github.com/AlexanderWangY/gatormarket"
		}
	];
</script>

<div class="mx-auto max-w-5xl px-6 py-12">
	<!-- Breadcrumb -->
	<nav class="text-brand-gray mb-6 text-lg">
		<a href="/" class="underline-offset-4 hover:underline">Home</a> &gt; Support
	</nav>

	<!-- Title -->
	<div class="mb-6 flex flex-col gap-2">
		<h1 class="text-brand-black text-4xl font-bold">Support</h1>
		<p class="text-brand-gray text-sm">Last Updated: April 6th, 2025</p>
	</div>

	<p class="text-brand-gray mb-10 text-lg">
		Have questions, issues, or just need a hand? We’re here to help. GatorMarket is built by
		students, for students — so we know things don’t always go smoothly. Check out the info below or
		reach out directly.
	</p>

	<div class="space-y-10">
		<section>
			<h2 class="text-brand-blue mb-2 text-2xl font-semibold">1. Common Questions</h2>

			<Accordion.Root class="w-full" type="multiple">
				{#each faqItems as item (item.question)}
					<Accordion.Item value={item.question} class="border-brand-gray border-b">
						<Accordion.Header class="flex items-center justify-between py-4">
							<Accordion.Trigger class="text-brand-black cursor-pointer text-lg font-semibold">
								<p class="w-full">
									{item.question}
								</p>
							</Accordion.Trigger>
						</Accordion.Header>
						<Accordion.Content class="text-brand-gray pb-4">
							{item.answer}
						</Accordion.Content>
					</Accordion.Item>
				{/each}
			</Accordion.Root>
		</section>

		<section>
			<h2 class="text-brand-blue mb-2 text-2xl font-semibold">2. Contact Us</h2>
			<p class="text-brand-gray">Can’t find what you need? We’re quick to respond. Reach us at:</p>
			<ul class="text-brand-gray mt-2 ml-6">
				<li>
					Email: <a href="mailto:contact@getrewala.com" class="text-brand-blue hover:underline"
						>contact@getrewala.com</a
					>
				</li>
				<li>Instagram DMs: <span class="text-brand-gray">@gatormarket</span></li>
				<li>Live Chat (coming soon!)</li>
			</ul>
		</section>

		<section>
			<h2 class="text-brand-blue mb-2 text-2xl font-semibold">3. Report a User or Listing</h2>
			<p class="text-brand-gray">
				If someone violates the rules, acts suspiciously, or you feel unsafe during an exchange,
				report them. We take every report seriously.
			</p>
			<p class="text-brand-gray mt-2">To report:</p>
			<ul class="mt-2 ml-6 list-disc">
				<li>Tap the <strong>flag icon</strong> on the listing or user profile</li>
				<li>Or email us with a screenshot and short description</li>
			</ul>
		</section>

		<section>
			<h2 class="text-brand-blue mb-2 text-2xl font-semibold">4. Feature Requests & Feedback</h2>
			<p class="text-brand-gray">
				GatorMarket is always growing — and your feedback shapes what we build next. Want a new
				category? Think a feature is missing? Let us know!
			</p>
			<p class="text-brand-gray mt-2">
				Drop suggestions at <a
					href="mailto:contact@getrewala.com"
					class="text-brand-blue hover:underline">contact@getrewala.com</a
				>
				or submit them through the app's Feedback form.
			</p>
		</section>
	</div>

	<!-- CTA -->
	<div class="bg-brand-orange mt-12 rounded-2xl p-6 text-white shadow-md">
		<h3 class="mb-1 text-xl font-semibold">We’ve Got You 🐊</h3>
		<p>
			Whether you're trying to sell a bike, trade textbooks, or just figuring things out —
			GatorMarket support is here for you. Don’t hesitate to reach out.
		</p>
	</div>
</div>
