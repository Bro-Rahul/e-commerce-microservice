import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"

import { CircleHelp, Settings, Store } from "lucide-react"
import { getServerSession } from "next-auth"
import React from "react"
import options from "../api/auth/[...nextauth]/options"
import { redirect } from "next/navigation"
import SellerNavBar from "@/components/common/SellerNavBar"
import SellerSideBarLinks from "@/components/common/SellerSideBarLinks"

interface LayoutProps {
    children: React.ReactNode
}

const layout: React.FC<LayoutProps> = async ({ children }) => {
    const session = await getServerSession(options);
    if (session && session.user.role !== "SELLER") redirect("/")
    return (
        <div className="flex h-dvh flex-col overflow-hidden">
            <SellerNavBar />
            <SidebarProvider className="relative flex min-h-0! flex-1 overflow-hidden bg-background">
                <Sidebar className="top-12! bottom-0! h-auto! border-white/10 bg-[#0e1a28] text-white [--sidebar-accent:rgba(255,255,255,0.12)] [--sidebar-accent-foreground:#fff] [--sidebar-background:#0e1a28] [--sidebar-border:rgba(255,255,255,0.12)] [--sidebar-foreground:#fff] [--sidebar-ring:#fff]">
                    <div className="flex h-full flex-col bg-[#0e1a28] text-white">
                        <SidebarHeader className="border-b border-white/10 px-4 py-5">
                            <div className="flex items-center gap-3">
                                <div className="flex size-9 items-center justify-center rounded-lg bg-white/10 text-white shadow-sm">
                                    <Store className="size-5" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-lg font-bold tracking-tight text-white">Seller Center</p>
                                    <p className="text-sm text-white/65">Manage your store</p>
                                </div>
                            </div>
                        </SidebarHeader>

                        <SidebarContent className="px-2 py-3">
                            <SidebarGroup className="p-0">
                                <p className="px-3 pb-2 text-xs font-bold tracking-[0.12em] text-white/55 uppercase">
                                    Workspace
                                </p>

                                <SellerSideBarLinks />
                            </SidebarGroup>
                        </SidebarContent>

                        <SidebarFooter className="border-t border-white/10 p-3">
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        size="lg"
                                        className="px-3 text-[15px] font-semibold text-white/75 hover:bg-white/10! hover:text-white!"
                                        render={<a href="#" />}
                                    >
                                        <CircleHelp className="size-5" strokeWidth={2.25} />
                                        <span>Help center</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        size="lg"
                                        className="px-3 text-[15px] font-semibold text-white/75 hover:bg-white/10! hover:text-white!"
                                        render={<a href="#" />}
                                    >
                                        <Settings className="size-5" strokeWidth={2.25} />
                                        <span>Store settings</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>

                        </SidebarFooter>
                    </div>
                </Sidebar>
                <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
                    <SidebarTrigger
                        className="border border-border bg-card text-foreground shadow-xs hover:bg-surface-container "
                        title="Toggle sidebar"
                    />
                    <div className="min-h-0 min-w-0 flex-1 overflow-y-auto">
                        {children}
                    </div>
                </div>
            </SidebarProvider>
        </div>
    )
}

export default layout