import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Star, Zap, Shield, Truck, RefreshCw, Plus, Minus, Check } from "lucide-react";
import { getProduct, getRelated, inr, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ProductCard } from "@/components/ProductCard";
import { Countdown } from "@/components/Countdown";
import { useState } from "react";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product, related: getRelated(params.id) };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — MDCOMPUTERS` },
          { name: "description", content: `Buy ${loaderData.product.name} at ${inr(loaderData.product.price)}. Free shipping & 7-day returns.` },
          { property: "og:title", content: `${loaderData.product.name} — MDCOMPUTERS` },
          { property: "og:description", content: `Buy ${loaderData.product.name} at ${inr(loaderData.product.price)}.` },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="font-display text-3xl font-bold mb-3">Product not found</h1>
      <Link to="/shop" className="text-flame underline">Back to shop</Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product, related } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const off = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div className="mx-auto max-w-7xl px-4 lg:px-6 py-10">
      <div className="grid lg:grid-cols-2 gap-10">
        <div className="relative rounded-3xl overflow-hidden bg-card border border-border ring-flame">
          <img src={product.image} alt={product.name} className="w-full aspect-square object-cover" />
          {product.tag && (
            <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-gradient-flame text-flame-foreground text-xs font-black uppercase">
              {product.tag}
            </span>
          )}
        </div>

        <div className="space-y-5">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-bold">{product.brand} · {product.category}</div>
          <h1 className="font-display text-4xl lg:text-5xl font-bold uppercase leading-tight">{product.name}</h1>

          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-flame text-flame" />
              <span className="font-bold">{product.rating}</span>
            </div>
            <span className="text-muted-foreground">({product.reviews} reviews)</span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="font-display text-4xl font-bold">{inr(product.price)}</span>
            <span className="text-lg text-muted-foreground line-through">{inr(product.mrp)}</span>
            <span className="px-2 py-1 rounded-md bg-success/20 text-success text-xs font-bold">SAVE {off}%</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-flame/10 border border-flame/30 text-sm">
            <Zap className="h-4 w-4 text-flame" />
            <span className="font-semibold">Flash deal ends in</span>
            <Countdown hours={5} />
          </div>

          {product.stock <= 10 && (
            <div className="text-sm text-ember font-semibold">⚠ Only {product.stock} left in stock — order soon!</div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <div className="inline-flex items-center border border-border rounded-xl">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-12 w-12 grid place-items-center hover:bg-accent">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-bold">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="h-12 w-12 grid place-items-center hover:bg-accent">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={() => add(product, qty)}
              className="flex-1 h-12 rounded-xl bg-gradient-flame text-flame-foreground font-black uppercase tracking-wider text-sm hover:scale-[1.02] transition-transform animate-glow-pulse"
            >
              Add to cart
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4">
            {[
              { i: Truck, t: "Free shipping" },
              { i: Shield, t: "Brand warranty" },
              { i: RefreshCw, t: "7-day returns" },
              { i: Check, t: "Genuine product" },
            ].map((x) => (
              <div key={x.t} className="flex items-center gap-2 text-sm">
                <x.i className="h-4 w-4 text-flame" />
                <span>{x.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase mb-6">Pairs well with</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {related.map((p: Product, i: number) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      )}
    </div>
  );
}
