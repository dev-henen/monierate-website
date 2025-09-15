<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import {
		Chart,
		LineController,
		LineElement,
		PointElement,
		LinearScale,
		Title,
		CategoryScale,
		Tooltip,
		Filler
	} from 'chart.js';

	let canvasEl: HTMLCanvasElement;
	let chart: Chart | null = null;

	Chart.register(
		LineController,
		LineElement,
		PointElement,
		LinearScale,
		Title,
		CategoryScale,
		Tooltip,
		Filler
	);

	const data = {
		labels: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
		datasets: [
			{
				label: 'Market Cap',
				data: [500, 700, 1200, 2400, 1800, 950, 1100, 900],
				borderColor: 'rgba(220,38,38,1)', // red-600
				backgroundColor: 'rgba(220,38,38,0.1)',
				tension: 0.4,
				fill: true,
				pointBackgroundColor: 'rgba(220,38,38,1)',
				pointBorderWidth: 2,
				pointRadius: 4,
				pointHoverRadius: 6
			}
		]
	};

	const options: any = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: { display: false },
			tooltip: {
				backgroundColor: '#fff',
				titleColor: '#000',
				bodyColor: '#000',
				borderColor: '#e5e7eb', // gray-200
				borderWidth: 1,
				padding: 10,
				displayColors: false
			}
		},
		scales: {
			x: {
				grid: { display: false, drawBorder: false },
				ticks: { color: '#9ca3af' } // gray-400
			},
			y: {
				position: 'right',
				grid: { color: '#f3f4f6', drawBorder: false },
				ticks: {
					color: '#9ca3af',
					callback: (val: any) => `₦${val.toLocaleString()}`
				}
			}
		},
		elements: { line: { borderWidth: 2 } }
	};

	onMount(() => {
		chart = new Chart(canvasEl, {
			type: 'line',
			data,
			options
		});
	});

	onDestroy(() => {
		chart?.destroy();
	});

	let activeTab = '24hrs';
</script>

<div class="w-full h-full flex flex-col bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
	<div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
		<div>
			<button class="link text-sm">Overview</button>
			<button class="link text-sm !bg-transparent hover:bg-gray-100 !text-gray-500">About</button>
		</div>
		<div class="flex gap-4 mb-4 text-sm bg-gray-200/50 p-1 rounded-md">
			{#each ['24hrs', '7days', '2weeks', 'All Time'] as tab}
				<button
					class="px-3 py-1 rounded-md bg-gray-100 {activeTab == tab
						? 'text-gray-500 bg-white'
						: 'text-gray-400'} text-sm"
					on:click={() => (activeTab = tab)}
				>
					{tab}
				</button>
			{/each}
		</div>
	</div>
	<div class="w-full h-[300px] md:h-[400px] lg:h-[450px]">
		<canvas bind:this={canvasEl} />
	</div>
</div>

<style>
	.link {
		@apply text-primary bg-primary/10 hover:bg-primary/20 py-1 px-3 rounded-md transition-colors duration-300;
	}
</style>
