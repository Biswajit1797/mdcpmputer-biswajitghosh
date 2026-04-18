import { Link } from "@tanstack/react-router";
import { Star, Zap } from "lucide-react";
import { type Product, inr } from "@/lib/products";
import { useCart } from "@/lib/cart";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { add } = useCart();
  const off = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div
      className="group relative rounded-2xl bg-card border border-border overflow-hidden hover:border-flame/60 hover:-translate-y-1 transition-all duration-300 animate-fade-up"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <Link to="/product/$id" params={{ id: product.id }} className="block">
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted to-background">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {product.tag && (
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-gradient-flame text-flame-foreground text-[10px] font-black uppercase tracking-wider">
              {product.tag}
            </span>
          )}
          {off > 0 && (
            <span className="absolute top-3 right-3 px-2 py-1 rounded-md bg-foreground text-background text-xs font-bold">
              -{off}%
            </span>
          )}
        </div>
      </Link>

      <div className="p-4 space-y-2">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{product.brand}</div>
        <Link to="/product/$id" params={{ id: product.id }}>
          <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-flame transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 text-xs">
          <Star className="h-3.5 w-3.5 fill-flame text-flame" />
          <span className="font-semibold">{product.rating}</span>
          <span className="text-muted-foreground">({product.reviews})</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-lg font-bold">{inr(product.price)}</span>
          <span className="text-xs text-muted-foreground line-through">{inr(product.mrp)}</span>
        </div>
        {product.stock <= 10 && (
          <div className="flex items-center gap-1 text-[11px] text-ember font-semibold">
            <Zap className="h-3 w-3" /> Only {product.stock} left!
          </div>
        )}
        <button
          onClick={(e) => { e.preventDefault(); add(product); }}
          className="w-full mt-2 h-9 rounded-lg bg-foreground text-background text-xs font-bold uppercase tracking-wider hover:bg-gradient-flame hover:text-flame-foreground transition-all"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
