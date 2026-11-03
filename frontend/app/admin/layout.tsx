import AdminNavBar from '@/components/common/AdminNavBar'
import AdminSideBarLinks from '@/components/common/AdminSideBarLinks'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarProvider,
} from '@/components/ui/sidebar'
import { Store, UserRound } from 'lucide-react'
import Link from 'next/link'

import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex h-screen min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
            <SidebarProvider>
                <Sidebar
                    collapsible="none"
                    className="sticky top-0 h-screen border-r border-white/10 bg-[#0e1a28] py-6 text-white shadow-sm [--sidebar-accent:rgba(255,255,255,0.12)] [--sidebar-accent-foreground:#fff] [--sidebar-background:#0e1a28] [--sidebar-border:rgba(255,255,255,0.12)] [--sidebar-foreground:#fff] [--sidebar-ring:#fff]"
                >
                    <SidebarHeader className="px-6 pb-2">
                        <Link href="/admin" className="flex items-center gap-3 text-white no-underline">
                            <span className="flex size-9 items-center justify-center rounded-lg bg-white/10">
                                <Store className="size-5" />
                            </span>
                            <span className="text-base font-bold tracking-tight">ShopDirect</span>
                        </Link>
                    </SidebarHeader>
                    <SidebarContent className="px-4 py-6">
                        <SidebarGroup>
                            <AdminSideBarLinks />
                        </SidebarGroup>
                    </SidebarContent>
                    <SidebarFooter className="mx-4 flex-row items-center gap-3 rounded-lg bg-white/10 p-3">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                            <UserRound className="size-5" />
                        </span>
                        <span className="min-w-0">
                            <span className="block truncate text-xs font-medium">Store Ops</span>
                            <span className="block truncate text-[11px] text-white/65">admin@shopdirect.com</span>
                        </span>
                    </SidebarFooter>
                </Sidebar>
                <div className="flex h-screen min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
                    <AdminNavBar />
                    {children}
                </div>
            </SidebarProvider>
        </div>
    )
}

export default layout