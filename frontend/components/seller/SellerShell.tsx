"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bell,
  CircleHelp,
  ClipboardPenLine,
  FolderPlus,
  LayoutDashboard,
  Megaphone,
  Menu,
  MessageSquareMore,
  PackagePlus,
  Search,
  Settings,
  SlidersHorizontal,
  Store,
  Tags,
  UserRound,
} from "lucide-react";

const navigation = [
  { label: "Dashboard", href: "/seller/dashboard", icon: LayoutDashboard },
  { label: "Catalog", href: "/seller/catalog", icon: FolderPlus },
  { label: "Pricing", href: "/seller/pricing", icon: Tags },
  { label: "Advertising", href: "/seller/advertising", icon: Megaphone },
  { label: "Reports", href: "/seller/reports", icon: BarChart3 },
  { label: "Settings", href: "/seller/settings", icon: SlidersHorizontal },
];

function SidebarLink({
  label,
  href,
  Icon,
  active = false,
}: {
  label: string;
  href: string;
  Icon: typeof LayoutDashboard;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${active
          ? "bg-secondary-container text-on-secondary-container"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
        }`}
    >
      <Icon size={19} strokeWidth={active ? 2.4 : 2} />
      {label}
    </Link>
  );
}

export function SellerShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const topNavigation = [
    { label: "Dashboard", href: "/seller/dashboard" },
    { label: "Inventory", href: "/seller/catalog" },
    { label: "Orders", href: "/seller/orders" },
    { label: "Payments", href: "/seller/payments" },
    { label: "Growth", href: "/seller/growth" },
  ];
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <header className="sticky top-0 z-40 h-16 bg-primary-container text-on-primary shadow-md">
        <div className="mx-auto flex h-full max-w-[1500px] items-center justify-between px-4 lg:px-5">
          <div className="flex h-full items-center gap-6">
            <Link href="/seller/dashboard" className="text-xl font-extrabold tracking-tight text-secondary-container">
              SellerCentral
            </Link>
            <nav className="hidden h-full items-center gap-6 md:flex" aria-label="Main navigation">
              {topNavigation.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className={`flex h-full items-center border-b-2 text-sm transition-colors ${pathname === href
                      ? "border-secondary-container text-on-primary"
                      : "border-transparent text-slate-300 hover:text-white"
                    }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <label className="relative hidden sm:block">
              <span className="sr-only">Search products and orders</span>
              <Search className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" size={17} />
              <input
                className="h-9 w-56 rounded-md bg-white px-3 pr-9 text-sm text-slate-900 outline-none ring-[var(--seller-orange)] focus:ring-2"
                placeholder="Search products, orders..."
              />
            </label>
            <button className="rounded-full p-2 hover:bg-white/10" aria-label="Notifications"><Bell size={20} /></button>
            <button className="hidden rounded-full p-2 hover:bg-white/10 sm:block" aria-label="Settings"><Settings size={20} /></button>
            <button className="grid size-8 place-items-center rounded-full border-2 border-secondary-container bg-surface-container text-primary-container" aria-label="Account"><UserRound size={18} /></button>
            <button className="rounded p-2 md:hidden" aria-label="Open menu"><Menu size={21} /></button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-[1500px]">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-outline-variant bg-white p-4 lg:flex">
          <div className="mb-7 flex items-center gap-3 px-2 pt-1">
            <div className="grid size-10 place-items-center rounded-md bg-secondary-container text-on-secondary-container"><Store size={21} /></div>
            <div>
              <p className="text-sm font-bold">Premium Store</p>
              <p className="text-xs text-slate-500">Active Seller</p>
            </div>
          </div>
          <nav className="space-y-1" aria-label="Seller workspace">
            {navigation.map(({ label, href, icon }) => <SidebarLink key={label} label={label} href={href} Icon={icon} active={pathname.includes(href)} />)}
          </nav>
          <Link href="#" className="mt-7 flex items-center justify-center gap-2 rounded-lg bg-secondary-container px-3 py-3 text-sm font-bold text-on-secondary-container shadow-sm transition hover:brightness-95">
            <PackagePlus size={19} /> Add Product
          </Link>
          <div className="mt-auto space-y-1 border-t border-slate-200 pt-5">
            <SidebarLink label="Help" href="/seller/help" Icon={CircleHelp} active={pathname === "/seller/help"} />
            <SidebarLink label="Feedback" href="/seller/feedback" Icon={MessageSquareMore} active={pathname === "/seller/feedback"} />
          </div>
        </aside>
        <main className="min-w-0 flex-1 p-4 pb-24 sm:p-5 lg:pb-5">{children}</main>
      </div>

      <footer className="hidden border-t border-outline-variant bg-surface-container lg:block">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 text-xs text-slate-500">
          <div><span className="font-bold text-primary-container">SellerCentral</span><p className="mt-0.5">© 2026 SellerCentral. All rights reserved.</p></div>
          <div className="flex gap-5"><Link href="#">Privacy Policy</Link><Link href="#">Terms of Service</Link><Link href="#">Seller University</Link></div>
        </div>
      </footer>

      <nav className="fixed inset-x-0 bottom-0 z-40 flex h-16 items-center justify-around border-t border-primary-container bg-primary-container text-on-primary-container lg:hidden" aria-label="Mobile navigation">
        <MobileNav label="Home" href="/seller/dashboard" Icon={LayoutDashboard} active={pathname === "/seller/dashboard"} />
        <MobileNav label="Stock" href="/seller/catalog" Icon={ClipboardPenLine} active={pathname === "/seller/catalog"} />
        <Link href="/seller/catalog" className="-mt-8 grid size-13 place-items-center rounded-full border-4 border-primary-container bg-secondary-container text-on-secondary-container"><PackagePlus size={22} /></Link>
        <MobileNav label="Alerts" href="/seller/orders" Icon={Bell} active={pathname === "/seller/orders"} />
        <MobileNav label="Account" href="/seller/settings" Icon={UserRound} active={pathname === "/seller/settings"} />
      </nav>
    </div>
  );
}

function MobileNav({ label, href, Icon, active = false }: { label: string; href: string; Icon: typeof Bell; active?: boolean }) {
  return <Link href={href} className={`flex flex-col items-center gap-1 text-[10px] ${active ? "text-white" : "text-slate-400"}`}><Icon size={19} /><span>{label}</span></Link>;
}
