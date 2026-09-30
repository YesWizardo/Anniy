import { describe, it, expect } from "vitest";
import {
  createInitialLoaderState,
  computeNextLoaderTick,
  LoaderState
} from "../rage/machines/loaderMachine.js";

describe("Universal Rage Loader Machine", () => {
  it("initializes in idle status with 0% progress", () => {
    const initial = createInitialLoaderState();
    expect(initial.status).toBe("idle");
    expect(initial.progress).toBe(0);
    expect(initial.displayedPercent).toBe(0);
    expect(initial.bossTriggered).toBe(false);
  });

  it("progresses forward during normal roll", () => {
    const state: LoaderState = {
      status: "loading",
      progress: 20,
      displayedPercent: 20,
      label: "Loading...",
      ticksCount: 1,
      bossTriggered: false
    };

    // Force forward step: roll = 0.9 (above backward probability 0.35 + jump 0.08)
    const result = computeNextLoaderTick(state, undefined, 1.0, () => 0.9);
    expect(result.nextState.progress).toBeGreaterThan(20);
    expect(result.nextState.ticksCount).toBe(2);
  });

  it("regresses backwards when backward roll triggers", () => {
    const state: LoaderState = {
      status: "loading",
      progress: 50,
      displayedPercent: 50,
      label: "Going backwards for quality",
      ticksCount: 5,
      bossTriggered: false
    };

    // Force backward step: roll = 0.20 (within jump 0.08 .. 0.43)
    const result = computeNextLoaderTick(state, undefined, 1.0, () => 0.20);
    expect(result.nextState.progress).toBeLessThan(50);
  });

  it("jumps forward suddenly when jump roll triggers", () => {
    const state: LoaderState = {
      status: "loading",
      progress: 30,
      displayedPercent: 30,
      label: "Sudden hope",
      ticksCount: 3,
      bossTriggered: false
    };

    // Force jump: roll = 0.04 (within 0.08)
    const result = computeNextLoaderTick(state, undefined, 1.0, () => 0.04);
    expect(result.nextState.progress).toBeGreaterThanOrEqual(40);
  });

  it("triggers Boss Bar when progress reaches >= 94%", () => {
    const state: LoaderState = {
      status: "loading",
      progress: 92,
      displayedPercent: 92,
      label: "Almost there...",
      ticksCount: 10,
      bossTriggered: false
    };

    // Forward step of +5 will hit 97% -> triggers boss bar!
    const result = computeNextLoaderTick(state, undefined, 1.0, () => 0.9);
    expect(result.shouldPauseForBoss).toBe(true);
    expect(result.nextState.status).toBe("paused_for_boss");
    expect(result.nextState.bossTriggered).toBe(true);
  });

  it("completes once boss is beaten and progress hits 100", () => {
    const state: LoaderState = {
      status: "loading",
      progress: 98,
      displayedPercent: 98,
      label: "Nearly done...",
      ticksCount: 20,
      bossTriggered: true
    };

    const result = computeNextLoaderTick(state, undefined, 1.0, () => 0.9);
    expect(result.isComplete).toBe(true);
    expect(result.nextState.status).toBe("completed");
    expect(result.nextState.progress).toBe(100);
  });
});
