import { describe, it, expect } from "vitest";
import {
  createInitialBossBarState,
  handleBossBarKeyPress,
  checkBossBarIdleReset,
  getBannerForAcceptedKey
} from "../rage/machines/bossBarMachine.js";

describe("Boss Bar State Machine", () => {
  it("inverts ShiftLeft and ShiftRight labels in banners", () => {
    const leftBanner = getBannerForAcceptedKey("ShiftLeft", true);
    expect(leftBanner.banner).toBe("NOW PRESS: RIGHT SHIFT");

    const rightBanner = getBannerForAcceptedKey("ShiftRight", true);
    expect(rightBanner.banner).toBe("NOW PRESS: LEFT SHIFT");

    const spaceBanner = getBannerForAcceptedKey("Space", true);
    expect(spaceBanner.banner).toBe("NOW PRESS: SPACE");
  });

  it("ignores held key repeats (event.repeat = true)", () => {
    const state = createInitialBossBarState(100);
    const result = handleBossBarKeyPress(state, state.currentAcceptedCode, true);
    expect(result.eventType).toBe("ignored_repeat");
    expect(result.nextState.validPresses).toBe(0);
    expect(result.nextState.progress).toBe(0);
  });

  it("accepts valid key presses and advances progress", () => {
    let state = createInitialBossBarState(100);
    const accepted = state.currentAcceptedCode;

    const result = handleBossBarKeyPress(state, accepted, false, Date.now());
    expect(result.eventType).toBe("valid_press");
    expect(result.nextState.validPresses).toBe(1);
    expect(result.nextState.progress).toBe(1);
    expect(result.nextState.lastValidPressTimestamp).not.toBeNull();
  });

  it("applies a 10% penalty for wrong keys", () => {
    let state = createInitialBossBarState(100);
    state.progress = 25;
    state.validPresses = 25;
    state.currentAcceptedCode = "Space";

    // Press wrong key: ShiftRight
    const result = handleBossBarKeyPress(state, "ShiftRight", false);
    expect(result.eventType).toBe("wrong_key");
    expect(result.nextState.progress).toBe(15); // 25 - 10
    expect(result.nextState.wrongKeyCount).toBe(1);
  });

  it("resets progress to 0% after 650ms idle timeout", () => {
    const state = createInitialBossBarState(100);
    state.progress = 45;
    state.validPresses = 45;
    const now = 1000000;
    state.lastValidPressTimestamp = now;

    // Within idle window (600ms elapsed) -> no reset
    const check1 = checkBossBarIdleReset(state, now + 600);
    expect(check1.didReset).toBe(false);
    expect(check1.nextState.progress).toBe(45);

    // Beyond idle window (700ms elapsed > 650ms) -> RESET TO 0!
    const check2 = checkBossBarIdleReset(state, now + 700);
    expect(check2.didReset).toBe(true);
    expect(check2.nextState.progress).toBe(0);
    expect(check2.nextState.validPresses).toBe(0);
    expect(check2.nextState.resetCount).toBe(1);
  });

  it("completes when reaching 100%", () => {
    let state = createInitialBossBarState(10); // 10 presses for quick completion test
    state.currentAcceptedCode = "Space";
    state.progress = 90;
    state.validPresses = 9;

    const result = handleBossBarKeyPress(state, "Space", false, Date.now());
    expect(result.eventType).toBe("boss_completed");
    expect(result.nextState.status).toBe("completed");
    expect(result.nextState.progress).toBe(100);
  });
});
