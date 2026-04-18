import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Product } from "./products";

export type CartItem = { product: Product; qty: number };

type CartCtx = {
  items: CartItem[];
  add: (p: Product, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (o: boolean) => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("mdc-cart");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem("mdc-cart", JSON.stringify(items)); } catch {}
  }, [items]);

  const add: CartCtx["add"] = (p, qty = 1) => {
    setItems((cur) => {
      const existing = cur.find((i) => i.product.id === p.id);
      if (existing) return cur.map((i) => (i.product.id === p.id ? { ...i, qty: i.qty + qty } : i));
      return [...cur, { product: p, qty }];
    });
    setOpen(true);
  };
  const remove: CartCtx["remove"] = (id) => setItems((cur) => cur.filter((i) => i.product.id !== id));
  const setQty: CartCtx["setQty"] = (id, qty) =>
    setItems((cur) => cur.map((i) => (i.product.id === id ? { ...i, qty: Math.max(1, qty) } : i)));
  const clear = () => setItems([]);
  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);

  return (
    <Ctx.Provider value={{ items, add, remove, setQty, clear, count, subtotal, open, setOpen }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
