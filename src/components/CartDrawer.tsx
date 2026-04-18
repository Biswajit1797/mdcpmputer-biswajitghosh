import { Link, useNavigate } from "@tanstack/react-router";
import { X, Minus, Plus, Trash2, Sparkles, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { products, inr, type Product } from "@/lib/products";
import { useMemo, useState } from "react";

export function CartDrawer() {
  const { items, open, setOpen, remove, setQty, subtotal, add } = useCart();
  const navigate = useNavigate();
  const [comboFor, setComboFor] = useState<Product | null>(null);

  const recommendations = useMemo(() => {
    const inCart = new Set(items.map((i) => i.product.id));
    if (items.length === 0) return products.slice(0, 3);
    const relIds = items.flatMap((i) => i.product.related ?? []);
    const recs = relIds.map((id) => products.find((p) => p.id === id)).filter(Boolean) as Product[];
    const dedup = Array.from(new Map(recs.map((p) => [p.id, p])).values()).filter((p) => !inCart.has(p.id));
    return dedup.length ? dedup.slice(0, 3) : products.filter((p) => !inCart.has(p.id)).slice(0, 3);
  }, [items]);

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />
      <aside
        className={`fixed top-0 right-0 z-50 h-dvh w-full sm:w-[440px] bg-background border-l border-border shadow-2xl flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="h-16 px-5 flex items-center justify-between border-b border-border">
          <h2 className="font-display font-bold text-lg flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-flame" /> Your Cart
          </h2>
          <button onClick={() => setOpen(false)} className="h-9 w-9 rounded-full hover:bg-accent grid place-items-center">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto h-16 w-16 rounded-full bg-muted grid place-items-center mb-4">
                <ShoppingBag className="h-7 w-7 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm">Your cart is empty.</p>
            </div>
          ) : (
            items.map((i) => (
              <div key={i.product.id} className="flex gap-3 p-3 rounded-xl bg-card border border-border">
                <img src={i.product.image} alt={i.product.name} className="h-20 w-20 rounded-lg object-cover" loading="lazy" />
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase text-muted-foreground font-semibold">{i.product.brand}</div>
                  <div className="font-semibold text-sm line-clamp-2">{i.product.name}</div>
                  <div className="font-display font-bold mt-1">{inr(i.product.price)}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => setQty(i.product.id, i.qty - 1)} className="h-7 w-7 rounded-md border border-border grid place-items-center hover:bg-accent">
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="text-sm font-semibold w-6 text-center">{i.qty}</span>
                    <button onClick={() => setQty(i.product.id, i.qty + 1)} className="h-7 w-7 rounded-md border border-border grid place-items-center hover:bg-accent">
                      <Plus className="h-3 w-3" />
                    </button>
                    <button onClick={() => remove(i.product.id)} className="ml-auto h-7 w-7 rounded-md hover:bg-destructive/10 hover:text-destructive grid place-items-center">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

          {recommendations.length > 0 && (
            <div className="pt-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-flame" />
                <h3 className="font-bold text-sm uppercase tracking-wider">You might also like</h3>
              </div>
              <div className="space-y-2">
                {recommendations.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setComboFor(p)}
                    className="w-full flex gap-3 p-2 rounded-xl border border-border hover:border-flame/60 hover:bg-accent text-left transition-all"
                  >
                    <img src={p.image} alt={p.name} className="h-14 w-14 rounded-lg object-cover" loading="lazy" />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-xs line-clamp-1">{p.name}</div>
                      <div className="text-xs text-muted-foreground line-clamp-1">{p.brand}</div>
                      <div className="font-display font-bold text-sm">{inr(p.price)}</div>
                    </div>
                    <div className="self-center text-[10px] font-bold text-flame uppercase">View combo</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-border p-5 space-y-3 bg-card/50">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Subtotal</span>
            <span className="font-display text-xl font-bold">{inr(subtotal)}</span>
          </div>
          <button
            disabled={items.length === 0}
            onClick={() => { setOpen(false); navigate({ to: "/checkout" }); }}
            className="w-full h-12 rounded-xl bg-gradient-flame text-flame-foreground font-black uppercase tracking-wider text-sm disabled:opacity-40 hover:scale-[1.02] transition-transform animate-glow-pulse"
          >
            Express Checkout →
          </button>
          <Link to="/shop" onClick={() => setOpen(false)} className="block text-center text-xs text-muted-foreground hover:text-flame">
            Continue shopping
          </Link>
        </div>
      </aside>

      {comboFor && (
        <ComboModal product={comboFor} onClose={() => setComboFor(null)} onAccept={() => { add(comboFor); setComboFor(null); }} />
      )}
    </>
  );
}

function ComboModal({ product, onClose, onAccept }: { product: Product; onClose: () => void; onAccept: () => void }) {
  const comboPrice = Math.round(product.price * 0.85);
  const save = product.price - comboPrice;
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center p-4 bg-black/70 backdrop-blur-sm animate-fade-up">
      <div className="relative max-w-md w-full rounded-3xl bg-card border border-flame/40 ring-flame p-6">
        <button onClick={onClose} className="absolute top-4 right-4 h-8 w-8 rounded-full hover:bg-accent grid place-items-center">
          <X className="h-4 w-4" />
        </button>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-flame text-flame-foreground text-[10px] font-black uppercase tracking-wider mb-4">
          <Sparkles className="h-3 w-3" /> Exclusive Combo Offer
        </div>
        <h3 className="font-display text-2xl font-bold mb-1">Add it for less!</h3>
        <p className="text-sm text-muted-foreground mb-4">Bundle this with your cart and unlock 15% off — limited time.</p>
        <div className="flex gap-4 p-4 rounded-2xl bg-muted">
          <img src={product.image} alt={product.name} className="h-24 w-24 rounded-xl object-cover" />
          <div className="flex-1">
            <div className="font-semibold">{product.name}</div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold text-flame">{inr(comboPrice)}</span>
              <span className="text-xs line-through text-muted-foreground">{inr(product.price)}</span>
            </div>
            <div className="text-xs text-success font-semibold">You save {inr(save)}</div>
          </div>
        </div>
        <button
          onClick={onAccept}
          className="w-full mt-5 h-12 rounded-xl bg-gradient-flame text-flame-foreground font-black uppercase text-sm tracking-wider hover:scale-[1.02] transition-transform"
        >
          Yes, add combo to cart
        </button>
        <button onClick={onClose} className="w-full mt-2 text-xs text-muted-foreground hover:text-foreground">
          No thanks
        </button>
      </div>
    </div>
  );
}
