"use client"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import { SideBarNavigations } from '@/constants/data'
import { usePathname } from 'next/navigation'

const SideBarLinks = () => {
    const path = usePathname();
    return (
        <SidebarMenu>
            {SideBarNavigations.map((item) => (
                <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                        isActive={path.includes(item.href)}
                        size="lg"
                        className="px-3 text-[15px] font-semibold text-on-surface hover:bg-surface-container! hover:text-on-surface! data-active:bg-surface-container-high! data-active:font-bold! data-active:text-on-surface!"
                        render={<a href={item.href} />}
                    >
                        <item.icon className="size-5 text-black dark:text-white" strokeWidth={2.25} />
                        <span>{item.name}</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    )
}

export default SideBarLinks