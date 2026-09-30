import { RAGE_CONFIG } from "@readrage/shared";

export type GlitchType =
  | "rgb_split"
  | "slice_displacement"
  | "text_scramble"
  | "layout_jitter"
  | "fake_cursor"
  | "random_font_swap"
  | "scanline_noise"
  | "duplicate_ghost"
  | "fake_crash"
  | "screen_inversion"
  | "button_swap"
  | "scroll_jump";

export interface ActiveGlitches {
  rgbSplit: boolean;
  sliceDisplacement: boolean;
  textScramble: boolean;
  layoutJitter: boolean;
  fakeCursor: boolean;
  randomFontSwap: boolean;
  scanlineNoise: boolean;
  duplicateGhost: boolean;
  fakeCrash: boolean;
  screenInversion: boolean;
  buttonSwap: boolean;
  scrollJump: boolean;
}

export function createInitialActiveGlitches(): ActiveGlitches {
  return {
    rgbSplit: false,
    sliceDisplacement: false,
    textScramble: false,
    layoutJitter: false,
    fakeCursor: false,
    randomFontSwap: false,
    scanlineNoise: false,
    duplicateGhost: false,
    fakeCrash: false,
    screenInversion: false,
    buttonSwap: false,
    scrollJump: false
  };
}

export function pickNavigationGlitchBurst(
  reducedMotion = false,
  randomFn = Math.random
): { activeGlitches: ActiveGlitches; durationMs: number } {
  const minMs = RAGE_CONFIG.glitch.afterNavigationMinMs;
  const maxMs = RAGE_CONFIG.glitch.afterNavigationMaxMs;
  const durationMs = Math.round(minMs + randomFn() * (maxMs - minMs));

  // Activate a curated subset for post-navigation burst
  return {
    activeGlitches: {
      rgbSplit: true,
      sliceDisplacement: !reducedMotion,
      textScramble: true,
      layoutJitter: !reducedMotion,
      fakeCursor: true,
      randomFontSwap: true,
      scanlineNoise: true,
      duplicateGhost: randomFn() < 0.6,
      fakeCrash: randomFn() < 0.35, // short fake crash max 1.2s
      screenInversion: !reducedMotion && randomFn() < 0.4,
      buttonSwap: randomFn() < 0.5,
      scrollJump: !reducedMotion && randomFn() < 0.3
    },
    durationMs
  };
}

export function pickRandomGlitchType(randomFn = Math.random): GlitchType {
  const types: GlitchType[] = [
    "rgb_split",
    "slice_displacement",
    "text_scramble",
    "layout_jitter",
    "fake_cursor",
    "random_font_swap",
    "scanline_noise",
    "duplicate_ghost",
    "fake_crash",
    "screen_inversion",
    "button_swap",
    "scroll_jump"
  ];
  return types[Math.floor(randomFn() * types.length)];
}

export function getNextRandomGlitchDelay(randomFn = Math.random): number {
  const min = RAGE_CONFIG.glitch.randomIntervalMinMs;
  const max = RAGE_CONFIG.glitch.randomIntervalMaxMs;
  return Math.round(min + randomFn() * (max - min));
}
