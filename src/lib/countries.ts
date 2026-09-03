const API = "https://api.restcountries.com/countries/v5";

const PAGE = 100;
const MAX_PAGES = 10;

const REVALIDATE = 60 * 60 * 24 * 7;

export type Country = {
  name: string;
  code: string;
  flag: string;
};

type ApiCountry = {
  names?: { common?: string; official?: string };
  codes?: { alpha_2?: string };
  flag?: { emoji?: string };
};

type ApiResponse = {
  data?: {
    objects?: ApiCountry[];
    meta?: { more?: boolean; offset?: number; count?: number };
  };
};

async function page(offset: number, key: string): Promise<ApiResponse["data"]> {
  const res = await fetch(`${API}?limit=${PAGE}&offset=${offset}`, {
    headers: { Authorization: `Bearer ${key}` },
    next: { revalidate: REVALIDATE },
  });
  if (!res.ok)
    throw new Error(`restcountries ${res.status} at offset ${offset}`);
  const json: ApiResponse = await res.json();
  return json.data;
}

export async function getCountries(): Promise<Country[]> {
  const key = process.env.COUNTRIES_API_KEY;
  if (!key) {
    return [];
  }

  try {
    const seen = new Set<string>();
    const out: Country[] = [];

    for (let i = 0, offset = 0; i < MAX_PAGES; i++) {
      const data = await page(offset, key);
      const objects = data?.objects ?? [];

      for (const c of objects) {
        const name = c.names?.common?.trim();
        if (!name || seen.has(name)) continue;
        seen.add(name);
        out.push({
          name,
          code: c.codes?.alpha_2?.trim() ?? "",
          flag: c.flag?.emoji?.trim() ?? "",
        });
      }

      if (!data?.meta?.more || objects.length === 0) break;
      offset += objects.length;
    }

    return out.sort((a, b) => a.name.localeCompare(b.name));
  } catch (err) {
    console.warn("[countries] falling back to a free-text country field:", err);
    return [];
  }
}
