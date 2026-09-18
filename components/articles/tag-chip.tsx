export function TagChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-hazard/40 bg-hazard/10 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wide text-hazard">
      {label}
    </span>
  );
}
