import { Link } from "@tanstack/react-router";
import { Moon, Sun, ShoppingCart, Search, Menu } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { useCart } from "@/lib/cart";
import logo from "@/assets/logo.png";

export function Header() {
  const { theme, toggle } = useTheme();
  const { count, setOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 lg:px-6 h-16 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="MDC" width={36} height={36} className="h-9 w-9" />
          <span className="font-display font-bold text-xl tracking-tight hidden sm:inline">
            MD<span className="text-gradient-flame">COMPUTERS</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 ml-6 text-sm font-medium">
          <Link to="/" className="hover:text-flame transition-colors">Home</Link>
          <Link to="/shop" className="hover:text-flame transition-colors">Shop</Link>
          <Link to="/shop" search={{ cat: "GPU" } as never} className="hover:text-flame transition-colors">Components</Link>
          <Link to="/shop" className="hover:text-flame transition-colors">Build PC</Link>
          <Link to="/shop" className="hover:text-flame transition-colors">Deals</Link>
        </nav>

        <div className="hidden lg:flex items-center flex-1 max-w-md mx-4 relative">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search GPUs, CPUs, builds..."
            className="w-full h-10 pl-10 pr-4 rounded-full bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-flame/40"
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="h-10 w-10 rounded-full border border-border hover:bg-accent grid place-items-center transition-colors"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setOpen(true)}
            aria-label="Open cart"
            className="relative h-10 w-10 rounded-full bg-gradient-flame text-flame-foreground grid place-items-center hover:scale-105 transition-transform"
          >
            <ShoppingCart className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-foreground text-background text-[10px] font-bold grid place-items-center">
                {count}
              </span>
            )}
          </button>
          <button className="md:hidden h-10 w-10 rounded-full border border-border grid place-items-center">
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
