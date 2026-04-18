import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="border-t border-border mt-24 bg-card/40">
      <div className="mx-auto max-w-7xl px-4 lg:px-6 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src={logo} alt="MDC" className="h-8 w-8" width={32} height={32} loading="lazy" />
            <span className="font-display font-bold tracking-tight">MDCOMPUTERS</span>
          </div>
          <p className="text-sm text-muted-foreground">India's trusted destination for high-performance PCs & components.</p>
        </div>
        {[
          { h: "Shop", l: ["GPUs", "CPUs", "Monitors", "Peripherals"] },
          { h: "Support", l: ["Track order", "Returns", "Warranty", "Contact"] },
          { h: "Company", l: ["About", "Stores", "Careers", "Blog"] },
        ].map((c) => (
          <div key={c.h}>
            <h4 className="font-semibold mb-3">{c.h}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {c.l.map((x) => (
                <li key={x}><Link to="/shop" className="hover:text-flame transition-colors">{x}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} MDCOMPUTERS — Built for performance.
      </div>
    </footer>
  );
}
