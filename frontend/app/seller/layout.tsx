import SideBarLinks from "@/components/sellers/SideBarLinks"
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
import React from "react"

interface LayoutProps {
    children: React.ReactNode
}

const layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <SidebarProvider className="h-full min-h-0! bg-background relative">
            <Sidebar className="top-14! bottom-0! h-auto!">
                <SidebarHeader className="border-b border-sidebar-border px-4 py-5">
                    <div className="flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                            <Store className="size-5" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-lg font-bold tracking-tight text-on-surface">Seller Center</p>
                            <p className="text-sm text-muted-foreground">Manage your store</p>
                        </div>
                    </div>
                </SidebarHeader>

                <SidebarContent className="px-2 py-3">
                    <SidebarGroup className="p-0">
                        <p className="px-3 pb-2 text-xs font-bold tracking-[0.12em] text-muted-foreground uppercase">
                            Workspace
                        </p>

                        <SideBarLinks />
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter className="border-t border-sidebar-border p-3">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                size="lg"
                                className="px-3 text-[15px] font-semibold text-on-surface hover:bg-surface-container! hover:text-on-surface!"
                                render={<a href="#" />}
                            >
                                <CircleHelp className="size-5 text-black" strokeWidth={2.25} />
                                <span>Help center</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                size="lg"
                                className="px-3 text-[15px] font-semibold text-on-surface hover:bg-surface-container! hover:text-on-surface!"
                                render={<a href="#" />}
                            >
                                <Settings className="size-5 text-black" strokeWidth={2.25} />
                                <span>Store settings</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>

                </SidebarFooter>
            </Sidebar>
            <SidebarTrigger
                className="border border-border bg-card text-foreground shadow-xs hover:bg-surface-container "
                title="Toggle sidebar"
            />

            {children}
        </SidebarProvider>
    )
}

export default layout