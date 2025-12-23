import CompCard from "./CompCard";
import TreeSection from "./TreeSection";
import { buildTreeSections } from "@/lib/buildTree";
import type { Composition, Tier } from "@/lib/types";
import { useAppStore } from "@/state/useAppStore";

export default function TreeView({ comps }: { comps: Composition[] }) {
  const tierVisible = useAppStore((s) => s.tierVisible);
  const toggleTierVisible = useAppStore((s) => s.toggleTierVisible);

  const sections = buildTreeSections(comps, tierVisible);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-xl font-extrabold">Flowchart</h1>

        {/* filtros de tier visibles (afecta al flow) */}
        <div className="flex bg-white/[0.03] p-1 rounded-xl border border-white/5 overflow-x-auto max-w-full no-scrollbar">
          {(["S", "A", "B", "C", "D"] as Tier[]).map((t) => {
            const isActive = tierVisible[t];
            return (
              <button
                key={t}
                onClick={() => toggleTierVisible(t)}
                className={`
                  px-3 py-1 rounded-lg text-sm font-bold transition-all whitespace-nowrap
                  ${
                    isActive
                      ? "bg-indigo-500/20 text-indigo-300 shadow-[0_0_10px_rgba(99,102,241,0.2)] border border-indigo-500/30"
                      : "text-white/40 hover:text-white/70 hover:bg-white/[0.05]"
                  }
                `}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      <div className="tree-node">ANALIZAR ITEMS</div>

      <div className="tree-children">
        {sections.map((sec) => (
          <TreeSection key={sec.itemizacion} title={sec.label}>
            {sec.groups.map((g) => (
              <TreeSection key={g.key} title={g.label}>
                <div className="flex flex-col gap-3 mt-2">
                  {g.comps.map((c) => (
                    <div key={c.id} className="tree-leaf">
                      <CompCard comp={c} />
                    </div>
                  ))}
                </div>
              </TreeSection>
            ))}
          </TreeSection>
        ))}

        {sections.length === 0 && (
          <div className="mt-3 text-white/60">
            No hay compos visibles con los tiers seleccionados.
          </div>
        )}
      </div>
    </div>
  );
}
