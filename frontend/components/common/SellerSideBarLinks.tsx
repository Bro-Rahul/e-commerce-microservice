"use client"
import { SellerSideBarNavigations } from '@/constants/data/ui';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import { usePathname, useSelectedLayoutSegment } from 'next/navigation'

const SellerSideBarLinks = () => {
    const path = useSelectedLayoutSegment();
    return (
        <SidebarMenu>
            {SellerSideBarNavigations.map((item) => (
                <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                        isActive={item.href.includes(path!)}
                        size="lg"
                        className="px-3 text-[15px] font-semibold text-white/75 hover:bg-white/10! hover:text-white! data-active:bg-white/15! data-active:font-bold! data-active:text-white!"
                        render={<a href={item.href} />}
                    >
                        <item.icon className="size-5" strokeWidth={2.25} />
                        <span>{item.name}</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    )
}

export default SellerSideBarLinks