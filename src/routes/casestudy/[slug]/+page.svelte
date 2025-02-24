<script lang="ts">
	import Pricing from '$lib/components/Pricing.svelte';
	import { login_uri } from '$lib/functions';

	export let data: any;
	let statisticBox: any;
	let statisticBoxInitialDetails: any = {
		width: 0,
		height: 0,
		top: 0,
		left: 0,
		bottom: 0,
		right: 0
	};
	let accessRequestOverlay: boolean = false;
	let accessRequestOverlayElement: any;
	let accessRequestOverlayElementClickEvent: any;

	let isGraphAddFavoriteOpen: boolean = false;
	let isGraphNotificationsOpen: boolean = false;
	let isGraphSettingsOpen: boolean = false;
	let isGraphShareOpen: boolean = false;
	let isGraphQuoteOpen: boolean = false;
	let isGraphPrintOpen: boolean = false;

	let fullOverview: boolean = false;

	function getStatisticBoxInitialDetails() {
		const rect = statisticBox.getBoundingClientRect();
		statisticBoxInitialDetails = {
			width: rect.width,
			height: rect.height,
			top: rect.top,
			left: rect.left,
			bottom: rect.bottom,
			right: rect.right
		};
	}

	function scrollStatisticToBox() {
		statisticBox.scrollIntoView({ block: 'center' });

		return new Promise((resolve) => setTimeout(resolve, 100));
	}

	async function showAccessRequestOverlay() {
		await scrollStatisticToBox(); // Wait for scroll to complete
		document.body.style.overflow = 'hidden';
		getStatisticBoxInitialDetails();
		accessRequestOverlay = true;
		accessRequestOverlayElementClickEvent = accessRequestOverlayElement.addEventListener(
			'click',
			handleClickOverlayCLick
		);
	}

	function hideAccessRequestOverlay() {
		accessRequestOverlay = false;
		document.body.style.overflow = 'auto';
		accessRequestOverlayElement.removeEventListener('click', handleClickOverlayCLick);
	}

	function handleClickOverlayCLick(event: any) {
		if (event.target === accessRequestOverlayElement) {
			hideAccessRequestOverlay();
			hideAllGraphPanel();
		}
	}

	const hideAllGraphPanel = () => {
		isGraphAddFavoriteOpen = false;
		isGraphNotificationsOpen = false;
		isGraphSettingsOpen = false;
		isGraphShareOpen = false;
		isGraphQuoteOpen = false;
		isGraphPrintOpen = false;
	};

	const openGraphPanel = (graph = 'none') => {
		const isPanelOpen = {
			addFavorite: isGraphAddFavoriteOpen,
			notifications: isGraphNotificationsOpen,
			settings: isGraphSettingsOpen,
			share: isGraphShareOpen,
			quote: isGraphQuoteOpen,
			print: isGraphPrintOpen
		} as { [key: string]: boolean };

		const isCurrentPanelOpen = isPanelOpen[graph];

		if (graph === 'none' || isCurrentPanelOpen) {
			hideAllGraphPanel();
			hideAccessRequestOverlay();
			return;
		}

		hideAllGraphPanel();

		isGraphAddFavoriteOpen = graph === 'addFavorite';
		isGraphNotificationsOpen = graph === 'notifications';
		isGraphSettingsOpen = graph === 'settings';
		isGraphShareOpen = graph === 'share';
		isGraphQuoteOpen = graph === 'quote';
		isGraphPrintOpen = graph === 'print';

		showAccessRequestOverlay();
	};
</script>

<svelte:head>
	<title>Case study overviews</title>
</svelte:head>

<div class="container">
	<div class="text-right relative">
		<a
			href="#link"
			class="btn btn-primary inline-flex text-green-500 border border-green-500 rounded-md text-sm font-bold tracking-tighter leading-tight absolute top-[-50px] right-0"
		>
			<span class="py-1 px-4"> PLUS </span>
			<span class="bg-green-500 text-white p-1"> + </span>
		</a>
	</div>

	<div class="mb-10">
		<h2 class="text-2xl md:text-3xl mb-5">
			Global social network penetration rate as of January 2025, by region
		</h2>
	</div>

	<div class="flex flex-col md:flex-row gap-4">
		<div class="w-full md:w-2/3">
			<div
				class="transition-bg duration-50 ease-in-out {accessRequestOverlay
					? 'fixed top-0 left-0 w-full h-full bg-gray-700/80 z-[100]'
					: ''}"
				bind:this={accessRequestOverlayElement}
			>
				<div
					class="shadow-lg dark:shadow-none bg-white dark:bg-gray-900{accessRequestOverlay
						? ''
						: '/40'} rounded-lg p-8 md:h-[448px] relative"
					class:custom-position={accessRequestOverlay}
					style={accessRequestOverlay
						? `width: ${statisticBoxInitialDetails.width}px; height: ${statisticBoxInitialDetails.height}px; top: ${statisticBoxInitialDetails.top}px; left: ${statisticBoxInitialDetails.left}px;`
						: ''}
					bind:this={statisticBox}
				>
					<div class="absolute top-0 right-0 p-3 hidden md:flex flex-col gap-3 z-[20]">
						<div class="relative group inline-block">
							<button
								class="graph-tooltip-button {isGraphAddFavoriteOpen ? '!bg-blue-500' : ''}"
								on:click={() => openGraphPanel('addFavorite')}
							>
								<i class="fa-solid fa-star" />
							</button>

							<div class="tooltip-content">
								Add this content to your personal favorites. These can be accessed from the
								favorites menu in the main navigation.
							</div>
						</div>

						<div class="relative group inline-block">
							<button
								class="graph-tooltip-button {isGraphNotificationsOpen ? '!bg-blue-500' : ''}"
								on:click={() => openGraphPanel('notifications')}
							>
								<i class="fa-solid fa-bell" />
							</button>

							<div class="tooltip-content">
								Get notified via email when this statistic is updated.
							</div>
						</div>

						<div class="relative group inline-block">
							<button
								class="graph-tooltip-button {isGraphSettingsOpen ? '!bg-blue-500' : ''}"
								on:click={() => openGraphPanel('settings')}
							>
								<i class="fa-solid fa-gear" />
							</button>

							<div class="tooltip-content">
								Adjust the presentation of the statistic and data points.
							</div>
						</div>

						<div class="relative group inline-block">
							<button
								class="graph-tooltip-button {isGraphShareOpen ? '!bg-blue-500' : ''}"
								on:click={() => openGraphPanel('share')}
							>
								<i class="fa-solid fa-share-alt" />
							</button>

							<div class="tooltip-content">
								Share the statistic on social media channels or embed the statistic in your website
								using "Embed Code", where available.
							</div>
						</div>

						<div class="relative group inline-block">
							<button
								class="graph-tooltip-button {isGraphQuoteOpen ? '!bg-blue-500' : ''}"
								on:click={() => openGraphPanel('quote')}
							>
								<i class="fa-solid fa-quote-left" />
							</button>

							<div class="tooltip-content">
								Cite this statistic and select one of the following formats: APA, Chicago, Harvard,
								MLA & Bluebook.
							</div>
						</div>

						<div class="relative group inline-block">
							<button
								class="graph-tooltip-button {isGraphPrintOpen ? '!bg-blue-500' : ''}"
								on:click={() => openGraphPanel('print')}
							>
								<i class="fa-solid fa-print" />
							</button>

							<div class="tooltip-content">
								Print the statistic including description and metadata.
							</div>
						</div>
					</div>

					<div class="w-full md:h-full flex flex-col gap-4 md:pr-[150px] relative">
						<div class="w-full">
							<img src="/media/previews/stats.png" alt="Placeholder" />
						</div>
						<div
							class="absolute top-1/2 left-1/2 md:top-1/2 md:left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 w-screen max-w-[500px] md:max-w-none md:w-3/4 md:h-3/4 z-10"
						>
							<div
								class="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg dark:shadow-none w-full h-full overflow-hidden"
							>
								<div class="p-6 space-y-2">
									<div class="text-lg">
										You need a <span class="text-gray-900 dark:text-white">Monierate Account</span> for
										unlimited access
									</div>
									<div class="hidden md:block">
										<i class="fa fa-check-circle mr-2" /> Immediate access to 1m+ statistics
									</div>
									<div class="hidden md:block"><i class="fa fa-check-circle mr-2" /> Incl. source references</div>
									<div class="hidden md:block"><i class="fa fa-check-circle mr-2" /> Download as PNG, PDF, XLS</div>
									<div>
										<a href="/api" class="button inline-block mt-2 w-full md:w-auto text-center">Get full access</a>
									</div>
								</div>
								<div class="bg-white dark:bg-gray-800 p-3 text-sm text-gray-500 dark:text-gray-400">
									Already have an account?
									<a href="{login_uri()}">Login</a>
								</div>
							</div>
						</div>
					</div>

					<div class="absolute bottom-0 left-0 w-full">
						<div
							class="flex flex-col justify-end h-64 w-full bg-gradient-to-b from-transparent via-white to-white dark:via-gray-900/50 dark:to-gray-900"
						>
							<div class="flex flex-row justify-between items-center p-4 text-sm">
								<div class="hidden md:block">
									<a href="#link" class="hover:underline">
										<i class="fa fa-info-circle" />
										Additional Information
									</a>
								</div>
								<div class="text-right">
									<a href="#link" class="hover:underline">
										© Monierate 2025
										<i class="fa fa-flag" />
									</a><br />
									<a href="#link" class="hover:underline hidden md:inline">
										Show source
										<i class="fa fa-info-circle" />
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div
					class="absolute top-0 left-0 w-full md:w-[390px] z-10"
					class:custom-position={accessRequestOverlay}
					style={accessRequestOverlay
						? `top: ${statisticBoxInitialDetails.top}px; left: ${
								15 + statisticBoxInitialDetails.width + statisticBoxInitialDetails.left
						  }px;`
						: 'hidden'}
				>
					{#if isGraphSettingsOpen && accessRequestOverlay}
						<div class="graphPanel fade-in">
							<button
								class="absolute right-0 top-0 m-4 text-2xl"
								on:click={() => openGraphPanel('settings')}>&times;</button
							>
							<div class="font-bold">Chart type</div>
							<div class="my-2">
								<span class="inline-block border inline-flex items-center rounded overflow-hidden">
									<button class="border-r px-4 py-1.5 bg-blue-500">
										<i class="fa fa-bar-chart" />
									</button>
									<button class="border-r px-4 py-1.5"> <i class="fa fa-line-chart" /> </button>
									<button class="px-4 py-1.5"> <i class="fa fa-th" /> </button>
								</span>
							</div>
							<div class="my-4 space-y-1">
								<div>
									<input type="checkbox" id="rotate" class="transform scale-125" />
									<label for="rotate">Rotate 90°</label>
								</div>
								<div>
									<input type="checkbox" id="show-tooltip" class="transform scale-125" />
									<label for="show-tooltip">Show tooltip°</label>
								</div>
							</div>

							<div class="my-4 space-y-1">
								<div class="font-bold mb-1">Datalabels</div>
								<div>
									<input type="radio" id="datalabels-1" class="transform scale-125" checked />
									<label for="datalabels-1">Default</label>
								</div>
								<div>
									<input type="radio" id="datalabels-2" class="transform scale-125" />
									<label for="datalabels-2">All</label>
								</div>
								<div>
									<input type="radio" id="datalabels-3" class="transform scale-125" />
									<label for="datalabels-2">None</label>
								</div>
								<div>
									<input type="radio" id="datalabels-4" class="transform scale-125" />
									<label for="datalabels-2">Custom</label>
								</div>
							</div>
						</div>
					{/if}

					{#if isGraphShareOpen && accessRequestOverlay}
						<div class="graphPanel fade-in">
							<button
								class="absolute right-0 top-0 m-4 text-2xl"
								on:click={() => openGraphPanel('share')}>&times;</button
							>
							<div class="flex gap-2 mb-5">
								<img src="/media/previews/stats.png" class="w-20" alt="Graph" />
								<span class="mr-5">
									Global social network penetration rate as of January 2025, by region
								</span>
							</div>
							<div class="font-bold">Share this statistic</div>
							<div class="my-2">
								<span class="inline-flex items-center gap-2">
									<button class="button"> <i class="fa fa-facebook-f" /> </button>
									<button class="button"> <i class="fa fa-linkedin" /> </button>
									<button class="button"> <i class="fa fa-twitter" /> </button>
									<button class="button"> <i class="fa fa-envelope" /> </button>
								</span>
							</div>
						</div>
					{/if}

					{#if isGraphQuoteOpen && accessRequestOverlay}
						<div class="graphPanel fade-in">
							<button
								class="absolute right-0 top-0 m-4 text-2xl"
								on:click={() => openGraphPanel('quote')}>&times;</button
							>
							<div class="font-bold">Select citation (FAQ)</div>
							<div class="my-2">
								<select id="quote" class="select">
									<option value="apa">APA</option>
									<option value="chicago">chicago</option>
								</select>
								<div class="bg-gray-200 dark:bg-gray-700 border rounded-md p-4 mt-2">
									<div class="flex gap-1">
										<i class="fa fa-quote-right" />
										<div class="relative px-2">
											The source adds the following information: "Users may not represent unique
											individuals, so figures may exceed internet penetration values."
											<span class="absolute top-0 left-0 w-full h-full backdrop-blur-sm" />
										</div>
									</div>
								</div>
								<div class="text-center p-2">
									This feature is not available with your current account.
									<br />
									<a href="https://monierate.com/api" class="text-blue-500">Request access</a>
								</div>
							</div>
						</div>
					{/if}

					{#if isGraphAddFavoriteOpen || isGraphNotificationsOpen || (isGraphPrintOpen && accessRequestOverlay)}
						<div class="graphPanel fade-in">
							<button
								class="absolute right-0 top-0 m-4 text-2xl"
								on:click={() => {
									hideAccessRequestOverlay();
									hideAllGraphPanel();
								}}>&times;</button
							>
							<div class="font-bold mr-5">
								You need at lease a <b>starter account</b> to use this feature.
							</div>
							<div class="absolute bottom-[-170px] left-[20px]">
								<div class="rotate-90">
									<svg
										width="200"
										height="200"
										viewBox="0 0 200 200"
										xmlns="http://www.w3.org/2000/svg"
										class="block dark:hidden"
									>
										<path
											d="M20 40 Q100 0 180 160"
											fill="none"
											stroke="#fff"
											stroke-width="5"
											marker-end="url(#arrowhead)"
										/>
										<defs>
											<marker
												id="arrowhead"
												markerWidth="10"
												markerHeight="7"
												refX="0"
												refY="3.5"
												orient="auto"
											>
												<polygon points="0 0, 10 3.5, 0 7" fill="#fff" />
											</marker>
										</defs>
									</svg>
									<svg
										width="200"
										height="200"
										viewBox="0 0 200 200"
										xmlns="http://www.w3.org/2000/svg"
										class="hidden dark:block"
									>
										<path
											d="M20 40 Q100 0 180 160"
											fill="none"
											stroke="#111827"
											stroke-width="5"
											marker-end="url(#arrowhead-gray)"
										/>
										<defs>
											<marker
												id="arrowhead-gray"
												markerWidth="10"
												markerHeight="7"
												refX="0"
												refY="3.5"
												orient="auto"
											>
												<polygon points="0 0, 10 3.5, 0 7" fill="#111827" />
											</marker>
										</defs>
									</svg>
								</div>
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
		<div class="w-full md:w-1/3 flex flex-col gap-4">
			<div class="shadow-lg dark:shadow-none dark:bg-gray-900/40 rounded-lg p-4">
				<div class="font-bold text-gray-800 dark:text-gray-200 mb-2 pl-1">Download</div>
				<div class="bg-gray-100 dark:bg-gray-700 rounded-md p-4 flex justify-evenly items-center">
					<button
						class="btn btn-primary inline-flex text-dark dark:text-white border border-dark dark:border-white rounded-md text-sm font-bold tracking-tighter leading-tight bg-gray-200/30 dark:bg-gray-900/30"
					>
						<span class="p-2 inline-flex items-center">
							<i class="fa-regular fa-file-pdf text-red-500 mr-2" />
							PDF
						</span>
						<span class="bg-dark dark:bg-white text-white dark:text-dark px-1 py-2"> + </span>
					</button>
					<button
						class="btn btn-primary inline-flex text-dark dark:text-white border border-dark dark:border-white rounded-md text-sm font-bold tracking-tighter leading-tight bg-gray-200/30 dark:bg-gray-900/30"
					>
						<span class="p-2 inline-flex items-center">
							<i class="fa-regular fa-file-excel text-green-500 mr-2" />
							XLS
						</span>
						<span class="bg-dark dark:bg-white text-white dark:text-dark px-1 py-2"> + </span>
					</button>
					<button
						class="btn btn-primary inline-flex text-dark dark:text-white border border-dark dark:border-white rounded-md text-sm font-bold tracking-tighter leading-tight bg-gray-200/30 dark:bg-gray-900/30"
					>
						<span class="p-2 inline-flex items-center">
							<i class="fa-regular fa-file-image text-blue-500 mr-2" />
							PNG
						</span>
						<span class="bg-dark dark:bg-white text-white dark:text-dark px-1 py-2"> + </span>
					</button>
				</div>
			</div>

			<div
				class="shadow-lg dark:shadow-none dark:bg-gray-900/40 rounded-lg p-4 md:h-[300px] md:overflow-x-auto scrollbar-thin scrollbar-thumb-gray-800 dark:scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-track-gray-700"
			>
				<div class="mb-4">
					<div class="font-bold text-gray-600 dark:text-gray-300 mb-2">Sources</div>
					<a href="#link" class="text-blue-800 dark:text-blue-400 hover:underline">
						<i class="fa fa-long-arrow-right mr-2" /> Show sources information</a
					><br />
					<a href="#link" class="text-blue-800 dark:text-blue-400 hover:underline">
						<i class="fa fa-long-arrow-right mr-2" /> Show publisher information</a
					><br />
					<a href="#link" class="text-blue-800 dark:text-blue-400 hover:underline">
						<i class="fa fa-long-arrow-right mr-2" /> Use Ask Monierate Research Service</a
					><br />
				</div>
				<div class="mb-4">
					<div class="font-bold text-gray-600 dark:text-gray-300 mb-1">Release date</div>
					<div class="text-gray-600 dark:text-gray-300 mb-2">February 2025</div>
				</div>
				<div class="mb-4">
					<div class="font-bold text-gray-600 dark:text-gray-300 mb-1">Region</div>
					<div class="text-gray-600 dark:text-gray-300 mb-2">Worldwide</div>
				</div>
				<div class="mb-4">
					<div class="font-bold text-gray-600 dark:text-gray-300 mb-1">Survey time period</div>
					<div class="text-gray-600 dark:text-gray-300 mb-2">January 2025</div>
				</div>
				<div class="mb-4">
					<div class="font-bold text-gray-600 dark:text-gray-300 mb-1">Special properties</div>
					<div class="text-gray-600 dark:text-gray-300 mb-2">
						social media users as a share of total population
					</div>
				</div>
				<div class="mb-4">
					<div class="font-bold text-gray-600 dark:text-gray-300 mb-1">Supplementary notes</div>
					<div class="text-gray-600 dark:text-gray-300 mb-2">
						The source adds the following information: "Users may not represent unique individuals,
						so figures may exceed internet penetration values."
					</div>
				</div>
				<div class="mb-4">
					<div class="font-bold text-gray-600 dark:text-gray-300 mb-2">Citation formats</div>
					<button
						class="text-blue-800 dark:text-blue-400 hover:underline"
						on:click={() => openGraphPanel('quote')}
					>
						<i class="fa fa-long-arrow-right mr-2" /> View options</button
					>
				</div>
			</div>
		</div>
	</div>

	<div
		class="shadow-lg dark:shadow-none dark:bg-gray-900/40 rounded-lg p-4 mt-10 relative pb-20 overflow-hidden {fullOverview
			? ''
			: 'h-[450px] md:h-[300px]'}"
	>
		<h3 class="text-2xl mb-4">Social media: global penetration rate 2025, by region</h3>
		<div class="mb-4">Published by Statista Research Department, Feb 10, 2025</div>
		<div class="ml-2">
			<div class="mb-4">
				As of January 2025, Northern and Western Europe were the regions with the highest social
				network penetration rates globally, reaching 78.7 and 77.1 percent, respectively. Eastern
				Asia ranked third with a penetration rate of 76 percent, followed by Southern Europe with
				74.2 percent. In contrast, Eastern and Middle Africa were the regions with the lowest reach,
				with 11.1 and 10.1 percent. Overall, the global average was 63.9 percent, which translates
				to almost six out of every ten people around the world using social networks. The regions
				below the global average were located in Africa and Asia, as well as Oceania and the
				Caribbean.
			</div>
			<h3 class="text-2xl mb-4">Global social media use</h3>
			<div class="mb-4">
				In 2023, 4.89 billion people around the world were using social media, and the number of
				users is projected to continue rising to almost six billion by 2027. Meta’s Facebook is the
				most popular social media network globally, with more than three billion monthly active
				users (MAU). Meta Platforms owns four of the ten leading social media networks globally,
				each with more than one billion MAU: Facebook, WhatsApp, Instagram, and Facebook Messenger.
			</div>
			<h3 class="text-2xl mb-4">Social Media Usage, by country</h3>
			<div class="mb-4">
				As of January 2024, the UAE had the highest social media penetration rate out of selected
				countries and territories. Brazil and Morocco were close to the global average of 62.3
				percent, with 66.3 and 55.7 percent, respectively, while Kenya reached only 23.5 percent.
				Although India’s active social media penetration rate was below average at 32.2 percent, the
				country had the second largest social media audience in the world, with 755 million social
				media users in 2022.
			</div>
		</div>
		<div
			class="absolute bottom-0 left-0 w-full bg-gradient-to-b from-transparent via-white to-white dark:via-gray-900/90 dark:to-gray-900 p-5 pt-20"
		>
			<button class="button" on:click={() => (fullOverview = !fullOverview)}>
				{#if fullOverview}
					Hide
				{:else}
					Read more
				{/if}
			</button>
		</div>
	</div>

	<div class="mt-10">
		<h3 class="text-2xl mb-4">Other statistics on the topic</h3>
		<div class="mb-8">
			<a href="#link"><i class="fa fa-long-arrow-right mr-2" /> Social media</a>
		</div>

		<div class="flex flex-col md:flex-row gap-4 flex-wrap">
			<div
				class="basis-[calc(50%-0.5rem)] flex gap-4 shadow-lg dark:shadow-none dark:bg-gray-900/40 rounded-lg p-4"
			>
				<div>
					<img src="/media/previews/stats.png" alt="Social media" width="100" />
				</div>
				<div>
					<div class="font-bold text-gray-600 dark:text-gray-300 mb-2">Citation formats</div>
					<div class="mb-2">Most used social networks 2024, by number of users</div>
				</div>
			</div>
			<div
				class="basis-[calc(50%-0.5rem)] flex gap-4 shadow-lg dark:shadow-none dark:bg-gray-900/40 rounded-lg p-4"
			>
				<div>
					<img src="/media/previews/stats.png" alt="Social media" width="100" />
				</div>
				<div>
					<div class="font-bold text-gray-600 dark:text-gray-300 mb-2">Citation formats</div>
					<div class="mb-2">Most used social networks 2024, by number of users</div>
				</div>
			</div>
			<div
				class="basis-[calc(50%-0.5rem)] flex gap-4 shadow-lg dark:shadow-none dark:bg-gray-900/40 rounded-lg p-4"
			>
				<div>
					<img src="/media/previews/stats.png" alt="Social media" width="100" />
				</div>
				<div>
					<div class="font-bold text-gray-600 dark:text-gray-300 mb-2">Citation formats</div>
					<div class="mb-2">Most used social networks 2024, by number of users</div>
				</div>
			</div>
			<div
				class="basis-[calc(50%-0.5rem)] flex gap-4 shadow-lg dark:shadow-none dark:bg-gray-900/40 rounded-lg p-4"
			>
				<div>
					<img src="/media/previews/stats.png" alt="Social media" width="100" />
				</div>
				<div>
					<div class="font-bold text-gray-600 dark:text-gray-300 mb-2">Citation formats</div>
					<div class="mb-2">Most used social networks 2024, by number of users</div>
				</div>
			</div>
		</div>		
	</div>
	
	<div class="mt-16">
		<h3 class="text-2xl mb-8">Access all statistics starting from $5,964 USD yearly *</h3>
		<Pricing data={data}/>
	</div>

	<div class="mt-16">
		<h4 class="text-2xl mb-8 hidden md:block">Related reports: Available to download in PDF or PPTX format</h4>

		<div class="hidden md:flex gap-8">
			<div>
				<img src="/media/previews/casestudy.jpg" alt="Social media" width="100" class="w-full shadow-lg rounded-md" />
			</div>
			<div>
				<div class="font-bold text-2xl mb-4">Social media in the Asia-Pacific region</div>
				<div class="flex gap-2 flex-wrap mb-4">
					<span>49 page/s</span>
					<span>|</span>
					<span><i class="fa fa-language"/> English</span>
					<span>|</span>
					<span><i class="fa fa-file-pdf"/> PDF</span>
					<span>|</span>
					<span>Detailed references</span>
				</div>
				<div class="mb-4">Everything on "Social media in the Asia-Pacific region" in one document: edited and divided into chapters, including detailed references.</div>
			    <a href="#link" class="button">Go to report</a>
			</div>
		</div>

		<div class="mt-10">
			<div class="font-bold text-xl mb-4">Further reports</div>
			<div class="flex flex-col md:flex-row flex-wrap gap-y-5">
				<a href="#link" class="block text-xl w-full md:w-1/3 md:pr-5">
					<span class="inline-block mr-2 bg-yellow-500/10 text-yellow-500 p-1 rounded-md">
						<i class="fa-regular fa-file-text" />
					</span>
					Veganism and vegetarianism in the...
				</a>
				<a href="#link" class="block text-xl w-full md:w-1/3 md:pr-5">
					<span class="inline-block mr-2 bg-yellow-500/10 text-yellow-500 p-1 rounded-md">
						<i class="fa-regular fa-file-text" />
					</span>
					Veganism and vegetarianism in the...
				</a>
				<a href="#link" class="block text-xl w-full md:w-1/3 md:pr-5">
					<span class="inline-block mr-2 bg-yellow-500/10 text-yellow-500 p-1 rounded-md">
						<i class="fa-regular fa-file-text" />
					</span>
					Veganism and vegetarianism in the...
				</a>
				<a href="#link" class="block text-xl w-full md:w-1/3 md:pr-5">
					<span class="inline-block mr-2 bg-yellow-500/10 text-yellow-500 p-1 rounded-md">
						<i class="fa-regular fa-file-text" />
					</span>
					Veganism and vegetarianism in the...
				</a>
				<a href="#link" class="block text-xl w-full md:w-1/3 md:pr-5">
					<span class="inline-block mr-2 bg-yellow-500/10 text-yellow-500 p-1 rounded-md">
						<i class="fa-regular fa-file-text" />
					</span>
					Veganism and vegetarianism in the...
				</a>
				<a href="#link" class="block text-xl w-full md:w-1/3 md:pr-5">
					<span class="inline-block mr-2 bg-yellow-500/10 text-yellow-500 p-1 rounded-md">
						<i class="fa-regular fa-file-text" />
					</span>
					Veganism and vegetarianism in the...
				</a>
				<a href="#link" class="block text-xl w-full md:w-1/3 md:pr-5">
					<span class="inline-block mr-2 bg-yellow-500/10 text-yellow-500 p-1 rounded-md">
						<i class="fa-regular fa-file-text" />
					</span>
					Veganism and vegetarianism in the...
				</a>
			</div>
		</div>
	</div>
</div>

<style>
	.graph-tooltip-button {
		@apply bg-white dark:bg-gray-600/80 shadow-md dark:shadow-none text-gray-700 dark:text-white w-[35px] h-[35px] rounded-lg inline-flex items-center justify-center;
	}
	.tooltip-content {
		@apply absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full mr-2 w-[300px] bg-gray-800 text-white text-sm rounded-lg px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-50;
	}
	.graphPanel {
		@apply shadow-lg dark:shadow-none bg-white dark:bg-gray-900 p-4 rounded-md relative;
	}
	.fade-in {
		opacity: 0;
		animation: fadeIn 0.5s ease-out forwards;
	}

	@keyframes fadeIn {
		to {
			opacity: 1;
		}
	}
</style>
