import TierRow from "./TierRow";
import type { Composition, Tier } from "@/lib/types";
import { useAppStore } from "@/state/useAppStore";

const TIERS: Tier[] = ["S", "A", "B", "C", "D"];

export default function TierList({ comps }: { comps: Composition[] }) {
  const isAdmin = useAppStore((s) => s.isAdmin);
  const setAdmin = useAppStore((s) => s.setAdmin);

  const handleAdminToggle = () => {
    if (isAdmin) {
      setAdmin(false);
      return;
    }
    const code = prompt("Ingrese código de administrador:");
    if (code === "1234") {
      setAdmin(true);
    } else if (code !== null) {
      alert("Código incorrecto");
    }
  };

  const grouped = TIERS.reduce<Record<Tier, Composition[]>>((acc, t) => {
    acc[t] = [];
    return acc;
  }, {} as Record<Tier, Composition[]>);
  // ... rest of logic unchanged ...
  // Need to update the return statement next

  for (const c of comps) grouped[c.tier].push(c);

  // orden interno (opcional)
  for (const t of TIERS) {
    grouped[t].sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold">Tier List</h1>
        <button
          onClick={handleAdminToggle}
          className={`text-xs px-3 py-1 rounded-lg border transition-colors ${
            isAdmin
              ? "border-green-500/50 bg-green-500/10 text-green-400 font-bold"
              : "border-white/10 bg-white/5 text-white/40 hover:bg-white/10"
          }`}
        >
          {isAdmin ? "Modo Edición: ON" : "Modo Edición: OFF"}
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {TIERS.map((t) => (
          <TierRow key={t} tier={t} comps={grouped[t]} />
        ))}
      </div>
    </div>
  );
}
