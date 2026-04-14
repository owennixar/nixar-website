const META_API_VERSION = "v20.0";
const BASE = `https://graph.facebook.com/${META_API_VERSION}`;

export type InsightsRow = {
  campaign_id?: string;
  campaign_name?: string;
  adset_id?: string;
  adset_name?: string;
  ad_id?: string;
  ad_name?: string;
  date_start: string;
  date_stop: string;
  spend?: string;
  impressions?: string;
  reach?: string;
  clicks?: string;
  unique_clicks?: string;
  ctr?: string;
  cpc?: string;
  cpm?: string;
  frequency?: string;
  actions?: { action_type: string; value: string }[];
  action_values?: { action_type: string; value: string }[];
};

const DEFAULT_FIELDS = [
  "campaign_id", "campaign_name",
  "adset_id", "adset_name",
  "ad_id", "ad_name",
  "date_start", "date_stop",
  "spend", "impressions", "reach", "clicks", "unique_clicks",
  "ctr", "cpc", "cpm", "frequency",
  "actions", "action_values",
].join(",");

export async function fetchAdAccountInsights(opts: {
  adAccountId: string;   // e.g. 'act_123456789'
  accessToken: string;
  since: string;         // 'YYYY-MM-DD'
  until: string;         // 'YYYY-MM-DD'
  level?: "ad" | "adset" | "campaign" | "account";
  fields?: string;
}): Promise<InsightsRow[]> {
  const params = new URLSearchParams({
    fields: opts.fields ?? DEFAULT_FIELDS,
    level: opts.level ?? "ad",
    time_increment: "1",
    time_range: JSON.stringify({ since: opts.since, until: opts.until }),
    access_token: opts.accessToken,
    limit: "500",
  });

  const all: InsightsRow[] = [];
  let next: string | null = `${BASE}/${opts.adAccountId}/insights?${params}`;

  while (next) {
    const res: Response = await fetch(next);
    const json: { data?: InsightsRow[]; paging?: { next?: string } } = await res.json();
    if (!res.ok) {
      throw new Error(`Meta insights error ${res.status}: ${JSON.stringify(json)}`);
    }
    if (Array.isArray(json.data)) all.push(...json.data);
    next = json.paging?.next ?? null;
  }
  return all;
}

export async function fetchCampaigns(opts: { adAccountId: string; accessToken: string }) {
  const params = new URLSearchParams({
    fields: "id,name,objective,status,daily_budget,lifetime_budget,start_time,stop_time",
    access_token: opts.accessToken,
    limit: "200",
  });
  const res = await fetch(`${BASE}/${opts.adAccountId}/campaigns?${params}`);
  const json = await res.json();
  if (!res.ok) throw new Error(`Meta campaigns error ${res.status}: ${JSON.stringify(json)}`);
  return json.data as Array<{
    id: string; name: string; objective?: string; status?: string;
    daily_budget?: string; lifetime_budget?: string; start_time?: string; stop_time?: string;
  }>;
}

function countConversions(rows: { actions?: InsightsRow["actions"] }) {
  if (!rows.actions) return 0;
  const relevant = new Set(["lead", "complete_registration", "purchase", "submit_application"]);
  return rows.actions
    .filter((a) => relevant.has(a.action_type))
    .reduce((sum, a) => sum + Number(a.value || 0), 0);
}

export function mapInsightRow(row: InsightsRow) {
  return {
    campaign_id: row.campaign_id ?? null,
    adset_id: row.adset_id ?? null,
    ad_id: row.ad_id ?? null,
    date_start: row.date_start,
    date_stop: row.date_stop,
    spend: row.spend ? Number(row.spend) : null,
    impressions: row.impressions ? Number(row.impressions) : null,
    reach: row.reach ? Number(row.reach) : null,
    clicks: row.clicks ? Number(row.clicks) : null,
    unique_clicks: row.unique_clicks ? Number(row.unique_clicks) : null,
    ctr: row.ctr ? Number(row.ctr) : null,
    cpc: row.cpc ? Number(row.cpc) : null,
    cpm: row.cpm ? Number(row.cpm) : null,
    frequency: row.frequency ? Number(row.frequency) : null,
    conversions: countConversions(row),
    actions: row.actions ?? null,
    action_values: row.action_values ?? null,
    raw: row,
  };
}
