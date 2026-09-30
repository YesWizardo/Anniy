import { describe, it, expect } from "vitest";
import {
  createInitialActiveGlitches,
  pickNavigationGlitchBurst,
  pickRandomGlitchType,
  getNextRandomGlitchDelay
} from "../rage/machines/glitchScheduler.js";

describe("Glitch Scheduler Machine", () => {
  it("initializes with all glitches disabled", () => {
    const glitches = createInitialActiveGlitches();
    expect(glitches.rgbSplit).toBe(false);
    expect(glitches.sliceDisplacement).toBe(false);
    expect(glitches.textScramble).toBe(false);
    expect(glitches.layoutJitter).toBe(false);
    expect(glitches.fakeCursor).toBe(false);
    expect(glitches.fakeCrash).toBe(false);
  });

  it("schedules post-navigation glitch burst between 4s and 12s", () => {
    const burst = pickNavigationGlitchBurst(false);
    expect(burst.durationMs).toBeGreaterThanOrEqual(4000);
    expect(burst.durationMs).toBeLessThanOrEqual(12000);
    expect(burst.activeGlitches.rgbSplit).toBe(true);
    expect(burst.activeGlitches.textScramble).toBe(true);
  });

  it("respects reduced-motion preferences by turning off heavy motion glitches", () => {
    const burst = pickNavigationGlitchBurst(true);
    expect(burst.activeGlitches.sliceDisplacement).toBe(false);
    expect(burst.activeGlitches.layoutJitter).toBe(false);
    expect(burst.activeGlitches.screenInversion).toBe(false);
    expect(burst.activeGlitches.scrollJump).toBe(false);
  });

  it("picks random glitch types from the 12 supported types", () => {
    const type = pickRandomGlitchType();
    const valid = [
      "rgb_split", "slice_displacement", "text_scramble", "layout_jitter",
      "fake_cursor", "random_font_swap", "scanline_noise", "duplicate_ghost",
      "fake_crash", "screen_inversion", "button_swap", "scroll_jump"
    ];
    expect(valid).toContain(type);
  });

  it("schedules random glitch intervals between 20s and 60s", () => {
    const delay = getNextRandomGlitchDelay();
    expect(delay).toBeGreaterThanOrEqual(20000);
    expect(delay).toBeLessThanOrEqual(60000);
  });
});
