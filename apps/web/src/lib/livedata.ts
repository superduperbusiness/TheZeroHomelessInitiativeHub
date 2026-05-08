// ============================================================
// LIVE DATA FEEDS — .gov / .org sources
// ============================================================

export interface LiveFeedResult {
  source: string;
  fetchedAt: string;
  records: Record<string, unknown>[];
  error?: string;
}

// HUD Homeless Data Exchange (HDX)
export async function fetchHUDData(): Promise<LiveFeedResult> {
  try {
    const res = await fetch(
      'https://www.hudexchange.info/resource/5787/2023-ahar-part-1-pit-estimates-of-homelessness-in-the-us/',
      { next: { revalidate: 3600 } }
    );
    return {
      source: 'HUD Exchange',
      fetchedAt: new Date().toISOString(),
      records: [],
      error: res.ok ? undefined : 'Could not fetch HUD data',
    };
  } catch {
    return { source: 'HUD Exchange', fetchedAt: new Date().toISOString(), records: [], error: 'Network error' };
  }
}

// 211 LA API (open shelters/services near location)
export async function fetch211Services(zip: string): Promise<LiveFeedResult> {
  try {
    const res = await fetch(
      `https://api.211la.org/v1/resources?zip=${zip}&category=shelter`,
      { next: { revalidate: 900 } }
    );
    const data = res.ok ? await res.json() : [];
    return {
      source: '211 LA',
      fetchedAt: new Date().toISOString(),
      records: Array.isArray(data) ? data : [],
    };
  } catch {
    return { source: '211 LA', fetchedAt: new Date().toISOString(), records: [], error: 'Network error' };
  }
}

// California HHS Open Data
export async function fetchCAHHSData(): Promise<LiveFeedResult> {
  try {
    const res = await fetch(
      'https://data.chhs.ca.gov/api/3/action/datastore_search?resource_id=e62d3ebb-5b64-46c3-b5aa-d14f6c2a1ce5&limit=100',
      { next: { revalidate: 3600 } }
    );
    const data = res.ok ? await res.json() : {};
    return {
      source: 'CA HHS Open Data',
      fetchedAt: new Date().toISOString(),
      records: data?.result?.records ?? [],
    };
  } catch {
    return { source: 'CA HHS Open Data', fetchedAt: new Date().toISOString(), records: [], error: 'Network error' };
  }
}

// SAMHSA Treatment Locator
export async function fetchSAMHSATreatment(zip: string): Promise<LiveFeedResult> {
  try {
    const res = await fetch(
      `https://findtreatment.samhsa.gov/locator/api/fts?sType=SA&pageSize=20&location=${zip}`,
      { next: { revalidate: 3600 } }
    );
    const data = res.ok ? await res.json() : {};
    return {
      source: 'SAMHSA',
      fetchedAt: new Date().toISOString(),
      records: data?.rows ?? [],
    };
  } catch {
    return { source: 'SAMHSA', fetchedAt: new Date().toISOString(), records: [], error: 'Network error' };
  }
}

// Grants.gov feed
export async function fetchGrants(keyword = 'homeless'): Promise<LiveFeedResult> {
  try {
    const res = await fetch(
      `https://www.grants.gov/grantsws/rest/opportunities/search/`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword, oppStatuses: 'forecasted|posted' }),
        next: { revalidate: 7200 },
      }
    );
    const data = res.ok ? await res.json() : {};
    return {
      source: 'Grants.gov',
      fetchedAt: new Date().toISOString(),
      records: data?.oppHits ?? [],
    };
  } catch {
    return { source: 'Grants.gov', fetchedAt: new Date().toISOString(), records: [], error: 'Network error' };
  }
}

export async function fetchAllLiveData(zip = '90001') {
  const [hud, services, cahhs, samhsa, grants] = await Promise.allSettled([
    fetchHUDData(),
    fetch211Services(zip),
    fetchCAHHSData(),
    fetchSAMHSATreatment(zip),
    fetchGrants(),
  ]);

  return {
    hud: hud.status === 'fulfilled' ? hud.value : null,
    services: services.status === 'fulfilled' ? services.value : null,
    cahhs: cahhs.status === 'fulfilled' ? cahhs.value : null,
    samhsa: samhsa.status === 'fulfilled' ? samhsa.value : null,
    grants: grants.status === 'fulfilled' ? grants.value : null,
  };
}
