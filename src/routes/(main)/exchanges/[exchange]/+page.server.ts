import type { PageServerLoad } from './$types';
import currencies from '$data/currencies.json';

export const load: PageServerLoad = ({ params }: { params: { exchange: string } }) => {
    const { exchange } = params;
    const allCurrencies = {...currencies.fiat, ...currencies.coins} as Record<string, string>;

    return { exchange, currencies: allCurrencies };
};