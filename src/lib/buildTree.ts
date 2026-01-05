import type {
  Composition,
  Itemizacion,
  Tier,
  TreeSection,
  TreeOpenGroup,
} from "./types";

function sortByTierThenName(a: Composition, b: Composition) {
  const order: Record<Tier, number> = { S: 0, A: 1, B: 2, C: 3, D: 4 };
  const t = order[a.tier] - order[b.tier];
  if (t !== 0) return t;
  return a.name.localeCompare(b.name);
}

function groupByOpen(comps: Composition[]): TreeOpenGroup[] {
  const map = new Map<string, Composition[]>();

  for (const c of comps) {
    const raw = (c.open ?? "").trim();
    const key = raw.length ? raw : "__default__";
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(c);
  }

  const opens: TreeOpenGroup[] = Array.from(map.entries()).map(([key, arr]) => {
    arr.sort(sortByTierThenName);
    return {
      key,
      label: key === "__default__" ? "Open estándar" : key,
      comps: arr,
    };
  });

  // orden: primero los que tienen open real, último el default
  opens.sort((a, b) => {
    if (a.key === "__default__" && b.key !== "__default__") return 1;
    if (b.key === "__default__" && a.key !== "__default__") return -1;
    return a.label.localeCompare(b.label);
  });

  return opens.filter((o) => o.comps.length > 0);
}

export function buildTreeSections(
  comps: Composition[],
  tierVisible: Record<Tier, boolean>
): TreeSection[] {
  const visible = comps.filter((c) => tierVisible[c.tier]);

  const items: Itemizacion[] = ["AD", "AP", "BRUISER"];

  const itemLabels: Record<Itemizacion, string> = {
    AD: "ITEMS AD (Espada/Arco) → CAMINO AD",
    AP: "ITEMS AP (Vara/Lágrima) → CAMINO AP",
    BRUISER: "ITEMS BRUISER (Capa/Cota) → CAMINO BRUISER",
  };

  return items
    .map((item) => {
      const byItem = visible.filter((c) => c.itemizacion === item);

      const hero = byItem.filter((c) => c.hero);
      const nonHero = byItem.filter((c) => !c.hero);

      const reroll = nonHero.filter((c) => c.estilo === "REROLL");
      const fast8 = nonHero.filter((c) => c.estilo === "FAST8");
      const fast9 = nonHero.filter((c) => c.estilo === "FAST9");

      const groups = [
        {
          key: "REROLL" as const,
          label: "¿Muchas copias? → Reroll",
          opens: groupByOpen(reroll),
        },
        {
          key: "FAST8" as const,
          label: "Partida normal → Fast 8",
          opens: groupByOpen(fast8),
        },
        {
          key: "FAST9" as const,
          label: "¿Winstreak + mucho oro? → Fast 9",
          opens: groupByOpen(fast9),
        },
        {
          key: "HERO" as const,
          label: "Aumento de héroe",
          opens: groupByOpen(hero),
        },
      ].filter((g) => g.opens.length > 0);

      return {
        itemizacion: item,
        label: itemLabels[item],
        groups,
      };
    })
    .filter((s) => s.groups.length > 0);
}
