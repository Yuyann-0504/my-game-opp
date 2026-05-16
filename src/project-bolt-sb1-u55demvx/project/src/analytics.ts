export interface AnalyticsEvent {
  type: "affiliate_click" | "share_click";
  timestamp: number;
  data: Record<string, unknown>;
}

const ANALYTICS_KEY = "game_idea_analytics";
const MAX_EVENTS = 500;

export function logEvent(event: AnalyticsEvent) {
  const events = getEvents();
  events.push(event);

  if (events.length > MAX_EVENTS) {
    events.shift();
  }

  localStorage.setItem(ANALYTICS_KEY, JSON.stringify(events));
  console.log("[Analytics]", event.type, event.data);
}

export function getEvents(): AnalyticsEvent[] {
  try {
    const data = localStorage.getItem(ANALYTICS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getAnalyticsSummary() {
  const events = getEvents();
  const affiliateClicks = events.filter((e) => e.type === "affiliate_click").length;
  const shareClicks = events.filter((e) => e.type === "share_click").length;

  return {
    totalEvents: events.length,
    affiliateClicks,
    shareClicks,
    events,
  };
}

export function trackAffiliateClick(genre: string, bookTitle: string) {
  logEvent({
    type: "affiliate_click",
    timestamp: Date.now(),
    data: { genre, bookTitle },
  });
}

export function trackShareClick(platform: string, genre: string, theme: string, gimmick: string) {
  logEvent({
    type: "share_click",
    timestamp: Date.now(),
    data: { platform, genre, theme, gimmick },
  });
}
