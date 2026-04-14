export type TrackEvent = {
  visitorId: string;
  type: string;
  path: string;
  referrer?: string;
  ua?: string;
  ts: number;
  props?: Record<string, unknown>;
};

const MAX_EVENTS = 5_000;
const events: TrackEvent[] = [];

export function recordEvent(evt: TrackEvent) {
  events.push(evt);
  if (events.length > MAX_EVENTS) events.shift();
}

export function getRecentEvents(limit = 100): TrackEvent[] {
  return events.slice(-limit);
}

export function eventCount(): number {
  return events.length;
}
