import TierRow from "./TierRow";
import type { Composition, Tier } from "@/lib/types";
import { useAppStore } from "@/state/useAppStore";

const TIERS: Tier[] = ["S", "A", "B", "C"];

export default function TierList({ comps }: { comps: Composition[] }) {
  const isAdmin = useAppStore((s) => s.isAdmin);
  const setAdmin = useAppStore((s) => s.setAdmin);
  const resetTiers = useAppStore((s) => s.resetTiers);

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

  const handleReset = () => {
    if (
      window.confirm(
        "¿Estás seguro de resetear la Tier List a los valores originales? Se perderán todos los cambios guardados."
      )
    ) {
      resetTiers();
    }
  };

  const grouped = TIERS.reduce<Record<Tier, Composition[]>>((acc, t) => {
    acc[t] = [];
    return acc;
  }, {} as Record<Tier, Composition[]>);

  // Filtramos por seguridad por si quedan datos sucios con tier D
  for (const c of comps) {
    if (grouped[c.tier]) {
      grouped[c.tier].push(c);
    }
  }

  // orden interno
  for (const t of TIERS) {
    grouped[t].sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold">Tier List</h1>

        <div className="flex items-center gap-2">
          {isAdmin && (
            <button
              onClick={handleReset}
              className="text-xs px-3 py-1 rounded-lg border border-red-500/50 bg-red-500/10 text-red-400 font-bold hover:bg-red-500/20 transition-colors"
            >
              Resetear a Fábrica
            </button>
          )}

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
      </div>

      <div className="flex flex-col gap-3">
        {TIERS.map((t) => (
          <TierRow key={t} tier={t} comps={grouped[t]} />
        ))}
      </div>
    </div>
  );
}
