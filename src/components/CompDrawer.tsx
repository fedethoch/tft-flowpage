import type { Composition } from "@/lib/types";
import { useAppStore } from "@/state/useAppStore";

export function CompDrawer({
  compsById,
}: {
  compsById: Record<string, Composition>;
}) {
  const id = useAppStore((s) => s.selectedCompId);
  const close = useAppStore((s) => s.closeComp);

  if (!id) return null;
  const comp = compsById[id];
  if (!comp) return null;

  return (
    <div
      onClick={close}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "420px",
          maxWidth: "92vw",
          height: "100%",
          background: "#0b0b0f",
          borderLeft: "1px solid rgba(255,255,255,0.12)",
          padding: 16,
          overflow: "auto",
        }}
      >
        <div
          style={{ display: "flex", justifyContent: "space-between", gap: 10 }}
        >
          <div>
            <div style={{ fontWeight: 800, fontSize: 18 }}>{comp.name}</div>
            <div style={{ opacity: 0.75, fontSize: 13 }}>
              {comp.itemizacion} ·{" "}
              {comp.heroAugment ? "AUMENTO HÉROE" : comp.estilo} · Tier{" "}
              {comp.tier}
            </div>
          </div>
          <button
            onClick={close}
            style={{ padding: "6px 10px", borderRadius: 10 }}
          >
            Cerrar
          </button>
        </div>

        <div
          style={{
            marginTop: 14,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <img
            src={comp.compImageUrl}
            alt="Composición"
            style={{ width: "100%", borderRadius: 12 }}
          />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {comp.bestItemsImageUrl.map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`Item ${i + 1}`}
                style={{
                  width: "48%",
                  height: "auto",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              />
            ))}
          </div>

          <a
            href={comp.guideUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "block",
              textAlign: "center",
              padding: "10px 12px",
              borderRadius: 12,
              background: "rgba(255,255,255,0.12)",
              color: "inherit",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            Abrir guía
          </a>
        </div>
      </div>
    </div>
  );
}
