<script lang="ts">
	import { formatNumber } from '$lib/functions';
    import FAQ from '$lib/components/FAQ.svelte';

	export let data: any;
	let currencySymbols: any = data.currencySymbols;
	let subscriptionPlans: any = data.subscriptionPlans
		.sort((a: any, b: any) => b.price - a.price)
		.slice(0, 3);

    let faqItems = [
        {
            question: "What services does Monierate API offer?",
            answer: "We offer real-time and historical currency  data for premium FX data."
        },
        {
            question: "Do you have a free plan?",
            answer: "Yes, we offer a free plan for you. You will need to setup an account to access it."
        },
        {
            question: "What currencies data type do you support?",
            answer: "We support official, Midmarket and Black market rates data."
        },
        {
            question: "How do I get started using the Monierate API?",
            answer: "{link:{account:Setup an account}} on, and choose a plan that suit your need, then you can access the api documentation for integration."
        },
        {
            question: "Does Monierate offer any support for API developers?",
            answer: "Yes, we offer standard support for developers and startups."
        },
        {
            question: "What data can I access through the Monierate API?",
            answer: "You can access real-time currency and historical data through our API."
        },
        {
            question: "How do I format my API requests and responses?",
            answer: "Visit our {link:{docs:documentation guide}} on how to integrate and setup this."
        },
        {
            question: "Are there any rate limits for using the Monierate API?",
            answer: "Rate limiting is dependant on the plan you decide to opt into. See plans"
        },
        {
            question: "How do I troubleshoot common API issues?",
            answer: "Read {link:{docs:API documentation}} and if it persist, you can send us an email at {link:{contact:hello@monierate.com}} "
        },
    ]
	let faqLinks = [
		{
			key: "docs",
			url: "https://monierate.apidog.io"
		},
		{
			key: "account",
			url: "https://account.monierate.com"
		},
		{
			key: "contact",
			url: "mailto:hello@monierate.com"
		},
	];
</script>

<div class="bg-white dark:bg-gray-800">
	<div class="container">
		<!-- Landscape Top/Bottom -->
		<div class="cedar-money">
			<a href="https://bit.ly/3MDsvBi" target="_blank">
				<picture>
					<source srcset="/media/banners/cedar-homepage.webp?v=1" type="image/avif" />
					<source srcset="/media/banners/cedar-homepage.png?v=1" type="image/gif" />

					<img
						src="/media/banners/cedar-homepage.webp?v=1"
						alt="Cedar Money"
						width="800px"
						height="114px"
						class="mx-auto max-w-full md:w-[800px] md:h-[114px]"
					/>
				</picture>
			</a>
		</div>
	</div>
</div>

<div class="container mt-8">
	<div class="mb-16 text-center">
		<h2 class="text-3xl font-bold mb-6">Access our API: Power your solutions with Monierate</h2>
		<div>
			For custom pricing, please contact the team: <a
				href="mailto:hello@monierate.com"
				class="underline text-blue-500 hover:text-blue-700">hello@monierate.com</a
			>
		</div>
	</div>

	<div class="grid md:grid-cols-3 gap-5 mb-16">
		{#if subscriptionPlans}
			{#each subscriptionPlans as plan, i}
				<div
					class="bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 {i === 1
						? 'border-blue-500/50 outline outline-2 outline-blue-500/10 outline-offset-2'
						: 'border-gray-200 dark:border-gray-700'} rounded-lg shadow-md p-6 hover:scale-105 transition-all duration-300 {plan.code ===
					'free'
						? 'md:col-span-3 md:place-self-center'
						: ''}"
				>
					<div class="">
						<div class="mb-6">
							<span
								class="inline-block text-lg {i === 0
									? 'text-yellow-800 dark:text-yellow-200 bg-yellow-800/10'
									: i === 1
									? 'text-blue-500 bg-blue-800/10'
									: i === 2
									? 'text-green-500 bg-green-800/10'
									: 'text-gray-800 dark:text-gray-200 bg-gray-800'} rounded-lg p-1 px-4"
							>
								{plan.name}
							</span>
						</div>
						<p class="mt-2 text-5xl font-bold text-gray-900 dark:text-gray-100">
							{currencySymbols[plan.currency]
								? currencySymbols[plan.currency]
								: plan.currency}{formatNumber(plan.price)}
						</p>
					</div>
					<ul class="mt-6 space-y-4">
						<li class="flex items-center text-gray-800 dark:text-gray-400">
							<i class="fa-regular fa-check-circle text-blue-500 mr-2 text-lg" />
							<span class="font-medium"
								>{formatNumber(plan.requests_limit_per_month)} request per month</span
							>
						</li>
						<li class="flex items-center text-gray-800 dark:text-gray-400">
							{#if plan.features.minute_updates}
								<i class="fa-regular fa-check-circle text-blue-500 mr-2 text-lg" />
								<span class="font-medium">
									{formatNumber(plan.features.minute_updates)}
									minute updates
								</span>
							{:else}
								<i class="fa-regular fa-times-circle text-red-500 ml-1 mr-3" />
								<span class="font-medium"> No limit updates </span>
							{/if}
						</li>
						<li class="flex items-center text-gray-800 dark:text-gray-400">
							<i class="fa-regular fa-check-circle text-blue-500 mr-2 text-lg" />
							<span class="font-medium"
								>{formatNumber(plan.requests_limit_per_minute)} request limit per minute</span
							>
						</li>
						<li class="flex items-center text-gray-800 dark:text-gray-400">
							{#if plan.features.supports_premium_currencies === true}
								<i class="fa-regular fa-check-circle text-blue-500 mr-2 text-lg" />
								<span class="font-medium"> Supports premium currencies </span>
							{:else}
								<i class="fa-regular fa-times-circle text-red-500 ml-1 mr-3" />
								<span class="font-medium"> Does not support premium currencies </span>
							{/if}
						</li>
						<li class="flex items-center text-gray-800 dark:text-gray-400">
							{#if plan.features.custom_reports === true}
								<i class="fa-regular fa-check-circle text-blue-500 mr-2 text-lg" />
								<span class="font-medium"> With custom historical reports </span>
							{:else}
								<i class="fa-regular fa-times-circle text-red-500 ml-1 mr-3" />
								<span class="font-medium"> No custom historical reports </span>
							{/if}
						</li>
					</ul>
					<div class="mt-6">
						<a
							href="https://account.monierate.com/subscription/{plan._id}"
							class="w-full button block text-center {i === 1
								? 'bg-blue-500 hover:bg-blue-600 text-white'
								: 'bg-transparent hover:bg-blue-500/5 border border-blue-500 text-blue-500'} font-medium py-3 px-4 rounded"
							>Select Plan</a
						>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>


<div class="bg-gray-50 dark:bg-gray-900/60 py-2 mb-16">
    <div class="container flex flex-col md:flex-row md:items-center justify-between">
        <div class="mb-5 md:mb-0">
            <span class="block text-xl font-bold mb-4">Not sure which plan suit your needs?</span>
            <p class="text-gray-600 dark:text-gray-400">Reach out to us and our expert, we will revert back between 24hours</p>
        </div>
        <div>
            <a href="mailto:hello@monierate.com" class="button bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded">Contact us</a>
        </div>
    </div>
</div>


<FAQ faqItems={faqItems} links={faqLinks} coverPage={false} />

<div class="bg-gray-50 dark:bg-gray-900/60 py-2 mt-16">
    <div class="container flex flex-col md:flex-row md:items-center justify-between">
        <div class="mb-5 md:mb-0">
            <span class="block text-xl font-bold mb-4">Already have a plan?</span>
            <p class="text-gray-600 dark:text-gray-400">Read our API documentation</p>
        </div>
        <div>
            <a href="https://monierate.apidog.io" target="_blank" class="button bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded">Get API Documentation</a>
        </div>
    </div>
</div>