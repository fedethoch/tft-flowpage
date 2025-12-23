import type { Composition } from "../lib/types";
import { useAppStore } from "@/state/useAppStore";
import { useState } from "react";

export default function CompThumb({
  comp,
  onDragStart,
}: {
  comp: Composition;
  onDragStart: (e: React.DragEvent) => void;
}) {
  const [open, setOpen] = useState(false);
  const isAdmin = useAppStore((s) => s.isAdmin);

  return (
    <div
      className={`relative transition-all duration-300 ${
        open ? "basis-full w-full" : "w-auto"
      }`}
    >
      <button
        type="button"
        draggable={isAdmin}
        onDragStart={(e) => {
          if (isAdmin) onDragStart(e);
          else e.preventDefault();
        }}
        onClick={() => setOpen((v) => !v)}
        className={`rounded-2xl border transition hover:border-white/20 ${
          open
            ? "border-white/20 bg-white/[0.06] w-full flex flex-col p-4"
            : "border-white/10 bg-white/[0.03] p-1 hover:bg-white/[0.06]"
        }`}
        title={comp.name}
      >
        {!open ? (
          <img
            src={comp.carryImageUrl}
            alt={comp.name}
            className="h-14 w-14 rounded-xl object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full text-left animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={comp.carryImageUrl}
                alt={comp.name}
                className="h-16 w-16 rounded-2xl object-cover shadow-lg border border-white/10"
              />
              <div>
                <div className="text-xl font-extrabold">{comp.name}</div>
                <div className="text-sm text-white/60 font-medium mt-1">
                  <span className="bg-white/10 px-2 py-0.5 rounded text-white/80 mr-2">
                    Tier {comp.tier}
                  </span>
                  {comp.heroAugment ? "HERO AUGMENT" : comp.estilo}
                  {comp.condicion ? ` · ${comp.condicion}` : ""}
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              <div>
                <div className="text-[10px] uppercase tracking-wider font-bold text-white/50 mb-2">
                  Composición
                </div>
                <img
                  src={comp.compImageUrl}
                  alt="Composición"
                  className="w-full max-h-[435px] object-contain rounded-xl border border-white/10 bg-black/20"
                  loading="lazy"
                />
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-wider font-bold text-white/50 mb-2">
                  Items
                </div>
                <div className="flex flex-wrap gap-3 justify-center">
                  {comp.bestItemsImageUrl.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt={`Item ${i + 1}`}
                      className="h-[200px] w-auto max-w-full rounded-lg bg-white/5 border border-white/10 object-contain"
                      loading="lazy"
                    />
                  ))}
                </div>
              </div>

              <a
                href={comp.guideUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="self-start inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20"
              >
                Ver guía completa
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        )}
      </button>
    </div>
  );
}
