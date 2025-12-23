import type { Composition, Itemizacion, Tier, TreeSection } from "./types";

function sortByTierThenName(a: Composition, b: Composition) {
  const order: Record<Tier, number> = { S: 0, A: 1, B: 2, C: 3, D: 4 };
  const t = order[a.tier] - order[b.tier];
  if (t !== 0) return t;
  return a.name.localeCompare(b.name);
}

export function buildTreeSections(
  comps: Composition[],
  tierVisible: Record<Tier, boolean>
): TreeSection[] {
  const visible = comps.filter((c) => tierVisible[c.tier]);

  const items: Itemizacion[] = ["AD", "AP", "BRUISER"];

  return items
    .map((item) => {
      const itemComps = visible.filter((c) => c.itemizacion === item);

      const hero = itemComps
        .filter((c) => c.heroAugment)
        .slice()
        .sort(sortByTierThenName);

      const reroll = itemComps
        .filter((c) => !c.heroAugment && c.estilo === "REROLL")
        .slice()
        .sort(sortByTierThenName);

      const fast8 = itemComps
        .filter((c) => !c.heroAugment && c.estilo === "FAST8")
        .slice()
        .sort(sortByTierThenName);

      const fast9 = itemComps
        .filter((c) => !c.heroAugment && c.estilo === "FAST9")
        .slice()
        .sort(sortByTierThenName);

      const label =
        item === "AD"
          ? "ITEMS AD (Espada/Arco)"
          : item === "AP"
          ? "ITEMS AP (Vara/Lágrima)"
          : "ITEMS BRUISER (Capa/Cota)";

      const groups = [
        {
          key: "REROLL" as const,
          label: "¿Muchas copias? → Reroll",
          comps: reroll,
        },
        {
          key: "FAST8" as const,
          label: "Partida normal → Fast 8",
          comps: fast8,
        },
        {
          key: "FAST9" as const,
          label: "¿Winstreak + mucho oro? → Fast 9",
          comps: fast9,
        },
        { key: "HERO" as const, label: "Aumento de héroe", comps: hero },
      ].filter((g) => g.comps.length > 0);

      return { itemizacion: item, label, groups };
    })
    .filter((s) => s.groups.length > 0);
}
