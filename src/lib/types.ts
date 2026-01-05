export type Tier = "S" | "A" | "B" | "C" | "D";
export type Itemizacion = "AD" | "AP" | "BRUISER";
export type Estilo = "REROLL" | "FAST8" | "FAST9";

export type Composition = {
  id: string;
  name: string;
  tier: Tier;
  itemizacion: Itemizacion;
  estilo: Estilo;
  hero: boolean;
  condiciones?: string[];
  open?: string;
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
  opens: TreeOpenGroup[];
};

export type TreeOpenGroup = {
  key: string; // valor del open (o "__default__")
  label: string; // lo que se muestra en el árbol
  comps: Composition[];
};

export type TreeSection = {
  itemizacion: Itemizacion;
  label: string;
  groups: TreeGroup[];
};
