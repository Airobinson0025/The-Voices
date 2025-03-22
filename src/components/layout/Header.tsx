import { mainNavItems } from "@/config/navigation";
import { MainNavItem } from "@/types/navigation";
import Link from "next/link";

interface HeaderProps {
    navItems?: MainNavItem[]
}

export function Header({ navItems = mainNavItems }: HeaderProps) {
 return (
    <header className="fixed top-0 z-40 w-full bg-background px-8">
        <div className="flex h-20 items-center justify-between">
        <div className="">
          <Link href="/" className="">
            <h3 className="font-bold text-xl">
                Voices
            </h3>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center space-x-10 text-lg font-medium tracking-tight">
            {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="hover:-translate-y-1 transition-all duration-500">
                    {item.label}
                </Link>
            ))}
        </nav>
        </div>
    </header>
 )
}