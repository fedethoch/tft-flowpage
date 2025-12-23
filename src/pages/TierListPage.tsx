import TierList from "@/components/TierList";
import { useAppStore } from "@/state/useAppStore";

export default function TierListPage() {
  const comps = useAppStore((s) => s.comps);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <TierList comps={comps} />
    </div>
  );
}
