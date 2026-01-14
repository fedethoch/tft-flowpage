import type { Composition } from "../lib/types";
import { useAppStore } from "@/state/useAppStore";
import { useEffect, useRef } from "react";

export default function CompThumb({
  comp,
  onDragStart,
}: {
  comp: Composition;
  onDragStart: (e: React.DragEvent) => void;
}) {
  const selectedCompId = useAppStore((s) => s.selectedCompId);
  const openComp = useAppStore((s) => s.openComp);
  const closeComp = useAppStore((s) => s.closeComp);
  const isAdmin = useAppStore((s) => s.isAdmin);

  const open = selectedCompId === comp.id;
  const cardRef = useRef<HTMLDivElement>(null);

  // Auto-scroll sincronizado
  useEffect(() => {
    if (open && cardRef.current) {
      // Esperamos 320ms (un poco más que el duration-300 del CSS)
      // para asegurar que el DOM terminó de crecer antes de scrollear.
      setTimeout(() => {
        cardRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start", // Alinea al principio
        });
      }, 320);
    }
  }, [open]);

  return (
    <div
      ref={cardRef}
      // scroll-mt-32: margen de seguridad superior para el Navbar sticky
      className={`relative transition-all duration-300 scroll-mt-32 ${
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
        onClick={() => (open ? closeComp() : openComp(comp.id))}
        className={`rounded-2xl border transition hover:border-white/20 ${
          open
            ? "border-white/20 bg-white/[0.06] w-full flex flex-col p-5"
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
          <div className="w-full text-left animate-in fade-in slide-in-from-top-2 duration-300 cursor-default">
            {/* Cabecera */}
            <div
              className="flex items-center gap-4 mb-6 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                closeComp();
              }}
            >
              <img
                src={comp.carryImageUrl}
                alt={comp.name}
                className="h-20 w-20 rounded-2xl object-cover shadow-lg border border-white/10"
              />
              <div>
                <div className="text-2xl font-extrabold text-white">
                  {comp.name}
                </div>
                <div className="text-base text-white/60 font-medium mt-1">
                  <span className="bg-white/10 px-2 py-0.5 rounded text-white/90 mr-2 border border-white/5">
                    Tier {comp.tier}
                  </span>
                  {comp.hero ? "HERO AUGMENT" : comp.estilo}
                  {comp.condiciones?.length ? ` · ${comp.condiciones[0]}` : ""}
                </div>
              </div>
            </div>

            <div className="grid gap-8">
              {/* Sección Tablero */}
              <div>
                <div className="text-xs uppercase tracking-widest font-bold text-white/50 mb-3 ml-1">
                  Posicionamiento
                </div>
                <div className="w-full rounded-2xl border border-white/10 bg-black/40 overflow-hidden shadow-2xl">
                  <img
                    src={comp.compImageUrl}
                    alt="Composición"
                    className="w-full aspect-[16/10] object-contain"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Sección Items: Columna centrada */}
              <div>
                <div className="text-xs uppercase tracking-widest font-bold text-white/50 mb-3 ml-1">
                  Itemización Prioritaria
                </div>
                <div className="flex flex-col gap-4 w-full items-center">
                  {comp.bestItemsImageUrl.map((url, i) => (
                    <div
                      key={i}
                      className="bg-black/20 rounded-xl border border-white/5 p-2 w-full max-w-[750px]"
                    >
                      <img
                        src={url}
                        alt={`Item Set ${i + 1}`}
                        className="w-full h-auto object-contain rounded-lg"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Condiciones y Botón */}
              <div className="bg-black/20 rounded-2xl p-5 border border-white/5">
                <div className="text-xs uppercase tracking-widest font-bold text-white/50 mb-3">
                  Condiciones de Victoria
                </div>

                <div className="flex flex-col gap-2 items-start mb-6">
                  {comp.condiciones?.map((c, i) => (
                    <div
                      key={i}
                      className="flex gap-3 text-base text-white/80 leading-relaxed"
                    >
                      <span className="text-indigo-400 font-bold text-lg leading-none mt-1">
                        •
                      </span>
                      {c}
                    </div>
                  ))}
                </div>

                <a
                  href={comp.guideUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-full sm:w-auto inline-flex justify-center items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-6 py-3 text-base font-bold text-white transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
                >
                  Ver guía detallada en MetaTFT
                  <svg
                    className="w-5 h-5"
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
          </div>
        )}
      </button>
    </div>
  );
}
