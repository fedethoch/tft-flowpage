import CompThumb from "./CompThumb";
import type { Composition, Tier } from "@/lib/types";
import { useAppStore } from "@/state/useAppStore";
import { useState } from "react";

const tierTheme: Record<
  Tier,
  { label: string; leftBg: string; border: string; glow: string }
> = {
  S: {
    label: "S TIER",
    leftBg: "bg-red-500",
    border: "border-red-500",
    glow: "shadow-[0_0_0_2px_rgba(239,68,68,0.25)]",
  },
  A: {
    label: "A TIER",
    leftBg: "bg-orange-500",
    border: "border-orange-500",
    glow: "shadow-[0_0_0_2px_rgba(249,115,22,0.22)]",
  },
  B: {
    label: "B TIER",
    leftBg: "bg-yellow-400",
    border: "border-yellow-400",
    glow: "shadow-[0_0_0_2px_rgba(250,204,21,0.18)]",
  },
  C: {
    label: "C TIER",
    leftBg: "bg-lime-400",
    border: "border-lime-400",
    glow: "shadow-[0_0_0_2px_rgba(163,230,53,0.18)]",
  },
  D: {
    label: "D TIER",
    leftBg: "bg-emerald-400",
    border: "border-emerald-400",
    glow: "shadow-[0_0_0_2px_rgba(52,211,153,0.18)]",
  },
};

export default function TierRow({
  tier,
  comps,
}: {
  tier: Tier;
  comps: Composition[];
}) {
  const setTier = useAppStore((s) => s.setTier);
  const isAdmin = useAppStore((s) => s.isAdmin);
  const [isOver, setIsOver] = useState(false);

  const theme = tierTheme[tier];

  return (
    <div className="flex gap-3 items-stretch">
      {/* bloque izquierdo */}
      <div
        className={`${theme.leftBg} text-black rounded-2xl w-[90px] flex flex-col items-center justify-center relative overflow-hidden`}
      >
        <div className="text-5xl font-black leading-none">{tier}</div>
        <div className="text-[11px] font-bold opacity-80">{theme.label}</div>
        <div className="absolute inset-0 opacity-10 bg-black" />
      </div>

      {/* contenedor drop */}
      <div
        onDragOver={(e) => {
          if (!isAdmin) return;
          e.preventDefault();
          setIsOver(true);
        }}
        onDragEnter={(e) => {
          if (!isAdmin) return;
          e.preventDefault();
          setIsOver(true);
        }}
        onDragLeave={() => setIsOver(false)}
        onDrop={(e) => {
          if (!isAdmin) return;
          e.preventDefault();
          const id = e.dataTransfer.getData("text/compId");
          if (id) setTier(id, tier);
          setIsOver(false);
        }}
        className={[
          "flex-1 rounded-3xl border-2",
          theme.border,
          "bg-gradient-to-r from-black/40 to-black/10",
          "min-h-[92px] px-4 py-4 flex flex-wrap gap-3 items-start content-start",
          theme.glow,
          isOver ? "brightness-110" : "",
        ].join(" ")}
      >
        {comps.length === 0 ? (
          <div className="text-white/50 text-sm">No hay composiciones</div>
        ) : (
          comps.map((c) => (
            <CompThumb
              key={c.id}
              comp={c}
              onDragStart={(e) => {
                e.dataTransfer.setData("text/compId", c.id);
                e.dataTransfer.effectAllowed = "move";
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}
