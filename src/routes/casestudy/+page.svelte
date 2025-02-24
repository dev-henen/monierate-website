<script lang="ts">
	let contentView: string = 'grid' as 'grid' | 'list';
	function changeContentView() {
		contentView = contentView === 'grid' ? 'list' : 'grid';
	}
</script>

<svelte:head>
	<title>Case Study</title>
</svelte:head>

<div class="container">
	<div class="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
		<div>
			<span
				class="inline-block w-[60px] h-[60px] flex justify-center items-center bg-yellow-400/20 rounded-full text-2xl"
			>
				<i class="fa-solid fa-box-open" />
			</span>
		</div>
		<div>
			<h2 class="text-3xl mb-5">Case Studies & Reports</h2>
			<div class="md:w-3/4">
				Overview of what consumers are thinking, featuring survey data on usage, behavior and
				attitudes, opinions and preferences. Get to know the customers in different countries and
				industries.
			</div>
		</div>
	</div>

	<div class="flex flex-col md:flex-row gap-5 mt-16 w-full relative">
		<div class="w-full md:w-1/3 md:sticky md:top-20 md:h-screen">
			<div class="shadow-lg dark:shadow-none dark:bg-gray-900/50 p-5 rounded-md w-full">
				<div class="flex flex-row justify-between items-center">
					<span>
						<p class="text-xl">Filter</p>
					</span>
					<span>
						<button
							class="border border-blue-500 p-2 bg-blue-300/5 hover:bg-blue-300/10 rounded-lg text-blue-500 text-sm"
							>Reset filters</button
						>
					</span>
				</div>
				<div class="mt-5">
					<label for="regions" class="label">Regions/Countries</label>
					<select id="regions" class="select dark:border-none mb-5">
						<option value="all">All</option>
					</select>

					<label for="industry" class="label">Industry</label>
					<select id="industry" class="select dark:border-none mb-5">
						<option value="all">All</option>
					</select>

					<label for="language" class="label">Language</label>
					<select id="language" class="select dark:border-none mb-5">
						<option value="all">All</option>
					</select>

					<label for="report-type" class="label">Report type</label>
					<select id="report-type" class="select dark:border-none mb-5">
						<option value="all">All</option>
					</select>

					<div class="hidden md:block">
						<label for="download-as" class="label">Download as ...</label>
						<div class="text-gray-800 dark:text-gray-400">
							<input
								type="checkbox"
								name="download-as"
								value="PNG"
								class="transform scale-150 mr-1"
								checked
							/>
							PNG<br />
							<input
								type="checkbox"
								name="download-as"
								value="PDF"
								class="transform scale-150 mr-1"
								checked
							/>
							PDF<br />
							<input
								type="checkbox"
								name="download-as"
								value="XLS"
								class="transform scale-150 mr-1"
								checked
							/>
							XLS<br />
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="w-full md:w-2/3">
			<div
				class="shadow-lg dark:shadow-none dark:bg-gray-900/50 p-5 py-3 rounded-md w-full hidden md:flex flex-col md:flex-row gap-5 md:items-center"
			>
				<div class="w-full md:w-1/2">
					<label for="sort-by" class="label my-1">Sort by</label>
					<select id="sort-by" class="select mb-0 dark:border-none">
						<option value="relevance">Relevance</option>
						<option value="date">Date of publication</option>
						<option value="popularity">Popularity</option>
					</select>
				</div>
				<div class="w-full md:w-1/2">
					<span class="label my-1">Chart type</span>
					<div class="flex gap-2">
						<button
							class="border border-{contentView === 'grid'
								? 'blue'
								: 'gray'}-500 p-2 bg-{contentView === 'grid'
								? 'blue'
								: 'gray'}-300/5 hover:bg-{contentView === 'grid'
								? 'blue'
								: 'gray'}-300/10 rounded-lg text-{contentView === 'grid'
								? 'blue'
								: 'gray'}-500 text-lg w-full text-center"
							aria-label="Grid"
							on:click={changeContentView}
						>
							<i class="fa-solid fa-table-cells-large" />
						</button>
						<button
							class="border border-{contentView === 'list'
								? 'blue'
								: 'gray'}-500 p-2 bg-{contentView === 'list'
								? 'blue'
								: 'gray'}-300/5 hover:bg-{contentView === 'list'
								? 'blue'
								: 'gray'}-300/10 rounded-lg text-{contentView === 'lsit'
								? 'blue'
								: 'gray'}-500 text-lg w-full text-center"
							aria-label="Grid"
							on:click={changeContentView}
						>
							<i class="fa-solid fa-bars" />
						</button>
					</div>
				</div>
			</div>

			<div class="mt-5">
				<div class="font-bold mb-2">Total results: 58,917</div>

				<div class="mx-3 md:mx-0">
					<a href="#link" class="flex text-gray-600 dark:text-gray-300 mb-5">
						{#if contentView === 'grid'}
							<div class="py-4 pr-4 w-2/3 hidden md:block">
								<img
									src="/media/previews/casestudy.jpg"
									alt=""
									class="w-[200px] h-[120px] rounded-md shadows-lg dark:shadow-none"
									width="200"
									height="120"
								/>
							</div>
							<div class="py-4 w-3/3">
								<div class="font-bold text-2xl mb-3 md:mb-0">
									<span
										class="inline-block md:hidden mr-2 bg-yellow-500/10 text-yellow-500 p-1 rounded-md"
									>
										<i class="fa-regular fa-file-text" />
									</span>
									Veganism and vegetarianism in the U.S.
								</div>
								<div class="py-2 hidden md:block">
									<span
										class="inline-block bg-red-500/20 py-1 px-2 rounded-md text-red-700 dark:text-red-200 text-xs mr-2"
										>Industries & Markets</span
									>
									<span
										class="inline-block bg-green-500/20 py-1 px-2 rounded-md text-green-700 dark:text-green-200 text-xs mr-2"
										>Consumers & Brands</span
									>
								</div>
								<div class="py-2">
									This report provides statistical information about veganism and vegetarianism in
									the United States. It provides an overview of the global market and the United
									States' position within it. The U.S. markets for milk and meat …
								</div>
								<div
									class="py-3 mt-2 border-t border-gray-300 dark:border-gray-600 text-sm leading-loose"
								>
									<span class="block md:inline-block mb-1 md:mr-4">Price <b>$495 USD</b></span>
									<span class="block md:inline-block mb-1 md:mr-4">
										<i class="fa fa-clock" /> Published in <b>June 2023</b></span
									>
									<span class="block md:inline-block mb-1 md:mr-4">
										<i class="fa fa-folder-open" /> Download as <b>Powerpoint (PPTX)</b></span
									>
									<span class="block md:inline-block mb-1 md:mr-4">
										<i class="fa fa-book" /> 41 pages</span
									>
								</div>
							</div>
						{:else}
							<div class="text-xl">
								<span class="inline-block mr-2 bg-yellow-500/10 text-yellow-500 p-1 rounded-md">
									<i class="fa-regular fa-file-text" />
								</span>
								Veganism and vegetarianism in the U.S.
							</div>
						{/if}
					</a>
				</div>

				<div class="flex gap-4 items-center justify-center mt-16">
					<button
						class="opacity-50 cursor-default bg-gray-500/10 border border-gray-800 dark:border-gray-400 rounded-full flex items-center justify-center w-[30px] h-[30px] text-gray-700 dark:text-gray-200 text-sm"
					>
						<i class="fa fa-chevron-left" />
					</button>
					<span><b>1</b> / 2357</span>
					<button
						class="bg-gray-500/10 border border-gray-800 dark:border-gray-400 rounded-full flex items-center justify-center w-[30px] h-[30px] text-gray-700 dark:text-gray-200 text-sm"
					>
						<i class="fa fa-chevron-right" />
					</button>
				</div>
			</div>
		</div>
	</div>

	<div class="mt-16 md:mt-0">
		<h3 class="text-2xl font-bold mb-8 text-center">Explore our case study categories</h3>
		<div class="flex flex-col md:flex-row gap-5 justify-center text-center">
			<!-- Digital & Trends -->
			<a
				href="#link"
				class="w-full md:w-1/5 flex flex-col justify-center items-center gap-4 p-4 bg-white dark:bg-gray-900/40 rounded-lg shadow-lg dark:shadow-none border-l-4 border-blue-500"
			>
				<span
					class="inline-block w-[40px] h-[40px] flex justify-center items-center bg-blue-400/20 text-blue-500 rounded-full text-xl"
				>
					<i class="fa-solid fa-chart-line" />
				</span>
				<span class="text-gray-700 dark:text-gray-200 text-lg">Digital & Trends</span>
			</a>

			<!-- Industries & Markets -->
			<a
				href="#link"
				class="w-full md:w-1/5 flex flex-col justify-center items-center gap-4 p-4 bg-yellow-500/5 rounded-lg shadow-lg dark:shadow-none border-l-4 border-yellow-500"
			>
				<span
					class="inline-block w-[40px] h-[40px] flex justify-center items-center bg-yellow-400/20 text-yellow-500 rounded-full text-xl"
				>
					<i class="fa-solid fa-industry" />
				</span>
				<span class="text-gray-700 dark:text-gray-200 text-lg">Industries & Markets</span>
			</a>

			<!-- Companies & Products -->
			<a
				href="#link"
				class="w-full md:w-1/5 flex flex-col justify-center items-center gap-4 p-4 bg-white dark:bg-gray-900/40 rounded-lg shadow-lg dark:shadow-none border-l-4 border-red-500"
			>
				<span
					class="inline-block w-[40px] h-[40px] flex justify-center items-center bg-red-400/20 text-red-500 rounded-full text-xl"
				>
					<i class="fa-solid fa-box-open" />
				</span>
				<span class="text-gray-700 dark:text-gray-200 text-lg">Companies & Products</span>
			</a>

			<!-- Consumers & Brands -->
			<a
				href="#link"
				class="w-full md:w-1/5 flex flex-col justify-center items-center gap-4 p-4 bg-white dark:bg-gray-900/40 rounded-lg shadow-lg dark:shadow-none border-l-4 border-green-500"
			>
				<span
					class="inline-block w-[40px] h-[40px] flex justify-center items-center bg-green-400/20 text-green-500 rounded-full text-xl"
				>
					<i class="fa-solid fa-users" />
				</span>
				<span class="text-gray-700 dark:text-gray-200 text-lg">Consumers & Brands</span>
			</a>

			<!-- Countries & Regions -->
			<a
				href="#link"
				class="w-full md:w-1/5 flex flex-col justify-center items-center gap-4 p-4 bg-white dark:bg-gray-900/40 rounded-lg shadow-lg dark:shadow-none border-l-4 border-teal-500"
			>
				<span
					class="inline-block w-[40px] h-[40px] flex justify-center items-center bg-teal-400/20 text-teal-500 rounded-full text-xl"
				>
					<i class="fa-solid fa-globe" />
				</span>
				<span class="text-gray-700 dark:text-gray-200 text-lg">Countries & Regions</span>
			</a>
		</div>
	</div>
</div>
