<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Adverts from '$data/adverts.json';

	export let name: keyof typeof Adverts;
	export let width: string | null = null;
	export let height: string | null = null;
	export let interval: number = 8000;
	export let mobileOnly: boolean = false;
	export let showLabel: boolean = false;

	let banners: any[] = [];
	let current = 0;
	let timer: any;

	const raw = Adverts[name];
	const notFound = !(name in Adverts);

	function isValid(ad: any) {
		return ad && ad.image && !ad.disabled;
	}

	if (Array.isArray(raw)) {
		banners = raw.filter(isValid);
	} else if (isValid(raw)) {
		banners = [raw];
	}

	if (banners.length > 1) {
		current = Math.floor(Math.random() * banners.length);
	}

	const rotate = () => {
		if (banners.length > 1) {
			timer = setInterval(() => {
				current = (current + 1) % banners.length;
			}, interval);
		}
	};

	onMount(rotate);
	onDestroy(() => timer && clearInterval(timer));

	const getExtension = (url: string) => url.split('.').pop() ?? 'png';
	const replaceExt = (url: string, ext: string) => url.replace(/\.\w+$/, `.${ext}`);
</script>

<div class={mobileOnly ? 'md:hidden' : ''}>
	{#if banners.length > 0}
		{#key current}
			<div class="container {banners[current].mobile_only ? 'md:hidden' : ''} text-center">
				{#if banners[current].url}
					<a
						href={banners[current].url}
						target="_blank"
						class="inline-block text-center {showLabel
							? 'inline-block max-w-full relative text-center bg-gray-50 dark:bg-gray-900/10 p-4 rounded-md text-black dark:text-white'
							: ''}"
					>
						{#if showLabel}
							<span
								class="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-50 dark:bg-gray-900/10 px-2 py-1 font-semibold text-xs rounded"
								>Partner Display</span
							>
						{/if}
						<picture>
							{#each banners[current].formats ?? [getExtension(banners[current].image)] as format}
								<source
									srcset="{replaceExt(banners[current].image, format)}?v={banners[current]._v}"
									type="image/{format}"
								/>
							{/each}
							<img
								src="{replaceExt(
									banners[current].image,
									(banners[current].formats ?? [getExtension(banners[current].image)]).at(-1)
								)}?v={banners[current]._v}"
								alt={banners[current].label ?? 'Advertisement'}
								style="width: {width ?? banners[current].width ?? '800px'}; height: {height ??
									banners[current].height ??
									'99px'};"
								class="w-full"
							/>
						</picture>
					</a>
				{:else}
					<picture>
						{#each banners[current].formats ?? [getExtension(banners[current].image)] as format}
							<source
								srcset="{replaceExt(banners[current].image, format)}?v={banners[current]._v}"
								type="image/{format}"
							/>
						{/each}
						<img
							src="{replaceExt(
								banners[current].image,
								(banners[current].formats ?? [getExtension(banners[current].image)]).at(-1)
							)}?v={banners[current]._v}"
							alt={banners[current].label ?? 'Advertisement'}
							style="width: {width ?? banners[current].width ?? '800px'}; height: {height ??
								banners[current].height ??
								'99px'};"
							class="mx-auto max-w-full"
						/>
					</picture>
				{/if}
			</div>
		{/key}
	{:else if notFound}
		<div class="text-center text-red-600 text-sm italic">Advert “{name}” not found.</div>
	{:else}
		<div class="text-center text-yellow-500 text-sm italic">No valid adverts for “{name}”.</div>
	{/if}
</div>
