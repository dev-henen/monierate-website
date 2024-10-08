import { getEndpoint, basicAuth  } from "$lib/helper";
import { json, redirect } from "@sveltejs/kit";
/** @type {import('./$types').RequestHandler} */

export async function GET({ url })
{
    let urlParams = url.searchParams
    const code = urlParams.get('code') || null
    
    let endpoint = getEndpoint(`/currencies/get_all_currencies?page=1&limit=100`);
    if (code != null) {
        endpoint = getEndpoint(`/currencies/get_currency?code=${code.toUpperCase()}`);
    }

    let res = await fetch(
        endpoint,
        basicAuth('GET', {})
    );
    const currencies = (await res.json()).data || {}

    return json(currencies);
}