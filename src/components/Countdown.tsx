import { useEffect, useState } from "react";

export function Countdown({ hours = 5 }: { hours?: number }) {
  const [target] = useState(() => Date.now() + hours * 60 * 60 * 1000);
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target - now);
  const h = String(Math.floor(diff / 3.6e6)).padStart(2, "0");
  const m = String(Math.floor((diff / 6e4) % 60)).padStart(2, "0");
  const s = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");

  return (
    <div className="inline-flex items-center gap-1.5 font-mono text-sm font-bold">
      {[h, m, s].map((v, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span className="px-2 py-1 rounded-md bg-foreground text-background min-w-[2.25rem] text-center tabular-nums">{v}</span>
          {i < 2 && <span className="text-flame">:</span>}
        </span>
      ))}
    </div>
  );
}
