import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Cpu, Monitor, Keyboard, Mouse, Headphones, Zap, Shield, Truck, RefreshCw, Star, Flame } from "lucide-react";
import heroPc from "@/assets/hero-pc.jpg";
import { ProductCard } from "@/components/ProductCard";
import { Countdown } from "@/components/Countdown";
import { products } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MDCOMPUTERS — Build Harder. Game Harder." },
      { name: "description", content: "Premium gaming PCs, GPUs, CPUs & peripherals. Flash deals up to 40% off, free shipping, 7-day returns." },
      { property: "og:title", content: "MDCOMPUTERS — Build Harder. Game Harder." },
      { property: "og:description", content: "Premium gaming PCs, GPUs, CPUs & peripherals at unbeatable prices." },
    ],
  }),
  component: HomePage,
});

const categories = [
  { name: "GPUs", icon: Zap, cat: "GPU" },
  { name: "Processors", icon: Cpu, cat: "CPU" },
  { name: "Monitors", icon: Monitor, cat: "Monitor" },
  { name: "Keyboards", icon: Keyboard, cat: "Keyboard" },
  { name: "Mice", icon: Mouse, cat: "Mouse" },
  { name: "Headsets", icon: Headphones, cat: "Headset" },
];

function HomePage() {
  return (
    <div>
      {/* Announcement bar */}
      <div className="bg-foreground text-background overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap py-2 text-xs font-semibold uppercase tracking-wider">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex shrink-0">
              {["⚡ Flash sale ends tonight", "🚚 Free shipping over ₹999", "🛡️ 7-day easy returns", "🔥 Up to 40% off on RTX series", "💳 No-cost EMI available"].map((t, i) => (
                <span key={i} className="px-8 flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-flame" /> {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden bg-grid">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-flame/30 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-ember/20 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 lg:px-6 py-16 lg:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-flame/40 text-xs font-bold uppercase tracking-wider">
              <Flame className="h-3.5 w-3.5 text-flame" />
              <span>Limited time</span>
              <span className="text-muted-foreground">·</span>
              <Countdown hours={5} />
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold uppercase leading-[0.95] tracking-tight">
              Build <span className="text-gradient-flame">harder.</span><br />
              Game <span className="text-gradient-flame">harder.</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-md">
              RTX 4090 · Ryzen 9 · 240Hz monitors. Curated by experts, delivered in 48 hours.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link to="/shop" className="group inline-flex items-center gap-2 h-14 px-7 rounded-xl bg-gradient-flame text-flame-foreground font-black uppercase text-sm tracking-wider hover:scale-105 transition-transform animate-glow-pulse">
                Shop Deals <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/build" className="inline-flex items-center gap-2 h-14 px-7 rounded-xl border-2 border-foreground font-black uppercase text-sm tracking-wider hover:bg-foreground hover:text-background transition-colors">
                Build a PC
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 max-w-lg">
              {[
                { n: "12k+", l: "Happy gamers" },
                { n: "4.8★", l: "Trustpilot" },
                { n: "48h", l: "Delivery" },
              ].map((s) => (
                <div key={s.l} className="border-l-2 border-flame pl-3">
                  <div className="font-display text-2xl font-bold">{s.n}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-up" style={{ animationDelay: "120ms" }}>
            <div className="absolute inset-0 bg-gradient-flame blur-3xl opacity-30 rounded-full" />
            <div className="relative rounded-3xl overflow-hidden ring-flame animate-float">
              <img src={heroPc} alt="High-end gaming PC build" width={1536} height={1024} className="w-full h-auto" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-2xl p-4 shadow-2xl flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-success/20 grid place-items-center">
                <Zap className="h-5 w-5 text-success" />
              </div>
              <div>
                <div className="font-bold text-sm">Just shipped</div>
                <div className="text-xs text-muted-foreground">to Bengaluru</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-y border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-4 lg:px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { i: Truck, t: "Free shipping", s: "On orders above ₹999" },
            { i: Shield, t: "Genuine products", s: "Brand warranty" },
            { i: RefreshCw, t: "7-day returns", s: "No questions asked" },
            { i: Star, t: "Rated 4.8★", s: "12,000+ reviews" },
          ].map((x) => (
            <div key={x.t} className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-flame text-flame-foreground grid place-items-center shrink-0">
                <x.i className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="font-bold text-sm">{x.t}</div>
                <div className="text-xs text-muted-foreground">{x.s}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 lg:px-6 py-16">
        <div className="mb-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase">Shop by category</h2>
          <p className="text-muted-foreground text-sm mt-1">Everything you need to dominate</p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {categories.map((c, i) => (
            <Link
              to="/shop"
              key={c.name}
              className="group aspect-square rounded-2xl border border-border bg-card hover:border-flame/60 hover:-translate-y-1 transition-all p-4 flex flex-col items-center justify-center text-center gap-2 animate-fade-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="h-12 w-12 rounded-xl bg-muted group-hover:bg-gradient-flame group-hover:text-flame-foreground grid place-items-center transition-colors">
                <c.icon className="h-6 w-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Flash deals */}
      <section className="mx-auto max-w-7xl px-4 lg:px-6 py-8">
        <div className="rounded-3xl bg-gradient-to-br from-card to-background border border-flame/30 p-6 lg:p-10 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-flame/20 blur-3xl" />
          <div className="relative flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-flame text-flame-foreground text-[10px] font-black uppercase tracking-wider mb-3">
                <Flame className="h-3 w-3" /> Flash Deals
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase">Ends in <Countdown hours={5} /></h2>
            </div>
            <Link to="/shop" className="text-sm font-bold uppercase tracking-wider hover:text-flame inline-flex items-center gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 relative">
            {products.slice(0, 4).map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="mx-auto max-w-7xl px-4 lg:px-6 py-16">
        <div className="mb-8 flex items-end justify-between flex-wrap gap-4">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase">Best Sellers</h2>
            <p className="text-muted-foreground text-sm mt-1">Loved by 12,000+ gamers</p>
          </div>
          <Link to="/shop" className="text-sm font-bold uppercase tracking-wider hover:text-flame inline-flex items-center gap-1">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.slice(0, 4).map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="mx-auto max-w-7xl px-4 lg:px-6 py-8">
        <div className="rounded-3xl bg-foreground text-background p-10 lg:p-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-flame/40 blur-3xl" />
          <div className="relative max-w-2xl">
            <div className="inline-block px-3 py-1 rounded-full bg-gradient-flame text-flame-foreground text-[10px] font-black uppercase tracking-wider mb-4">
              Custom Builds
            </div>
            <h2 className="font-display text-4xl lg:text-6xl font-bold uppercase leading-none mb-4">
              Need a <span className="text-gradient-flame">custom rig?</span>
            </h2>
            <p className="opacity-80 mb-6 max-w-md">Tell us your budget. Our experts spec, build & ship a beast within 7 days.</p>
            <Link to="/build" className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-gradient-flame text-flame-foreground font-black uppercase text-sm tracking-wider hover:scale-105 transition-transform">
              Configure my PC <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="mx-auto max-w-7xl px-4 lg:px-6 py-16">
        <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase text-center mb-2">What gamers say</h2>
        <p className="text-muted-foreground text-sm text-center mb-10">Real reviews from real customers</p>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { n: "Arjun R.", c: "Bengaluru", t: "Got my RTX 4090 build in 3 days. Cable management is god-tier. 10/10 would buy again." },
            { n: "Priya S.", c: "Mumbai", t: "Customer support actually knows what they're talking about. Helped me pick the perfect monitor." },
            { n: "Karan M.", c: "Delhi", t: "Prices beat everyone else and the warranty process is painless. My go-to store now." },
          ].map((r, i) => (
            <div key={r.n} className="rounded-2xl bg-card border border-border p-6 animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-flame text-flame" />)}
              </div>
              <p className="text-sm leading-relaxed mb-4">"{r.t}"</p>
              <div className="font-bold text-sm">{r.n}</div>
              <div className="text-xs text-muted-foreground">{r.c}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
