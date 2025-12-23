import seed from "@/data/comps.seed.json";
import {
  loadTierOverrides,
  saveTierOverrides,
  loadTierVisibility,
  saveTierVisibility,
} from "@/lib/storage";
import type {
  Composition,
  Tier,
  TierOverrides,
  TierVisibility,
} from "@/lib/types";
import { create } from "zustand";

type AppState = {
  comps: Composition[];
  tierVisible: TierVisibility;
  selectedCompId: string | null;
  isAdmin: boolean;

  setTier: (id: string, tier: Tier) => void;
  toggleTierVisible: (tier: Tier) => void;
  openComp: (id: string) => void;
  closeComp: () => void;
  setAdmin: (v: boolean) => void;
};

const DEFAULT_VIS: TierVisibility = {
  S: true,
  A: true,
  B: false,
  C: false,
  D: false,
};

function applyOverrides(
  base: Composition[],
  overrides: TierOverrides
): Composition[] {
  return base.map((c) => {
    const t = overrides[c.id];
    return t ? { ...c, tier: t } : c;
  });
}

export const useAppStore = create<AppState>((set, get) => {
  const overrides = loadTierOverrides();
  const vis = loadTierVisibility() ?? DEFAULT_VIS;

  const base = seed as Composition[];
  const comps = applyOverrides(base, overrides);

  return {
    comps,
    tierVisible: vis,
    selectedCompId: null,
    isAdmin: false,

    setAdmin: (v) => set({ isAdmin: v }),

    setTier: (id, tier) => {
      const next = get().comps.map((c) => (c.id === id ? { ...c, tier } : c));
      set({ comps: next });

      // persist override
      const currentOverrides = loadTierOverrides();
      const updated: TierOverrides = { ...currentOverrides, [id]: tier };
      saveTierOverrides(updated);
    },

    toggleTierVisible: (tier) => {
      const curr = get().tierVisible;
      const next = { ...curr, [tier]: !curr[tier] };
      set({ tierVisible: next });
      saveTierVisibility(next);
    },

    openComp: (id) => set({ selectedCompId: id }),
    closeComp: () => set({ selectedCompId: null }),
  };
});
