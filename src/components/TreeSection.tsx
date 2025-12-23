import React from "react";

export default function TreeSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></span>
        <span className="text-lg font-bold text-white tracking-wide">
          {title}
        </span>
      </div>
      <div className="tree-children mt-3">{children}</div>
    </div>
  );
}
