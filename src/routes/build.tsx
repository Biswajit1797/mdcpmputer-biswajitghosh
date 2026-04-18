import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Cpu, HardDrive, MemoryStick, Monitor, Package, Sparkles, Zap } from "lucide-react";
import caseImg from "@/assets/case.jpg";
import gpuImg from "@/assets/gpu.jpg";
import cpuImg from "@/assets/cpu.jpg";
import ramImg from "@/assets/ram.jpg";
import ssdImg from "@/assets/ssd.jpg";
import { inr, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/build")({
  head: () => ({
    meta: [
      { title: "Build Your PC — MDCOMPUTERS" },
      { name: "description", content: "Configure your dream gaming PC step by step. Pick case, CPU, GPU, RAM and storage with live pricing." },
      { property: "og:title", content: "Build Your PC — MDCOMPUTERS" },
      { property: "og:description", content: "Configure your dream gaming PC step by step with live pricing." },
    ],
  }),
  component: BuildPage,
});

type Part = { id: string; name: string; brand: string; price: number; specs: string; image: string; tag?: string };
type StepKey = "case" | "cpu" | "gpu" | "ram" | "storage";

const STEPS: { key: StepKey; label: string; icon: typeof Cpu; image: string; options: Part[] }[] = [
  {
    key: "case",
    label: "Case",
    icon: Package,
    image: caseImg,
    options: [
      { id: "case-air", name: "AirFlow Mid Tower", brand: "MDC", price: 5499, specs: "Mesh front · 3 fans · ATX", image: caseImg },
      { id: "case-glass", name: "Phantom Glass RGB", brand: "Phantom", price: 8999, specs: "Tempered glass · ARGB · ATX", image: caseImg, tag: "Popular" },
      { id: "case-pro", name: "Tower Pro XL", brand: "MDC", price: 12999, specs: "E-ATX · 6 fans · vertical GPU", image: caseImg },
    ],
  },
  {
    key: "cpu",
    label: "Processor",
    icon: Cpu,
    image: cpuImg,
    options: [
      { id: "cpu-r5", name: "Ryzen 5 7600X", brand: "AMD", price: 22999, specs: "6C / 12T · 5.3GHz boost", image: cpuImg },
      { id: "cpu-r7", name: "Ryzen 7 7800X3D", brand: "AMD", price: 38999, specs: "8C / 16T · 5.0GHz · 3D V-Cache", image: cpuImg, tag: "Best value" },
      { id: "cpu-r9", name: "Ryzen 9 7950X3D", brand: "AMD", price: 56999, specs: "16C / 32T · 5.7GHz · top tier", image: cpuImg },
    ],
  },
  {
    key: "gpu",
    label: "Graphics",
    icon: Monitor,
    image: gpuImg,
    options: [
      { id: "gpu-4070", name: "RTX 4070 Super", brand: "NVIDIA", price: 64999, specs: "12GB GDDR6X · 1440p king", image: gpuImg },
      { id: "gpu-4080", name: "RTX 4080 Super", brand: "NVIDIA", price: 109999, specs: "16GB GDDR6X · 4K ready", image: gpuImg, tag: "Hot" },
      { id: "gpu-4090", name: "RTX 4090", brand: "NVIDIA", price: 154999, specs: "24GB GDDR6X · ultimate", image: gpuImg },
    ],
  },
  {
    key: "ram",
    label: "Memory",
    icon: MemoryStick,
    image: ramImg,
    options: [
      { id: "ram-16", name: "16GB DDR5 6000MHz", brand: "Phantom", price: 5999, specs: "2x8GB · CL30", image: ramImg },
      { id: "ram-32", name: "32GB DDR5 6000MHz RGB", brand: "Phantom", price: 10999, specs: "2x16GB · CL30 · ARGB", image: ramImg, tag: "Recommended" },
      { id: "ram-64", name: "64GB DDR5 6000MHz", brand: "Phantom", price: 19999, specs: "2x32GB · creator-grade", image: ramImg },
    ],
  },
  {
    key: "storage",
    label: "Storage",
    icon: HardDrive,
    image: ssdImg,
    options: [
      { id: "ssd-1tb", name: "1TB NVMe Gen4 SSD", brand: "MDC", price: 6499, specs: "7,000 MB/s read", image: ssdImg },
      { id: "ssd-2tb", name: "2TB NVMe Gen4 SSD", brand: "MDC", price: 11999, specs: "7,300 MB/s · for libraries", image: ssdImg, tag: "Best for gaming" },
      { id: "ssd-4tb", name: "4TB NVMe Gen5 SSD", brand: "MDC", price: 24999, specs: "12,000 MB/s · pro tier", image: ssdImg },
    ],
  },
];

type Selections = Partial<Record<StepKey, Part>>;

const findPart = (key: StepKey, id: string) => STEPS.find((s) => s.key === key)!.options.find((o) => o.id === id)!;

type Preset = { id: string; name: string; tagline: string; accent: string; picks: Record<StepKey, string> };

const PRESETS: Preset[] = [
  {
    id: "budget",
    name: "Budget Beast",
    tagline: "1080p high-FPS esports",
    accent: "from-emerald-500/20 to-emerald-500/5",
    picks: { case: "case-air", cpu: "cpu-r5", gpu: "gpu-4070", ram: "ram-16", storage: "ssd-1tb" },
  },
  {
    id: "mid",
    name: "Sweet Spot",
    tagline: "1440p ultra · streamer ready",
    accent: "from-flame/30 to-ember/10",
    picks: { case: "case-glass", cpu: "cpu-r7", gpu: "gpu-4080", ram: "ram-32", storage: "ssd-2tb" },
  },
  {
    id: "ultra",
    name: "Ultra Flagship",
    tagline: "4K · creator · no compromise",
    accent: "from-fuchsia-500/25 to-flame/15",
    picks: { case: "case-pro", cpu: "cpu-r9", gpu: "gpu-4090", ram: "ram-64", storage: "ssd-4tb" },
  },
];

function BuildPage() {
  const [step, setStep] = useState(0);
  const [sel, setSel] = useState<Selections>({});
  const { add, setOpen } = useCart();

  const current = STEPS[step];
  const progress = ((step + 1) / STEPS.length) * 100;
  const total = useMemo(() => Object.values(sel).reduce((s, p) => s + (p?.price ?? 0), 0), [sel]);
  const allDone = STEPS.every((s) => sel[s.key]);

  const pick = (p: Part) => {
    setSel((cur) => ({ ...cur, [current.key]: p }));
  };

  const goNext = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));
  const goPrev = () => setStep((s) => Math.max(0, s - 1));

  const addBuildToCart = () => {
    Object.values(sel).forEach((p) => {
      if (!p) return;
      const product: Product = {
        id: p.id,
        name: p.name,
        brand: p.brand,
        price: p.price,
        mrp: Math.round(p.price * 1.15),
        image: p.image,
        category: "GPU",
        rating: 4.8,
        reviews: 100,
        stock: 20,
      };
      add(product, 1);
    });
    setOpen(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 lg:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-flame text-flame-foreground text-[10px] font-black uppercase tracking-wider mb-3">
          <Sparkles className="h-3 w-3" /> PC Builder
        </div>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase leading-none">
          Build your <span className="text-gradient-flame">dream rig.</span>
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">Five steps. Live pricing. Expert assembly in 7 days.</p>
      </div>

      {/* Stepper */}
      <div className="mb-8">
        <div className="h-1.5 rounded-full bg-muted overflow-hidden mb-4">
          <div className="h-full bg-gradient-flame transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <div className="grid grid-cols-5 gap-2">
          {STEPS.map((s, i) => {
            const done = !!sel[s.key];
            const active = i === step;
            return (
              <button
                key={s.key}
                onClick={() => setStep(i)}
                className={`group flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all ${
                  active ? "border-flame bg-flame/5" : done ? "border-success/40" : "border-border"
                }`}
              >
                <div
                  className={`h-9 w-9 rounded-full grid place-items-center transition-colors ${
                    active ? "bg-gradient-flame text-flame-foreground" : done ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {done && !active ? <Check className="h-4 w-4" /> : <s.icon className="h-4 w-4" />}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:block">{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-8">
        {/* Options */}
        <div>
          <div className="mb-5 flex items-center gap-3">
            <current.icon className="h-5 w-5 text-flame" />
            <h2 className="font-display text-2xl font-bold uppercase">Choose your {current.label}</h2>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {current.options.map((p, i) => {
              const picked = sel[current.key]?.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => pick(p)}
                  className={`relative text-left rounded-2xl overflow-hidden border bg-card transition-all hover:-translate-y-1 animate-fade-up ${
                    picked ? "border-flame ring-flame" : "border-border hover:border-flame/60"
                  }`}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  {p.tag && (
                    <span className="absolute top-3 left-3 z-10 px-2 py-1 rounded-full bg-gradient-flame text-flame-foreground text-[10px] font-black uppercase tracking-wider">
                      {p.tag}
                    </span>
                  )}
                  {picked && (
                    <span className="absolute top-3 right-3 z-10 h-7 w-7 rounded-full bg-success text-background grid place-items-center">
                      <Check className="h-4 w-4" />
                    </span>
                  )}
                  <div className="aspect-[4/3] bg-gradient-to-br from-muted to-background overflow-hidden">
                    <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 space-y-1">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">{p.brand}</div>
                    <div className="font-semibold text-sm">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.specs}</div>
                    <div className="font-display text-lg font-bold pt-1">{inr(p.price)}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Nav */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={goPrev}
              disabled={step === 0}
              className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-border text-sm font-bold uppercase tracking-wider disabled:opacity-40 hover:bg-accent transition-colors"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
            {step < STEPS.length - 1 ? (
              <button
                onClick={goNext}
                disabled={!sel[current.key]}
                className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-gradient-flame text-flame-foreground text-sm font-black uppercase tracking-wider disabled:opacity-40 hover:scale-[1.03] transition-transform"
              >
                Next: {STEPS[step + 1].label} <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={addBuildToCart}
                disabled={!allDone}
                className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-gradient-flame text-flame-foreground text-sm font-black uppercase tracking-wider disabled:opacity-40 hover:scale-[1.03] transition-transform animate-glow-pulse"
              >
                Add build to cart <Zap className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Live summary */}
        <aside className="lg:sticky lg:top-20 self-start">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-flame" /> Your Build
            </h3>
            <div className="space-y-3">
              {STEPS.map((s) => {
                const p = sel[s.key];
                return (
                  <div key={s.key} className={`flex items-center gap-3 p-2 rounded-xl ${p ? "bg-muted/50" : "border border-dashed border-border"}`}>
                    <div className={`h-9 w-9 rounded-lg grid place-items-center shrink-0 ${p ? "bg-gradient-flame text-flame-foreground" : "bg-muted text-muted-foreground"}`}>
                      <s.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">{s.label}</div>
                      <div className="text-xs font-semibold truncate">{p?.name ?? "Not selected"}</div>
                    </div>
                    <div className="text-xs font-bold tabular-nums">{p ? inr(p.price) : "—"}</div>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 pt-4 border-t border-border">
              <div className="flex items-baseline justify-between">
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Total</span>
                <span className="font-display text-3xl font-bold text-gradient-flame tabular-nums">{inr(total)}</span>
              </div>
              <div className="text-[11px] text-muted-foreground mt-1">+ free expert assembly · 1-yr warranty</div>
            </div>
            <button
              onClick={addBuildToCart}
              disabled={!allDone}
              className="w-full mt-4 h-12 rounded-xl bg-gradient-flame text-flame-foreground font-black uppercase text-sm tracking-wider disabled:opacity-40 hover:scale-[1.02] transition-transform"
            >
              {allDone ? "Add full build to cart" : `Pick ${STEPS.filter((s) => !sel[s.key]).length} more parts`}
            </button>
            <Link to="/shop" className="block text-center text-xs text-muted-foreground hover:text-flame mt-3">
              Or shop individual parts →
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
