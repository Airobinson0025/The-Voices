import { mainNavItems } from "@/config/navigation";
import { MainNavItem } from "@/types/navigation";
import Link from "next/link";
import { Button } from "../ui/button";

interface HeaderProps {
  navItems?: MainNavItem[];
}

export function Header({ navItems = mainNavItems }: HeaderProps) {
  return (
    <header className="fixed top-0 z-40 w-full bg-background px-6 lg:px-12">
      <div className="flex h-16 items-center justify-between">
        <div className="">
          <Link href="/" className="">
            <h3 className="font-bold text-xl">Voices</h3>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center space-x-6 text-md font-medium tracking-tight">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="">
              {item.label}
            </Link>
          ))}
          <Link href="/auth/login">
            <Button size="lg" className="text-md">
              Login
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
