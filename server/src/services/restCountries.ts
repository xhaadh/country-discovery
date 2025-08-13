import axios from "axios";
import { cache } from "../utils/cache";

const BASE = "https://restcountries.com/v3.1";

export const DEFAULT_FIELDS = [
  "name",
  "cca3",
  "flags",
  "region",
  "subregion",
  "capital",
  "timezones",
  "population",
  "area",
  "latlng"
].slice(0, 10).join(",");

export async function fetchAllCountries(fields?: string) {
  const f = (fields && fields.length) ? fields : DEFAULT_FIELDS;
  const cacheKey = `all:${f}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached as any;

  const url = `${BASE}/all?fields=${encodeURIComponent(f)}`;
  const res = await axios.get(url, { timeout: 15000 });
  cache.set(cacheKey, res.data);
  return res.data;
}

export async function fetchCountryByCode(code: string) {
  const key = `code:${code.toUpperCase()}`;
  const cached = cache.get(key);
  if (cached) return cached as any;
  const url = `${BASE}/alpha/${encodeURIComponent(code)}`;
  const res = await axios.get(url, { timeout: 15000 });
  const item = Array.isArray(res.data) ? res.data[0] : res.data;
  cache.set(key, item);
  return item;
}

export async function searchCountries(opts: {
  name?: string;
  capital?: string;
  region?: string;
  timezone?: string;
  page?: number;
  limit?: number;
  fields?: string;
}) {
  const fields = opts.fields || DEFAULT_FIELDS;
  const all = await fetchAllCountries(fields);

  let list = all as any[];
  const query = opts.name ? opts.name.toLowerCase() : '';

  if (query) {
    list = list.filter((c) => 
      (c.name?.common?.toLowerCase().includes(query) || 
       c.name?.official?.toLowerCase().includes(query) ||
       (c.capital || []).some((cap: string) => cap.toLowerCase().includes(query)))
    );
  }

  if (opts.capital) {
    const q = opts.capital.toLowerCase();
    list = list.filter((c) => (c.capital || []).some((cap: string) => cap.toLowerCase().includes(q)));
  }

  if (opts.region) {
    const q = opts.region.toLowerCase();
    list = list.filter((c) => (c.region || "").toLowerCase() === q);
  }

  if (opts.timezone) {
    const q = opts.timezone.toLowerCase();
    list = list.filter((c) => (c.timezones || []).some((tz: string) => tz.toLowerCase().includes(q)));
  }

  const page = Math.max(1, opts.page ? opts.page : 1);
  const limit = Math.max(1, opts.limit ? Math.min(opts.limit, 250) : 20);
  const start = (page - 1) * limit;
  const items = list.slice(start, start + limit);

  return { total: list.length, page, limit, items };
}
