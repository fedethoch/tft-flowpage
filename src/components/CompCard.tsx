import type { Composition } from "../lib/types";
import { useState } from "react";

export default function CompCard({ comp }: { comp: Composition }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full max-w-[800px]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group w-full flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-white/[0.03] transition-colors"
      >
        <div className="relative">
          <img
            src={comp.carryImageUrl}
            alt={comp.name}
            className="h-11 w-11 rounded-full object-cover ring-2 ring-white/5 group-hover:ring-white/20 transition-all"
            loading="lazy"
          />
        </div>

        <div className="flex-1 text-left">
          <div className="text-base font-bold leading-tight text-neutral-200 group-hover:text-white transition-colors">
            {comp.name}
          </div>
          <div className="text-xs text-white/40 group-hover:text-white/60 transition-colors mt-0.5">
            <span
              className={`font-semibold ${
                comp.tier === "S" || comp.tier === "A"
                  ? "text-emerald-400"
                  : "text-white/40"
              }`}
            >
              Tier {comp.tier}
            </span>
            {comp.heroAugment ? " · Hero" : ` · ${comp.estilo}`}
          </div>
        </div>

        <div className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-white/40">
          <svg
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </button>

      {open && (
        <div className="mt-3 ml-0 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <div className="grid gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-wider font-bold text-white/50 mb-2">
                Composición
              </div>
              <img
                src={comp.compImageUrl}
                alt="Composición"
                className="w-full max-h-[435px] object-contain rounded-lg bg-white/5 border border-white/10"
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
                    alt={`Items ${i + 1}`}
                    className="h-[160px] w-auto max-w-full rounded-lg bg-white/5 border border-white/10 object-contain"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>

            <a
              href={comp.guideUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-sm font-extrabold hover:bg-white/[0.1] hover:border-white/20 transition"
            >
              Abrir guía
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
