import type { Composition } from "../lib/types";
import { useState, useRef, useEffect } from "react";

export default function CompCard({ comp }: { comp: Composition }) {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Auto-scroll sincronizado
  useEffect(() => {
    if (open && cardRef.current) {
      // 320ms delay para esperar la animación de apertura
      setTimeout(() => {
        cardRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 320);
    }
  }, [open]);

  return (
    <div
      ref={cardRef}
      // scroll-mt-32 para que el navbar no tape el titulo al scrollear
      className="w-full max-w-[900px] scroll-mt-32"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group w-full flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-white/[0.03] transition-colors"
      >
        <div className="relative">
          <img
            src={comp.carryImageUrl}
            alt={comp.name}
            className="h-12 w-12 rounded-full object-cover ring-2 ring-white/10 group-hover:ring-white/30 transition-all shadow-md"
            loading="lazy"
          />
        </div>

        <div className="flex-1 text-left">
          <div className="text-lg font-bold leading-tight text-neutral-200 group-hover:text-white transition-colors">
            {comp.name}
          </div>
          <div className="text-sm text-white/40 group-hover:text-white/60 transition-colors mt-0.5">
            <span
              className={`font-semibold ${
                comp.tier === "S" || comp.tier === "A"
                  ? "text-emerald-400"
                  : "text-white/40"
              }`}
            >
              Tier {comp.tier}
            </span>
            {comp.hero ? " · Hero Augment" : ` · ${comp.estilo}`}
          </div>
        </div>

        <div
          className={`text-white/40 transition-transform duration-300 ${
            open ? "rotate-90 text-white" : "rotate-0"
          }`}
        >
          <svg
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </button>

      {open && (
        <div className="mt-4 ml-2 mr-2 rounded-2xl border border-white/10 bg-white/[0.02] p-5 shadow-inner animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="grid gap-8">
            {/* Tablero Grande */}
            <div>
              <div className="text-xs uppercase tracking-widest font-bold text-white/50 mb-3 ml-1">
                Composición
              </div>
              <div className="w-full rounded-xl border border-white/10 bg-black/40 overflow-hidden">
                <img
                  src={comp.compImageUrl}
                  alt="Composición"
                  className="w-full aspect-[16/10] object-contain"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Items centrados y ancho controlado */}
            <div>
              <div className="text-xs uppercase tracking-widest font-bold text-white/50 mb-3 ml-1">
                Items
              </div>
              <div className="flex flex-col gap-4 w-full items-center">
                {comp.bestItemsImageUrl.map((url, i) => (
                  <div
                    key={i}
                    className="bg-black/20 rounded-lg border border-white/5 p-2 w-full max-w-[800px]"
                  >
                    <img
                      key={i}
                      src={url}
                      alt={`Items ${i + 1}`}
                      className="w-full h-auto object-contain rounded-md"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Texto y condiciones */}
            <div className="bg-white/[0.03] rounded-xl p-4 border border-white/5">
              <div className="text-xs uppercase tracking-widest font-bold text-white/50 mb-3">
                Condiciones
              </div>

              <div className="flex flex-col gap-2 items-start mb-4">
                {comp.condiciones?.map((c, i) => (
                  <div
                    key={i}
                    className="text-sm text-white/80 leading-relaxed"
                  >
                    • {c}
                  </div>
                ))}
              </div>

              <a
                href={comp.guideUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-extrabold hover:bg-white/[0.1] hover:border-white/20 transition text-white"
              >
                Abrir guía externa
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
