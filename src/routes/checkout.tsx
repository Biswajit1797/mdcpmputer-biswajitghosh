import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { inr } from "@/lib/products";
import { Check, Lock, CreditCard, Truck, ShieldCheck } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Express Checkout — MDCOMPUTERS" },
      { name: "description", content: "Fast, secure one-page checkout." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [done, setDone] = useState(false);
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  if (done) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center animate-fade-up">
        <div className="mx-auto h-20 w-20 rounded-full bg-success/20 grid place-items-center mb-6">
          <Check className="h-10 w-10 text-success" />
        </div>
        <h1 className="font-display text-3xl font-bold uppercase mb-2">Order placed!</h1>
        <p className="text-muted-foreground mb-6">We've sent a confirmation. Your beast is on the way 🚀</p>
        <Link to="/" className="inline-flex h-12 px-6 rounded-xl bg-gradient-flame text-flame-foreground font-black uppercase text-sm tracking-wider items-center">
          Back to home
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold uppercase mb-3">Cart is empty</h1>
        <Link to="/shop" className="text-flame underline">Shop now</Link>
      </div>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => { clear(); setDone(true); }, 600);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 lg:px-6 py-10">
      <div className="flex items-center gap-2 mb-8">
        <Lock className="h-4 w-4 text-success" />
        <h1 className="font-display text-3xl sm:text-4xl font-bold uppercase">Express Checkout</h1>
      </div>

      <form onSubmit={submit} className="grid lg:grid-cols-[1fr_400px] gap-8">
        <div className="space-y-6">
          <Section title="Contact">
            <div className="grid sm:grid-cols-2 gap-3">
              <Input label="Email" type="email" required placeholder="you@example.com" />
              <Input label="Phone" type="tel" required placeholder="+91 98765 43210" />
            </div>
          </Section>

          <Section title="Shipping address">
            <div className="grid sm:grid-cols-2 gap-3">
              <Input label="Full name" required placeholder="Arjun Sharma" />
              <Input label="Pincode" required placeholder="560001" />
              <div className="sm:col-span-2"><Input label="Address" required placeholder="Flat / House / Street" /></div>
              <Input label="City" required placeholder="Bengaluru" />
              <Input label="State" required placeholder="Karnataka" />
            </div>
          </Section>

          <Section title="Payment">
            <div className="space-y-2">
              {[
                { id: "upi", t: "UPI", s: "GPay, PhonePe, Paytm" },
                { id: "card", t: "Card", s: "Credit / Debit / EMI" },
                { id: "cod", t: "Cash on delivery", s: "Pay when it arrives" },
              ].map((m, i) => (
                <label key={m.id} className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-flame/60 cursor-pointer has-[:checked]:border-flame has-[:checked]:bg-flame/5 transition-colors">
                  <input type="radio" name="pay" defaultChecked={i === 0} className="accent-flame" />
                  <div className="flex-1">
                    <div className="font-bold text-sm">{m.t}</div>
                    <div className="text-xs text-muted-foreground">{m.s}</div>
                  </div>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </label>
              ))}
            </div>
          </Section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-20 self-start">
          <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider">Order summary</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {items.map((i) => (
                <div key={i.product.id} className="flex gap-3">
                  <div className="relative shrink-0">
                    <img src={i.product.image} alt={i.product.name} className="h-14 w-14 rounded-lg object-cover" />
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-foreground text-background text-[10px] font-bold grid place-items-center">{i.qty}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold line-clamp-2">{i.product.name}</div>
                    <div className="text-xs text-muted-foreground">{inr(i.product.price)}</div>
                  </div>
                  <div className="text-sm font-bold">{inr(i.product.price * i.qty)}</div>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 space-y-2 text-sm">
              <Row l="Subtotal" r={inr(subtotal)} />
              <Row l="Shipping" r={shipping === 0 ? <span className="text-success font-bold">FREE</span> : inr(shipping)} />
              <div className="flex justify-between pt-2 border-t border-border">
                <span className="font-display font-bold uppercase">Total</span>
                <span className="font-display text-2xl font-bold">{inr(total)}</span>
              </div>
            </div>
            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-gradient-flame text-flame-foreground font-black uppercase text-sm tracking-wider hover:scale-[1.02] transition-transform animate-glow-pulse"
            >
              Place order →
            </button>
            <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] text-muted-foreground text-center">
              <div className="flex flex-col items-center gap-1"><Lock className="h-3.5 w-3.5" /> Secure</div>
              <div className="flex flex-col items-center gap-1"><Truck className="h-3.5 w-3.5" /> Fast ship</div>
              <div className="flex flex-col items-center gap-1"><ShieldCheck className="h-3.5 w-3.5" /> Genuine</div>
            </div>
          </div>
        </aside>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="font-bold text-sm uppercase tracking-wider mb-4">{title}</h3>
      {children}
    </div>
  );
}

function Input({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-muted-foreground">{label}</span>
      <input {...rest} className="mt-1 w-full h-11 px-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-flame/40 text-sm" />
    </label>
  );
}

function Row({ l, r }: { l: string; r: React.ReactNode }) {
  return <div className="flex justify-between"><span className="text-muted-foreground">{l}</span><span>{r}</span></div>;
}
