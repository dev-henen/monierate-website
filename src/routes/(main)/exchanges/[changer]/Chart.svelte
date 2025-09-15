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

	let canvasLight: HTMLCanvasElement;
	let canvasDark: HTMLCanvasElement;
	let chartLight: Chart | null = null;
	let chartDark: Chart | null = null;

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

	// Custom plugin for vertical hover line
	const crosshairPlugin = {
		id: 'crosshair',
		afterDraw: (chart: Chart) => {
			if (chart.tooltip?.getActiveElements()?.length) {
				const ctx = chart.ctx;
				const activePoint = chart.tooltip.getActiveElements()[0];
				const x = chart.scales.x.getPixelForValue(activePoint.index);
				const topY = chart.scales.y.top;
				const bottomY = chart.scales.y.bottom;

				ctx.save();
				ctx.beginPath();
				ctx.moveTo(x, topY);
				ctx.lineTo(x, bottomY);
				ctx.lineWidth = 1;
				const isDark = chart.canvas.closest('.dark');
				ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)';
				ctx.stroke();
				ctx.restore();
			}
		}
	};

	const data = {
		labels: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
		datasets: [
			{
				label: 'Market Cap',
				data: [500, 700, 1200, 2400, 1800, 950, 1100, 900],
				borderColor: 'rgba(220,38,38,1)', // red-600
				// Gradient background
				backgroundColor: (context: any) => {
					const chart = context.chart;
					const { ctx, chartArea } = chart;
					if (!chartArea) return null;

					const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
					gradient.addColorStop(0, 'rgba(220,38,38,0.4)'); // top (near line) - stronger red
					gradient.addColorStop(1, 'rgba(220,38,38,0)'); // bottom - fully transparent
					return gradient;
				},
				tension: 0.4,
				fill: true,
				pointBackgroundColor: 'rgba(220,38,38,1)',
				pointBorderWidth: 2,
				pointRadius: 0, // hide all points
				pointHoverRadius: 6 // show only on hover
			}
		]
	};

	const lightOptions: any = {
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
				ticks: { color: '#9ca3af' }
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

	const darkOptions: any = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: { display: false },
			tooltip: {
				backgroundColor: '#1f2937',
				titleColor: '#fff',
				bodyColor: '#d1d5db',
				borderColor: '#374151',
				borderWidth: 1,
				padding: 10,
				displayColors: false
			}
		},
		scales: {
			x: {
				grid: { display: false, drawBorder: false },
				ticks: { color: '#9ca3af' }
			},
			y: {
				position: 'right',
				grid: { color: '#111827', drawBorder: false },
				ticks: {
					color: '#9ca3af',
					callback: (val: any) => `₦${val.toLocaleString()}`
				}
			}
		},
		elements: { line: { borderWidth: 2 } }
	};

	onMount(() => {
		if (canvasLight) {
			chartLight = new Chart(canvasLight, {
				type: 'line',
				data,
				options: lightOptions,
				plugins: [crosshairPlugin]
			});
		}

		if (canvasDark) {
			chartDark = new Chart(canvasDark, {
				type: 'line',
				data,
				options: darkOptions,
				plugins: [crosshairPlugin]
			});
		}
	});

	onDestroy(() => {
		chartLight?.destroy();
		chartDark?.destroy();
	});
</script>

<div class="w-full h-full flex flex-col bg-white dark:bg-gray-800 md:p-4">
	<div class="w-full h-[300px] md:h-[400px] lg:h-[450px]">
		{#if !canvasLight || !canvasDark}
			<div
				class="w-full h-full flex items-center justify-center space-x-2 bg-gray-200/20 dark:bg-gray-900/20 rounded-lg"
			>
				<div class="h-3 w-3 bg-gray-500 rounded-full animate-bounce" />
				<div class="h-3 w-3 bg-gray-500 rounded-full animate-bounce [animation-delay:-.3s]" />
				<div class="h-3 w-3 bg-gray-500 rounded-full animate-bounce [animation-delay:-.15s]" />
			</div>
		{/if}

		<!-- light-mode chart -->
		<div class="block dark:hidden w-full h-full">
			<canvas bind:this={canvasLight} />
		</div>

		<!-- dark-mode chart -->
		<div class="hidden dark:block w-full h-full">
			<canvas bind:this={canvasDark} />
		</div>
	</div>
</div>
