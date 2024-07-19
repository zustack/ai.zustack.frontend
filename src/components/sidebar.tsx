import { Home as H, Package, ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const getLinkClass = (path: string) => {
    return location.pathname === path
      ? "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
      : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary";
  };

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span className="">Zustack</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-y-2">
            <Link to="/" className={getLinkClass("/")}>
              <H className="h-4 w-4" />
              Discover
            </Link>
            <Link
              to="/generate-image"
              className={getLinkClass("/generate-image")}
            >
              <ShoppingCart className="h-4 w-4" />
              Generate image
            </Link>
            <Link to="/tutorial" className={getLinkClass("/tutorial")}>
              <Package className="h-4 w-4" />
              Tutorial
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
