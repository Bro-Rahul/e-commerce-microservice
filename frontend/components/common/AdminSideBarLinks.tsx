"use client"
import { AdminSideBarNavigations } from '@/constants/data/ui';
import { useSelectedLayoutSegment } from 'next/navigation';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '../ui/sidebar';

const AdminSideBarLinks = () => {
    const path = useSelectedLayoutSegment();
    return (
        <SidebarMenu>
            {AdminSideBarNavigations.map((item) => (
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

export default AdminSideBarLinks