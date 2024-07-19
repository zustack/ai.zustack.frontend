import {
  CircleUser,
  Home as H,
  LineChart,
  Menu,
  Package,
  Package2,
  Search as S,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";
export default function Navbar() {

  const location = useLocation();

  const getLinkClass = (path: string) => {
    return location.pathname === path
      ? "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
      : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary";
  };

  return (
    <header className="md:hidden flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
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
        </SheetContent>
      </Sheet>
    </header>
  );
}
