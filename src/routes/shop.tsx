import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import { useState } from "react";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — MDCOMPUTERS" },
      { name: "description", content: "Browse premium gaming GPUs, CPUs, monitors and peripherals." },
      { property: "og:title", content: "Shop — MDCOMPUTERS" },
      { property: "og:description", content: "Browse premium gaming GPUs, CPUs, monitors and peripherals." },
    ],
  }),
  component: ShopPage,
});

const cats = ["All", "GPU", "CPU", "Monitor", "Keyboard", "Mouse", "Headset"] as const;

function ShopPage() {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const list = cat === "All" ? products : products.filter((p) => p.category === cat);

  return (
    <div className="mx-auto max-w-7xl px-4 lg:px-6 py-10">
      <div className="mb-8">
        <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase">Shop</h1>
        <p className="text-muted-foreground">Hand-picked gear for serious gamers</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 -mx-4 px-4">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`shrink-0 h-10 px-5 rounded-full text-xs font-black uppercase tracking-wider border transition-all ${
              cat === c
                ? "bg-gradient-flame text-flame-foreground border-transparent"
                : "border-border hover:border-flame/60"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {list.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </div>
    </div>
  );
}
