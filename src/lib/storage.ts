import type { Tier, TierOverrides, TierVisibility } from "./types";

const KEY_OVERRIDES = "tft_tier_overrides_v1";
const KEY_VIS = "tft_tier_visibility_v1";

export function loadTierOverrides(): TierOverrides {
  try {
    const raw = localStorage.getItem(KEY_OVERRIDES);
    return raw ? (JSON.parse(raw) as TierOverrides) : {};
  } catch {
    return {};
  }
}

export function saveTierOverrides(overrides: TierOverrides) {
  localStorage.setItem(KEY_OVERRIDES, JSON.stringify(overrides));
}

export function loadTierVisibility(): TierVisibility | null {
  try {
    const raw = localStorage.getItem(KEY_VIS);
    return raw ? (JSON.parse(raw) as TierVisibility) : null;
  } catch {
    return null;
  }
}

export function saveTierVisibility(vis: TierVisibility) {
  localStorage.setItem(KEY_VIS, JSON.stringify(vis));
}

export function isTier(x: string): x is Tier {
  return x === "S" || x === "A" || x === "B" || x === "C" || x === "D";
}
