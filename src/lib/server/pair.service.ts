import { getEndpoint } from "$lib/helper";
import { basicAuth } from "./utilities";

export enum ChangerServiceCategory {
  Remittance = 'remittance', // sending
  Crypto = 'crypto', // buying & selling
  Card = 'card', // virtual card
  Account = 'account', // usd account
  Ramp = 'ramp', // for buy and sell
  VCard = 'card', // for fund virtual card
}

export const get_pairs = async (code: string | null = null) => {
  let endpoint = getEndpoint(`/pairs/get_all_pairs?page=1`);
  if (code != null) {
    endpoint = getEndpoint(`/pairs/get_pair?code=${code}`);
  }

  let res = await fetch(
    endpoint,
    basicAuth('GET', {}),
  );
  const pair = (await res.json()).data || {};

  if (pair.result) {
    return pair.result;
  }

  return pair;
}

export const get_pairs_changers = async (
  code: string,
  changer_service: string = 'all',
) => {

  let endpoint = getEndpoint(`/pairs/get_pair_changers?code=${code}`);
  if (Object.values(ChangerServiceCategory).includes(changer_service as ChangerServiceCategory)) {
    endpoint = getEndpoint(`/pairs/get_pair_changers?code=${code}&changer_service=${changer_service}`);
  }

  let res = await fetch(
    endpoint,
    basicAuth('GET', {}),
  );
  const pair = (await res.json()).data || {};

  if (pair.result) {
    return pair.result;
  }

  return pair;
}