import { Store, Bell, UserRound } from 'lucide-react'
import ThemeChanger from '../ui/ThemeChanger'
import Link from 'next/link'


const AdminNavBar = () => {
    return (
        <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0e1a28]/95 text-white backdrop-blur-xl">
            <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
                <div className="flex min-w-0 items-center gap-6">
                    <Link href="/admin" className="flex shrink-0 items-center gap-2 text-sm font-bold text-white no-underline lg:hidden">
                        <Store className="size-5" />
                        ShopDirect
                    </Link>
                    <span className="hidden text-xs font-bold uppercase tracking-wider text-white/65 sm:block">Admin Console</span>
                </div>
                <div className="flex shrink-0 items-center gap-3 sm:gap-4">
                    <ThemeChanger />
                    <button
                        aria-label="Notifications"
                        className="rounded-lg p-2 text-white/75 transition-colors hover:bg-white/10 hover:text-white"
                        type="button"
                    >
                        <Bell className="size-5" />
                    </button>
                    <div className="flex items-center gap-3 border-l border-white/15 pl-3 sm:pl-4">
                        <div className="hidden text-right sm:block">
                            <p className="text-xs font-medium text-white">ShopAdmin</p>
                            <p className="text-[10px] text-white/65">Superuser</p>
                        </div>
                        <span className="flex size-9 items-center justify-center rounded-full bg-white/10">
                            <UserRound className="size-5" />
                        </span>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default AdminNavBar