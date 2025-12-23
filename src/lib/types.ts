export type Tier = "S" | "A" | "B" | "C" | "D";
export type Itemizacion = "AD" | "AP" | "BRUISER";
export type Estilo = "REROLL" | "FAST8" | "FAST9";

export type Composition = {
  id: string;
  name: string;

  tier: Tier;
  itemizacion: Itemizacion;
  estilo: Estilo;
  heroAugment: boolean;
  condicion?: string;

  carryImageUrl: string;
  compImageUrl: string;
  bestItemsImageUrl: string[];
  guideUrl: string;
};

export type TierOverrides = Record<string, Tier>;

export type TierVisibility = Record<Tier, boolean>;

export type TreeGroupKey = "REROLL" | "FAST8" | "FAST9" | "HERO";

export type TreeGroup = {
  key: TreeGroupKey;
  label: string;
  comps: Composition[];
};

export type TreeSection = {
  itemizacion: Itemizacion;
  label: string;
  groups: TreeGroup[];
};
