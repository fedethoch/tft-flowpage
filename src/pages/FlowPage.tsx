import TreeView from "@/components/TreeView";
import { useAppStore } from "@/state/useAppStore";

export default function FlowPage() {
  const comps = useAppStore((s) => s.comps);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <TreeView comps={comps} />
    </div>
  );
}
