import type { RageEventType } from "@readrage/shared";

export function computeRageEventDelta(events: { type: RageEventType }[]): number {
  let delta = 0;
  for (const ev of events) {
    switch (ev.type) {
      case "loader_started":
        delta += 1;
        break;
      case "loader_regressed":
        delta += 3;
        break;
      case "boss_bar_reset":
        delta += 25;
        break;
      case "wrong_key":
        delta += 5;
        break;
      case "button_vanished":
        delta += 4;
        break;
      case "boss_bar_spawned":
        delta += 2;
        break;
      case "glitch_triggered":
        delta += 2;
        break;
      case "out_of_stock_seen":
        delta += 10;
        break;
      case "support_chat_used":
        delta += 15;
        break;
      default:
        delta += 1;
        break;
    }
  }

  // Section 12 Anti-Cheat: max increment per /events request = 500
  return Math.min(500, delta);
}
