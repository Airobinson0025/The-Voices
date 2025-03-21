import { mainNavItems } from "@/app/config/navigation";
import { MainNavItem } from "@/app/types/navigation";
import Link from "next/link";

interface HeaderProps {
    navItems?: MainNavItem[]
}

export function Header({ navItems = mainNavItems }: HeaderProps) {
 return (
    <header className="fixed top-0 z-40 w-full border-b bg-background px-8">
        <div className="flex h-16 items-center justify-between">
        <div className="">
          <Link href="/" className="">
            <h3 className="font-medium text-lg">Voices</h3>
          </Link>
        </div>

        <nav className="flex items-center space-x-8 text-sm font-medium">
            {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="hover:scale-110 transition-transform duration-300">
                    {item.label}
                </Link>
            ))}
        </nav>
        </div>
    </header>
 )
}