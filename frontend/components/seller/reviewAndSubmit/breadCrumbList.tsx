import React from 'react'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface BreadCrumbListProps {
    breadCrumbList: {
        href: string,
        name: string
    }[]
}

const BreadCrumbList = ({ breadCrumbList }: BreadCrumbListProps) => {
    const previousLinks = breadCrumbList.slice(0, breadCrumbList.length - 1);
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {previousLinks.map(item =>
                    <React.Fragment key={item.name}>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={item.href}>{item.name}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </React.Fragment>
                )}
                <BreadcrumbItem>
                    <BreadcrumbPage className='font-bold'>{breadCrumbList[breadCrumbList.length - 1].name}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default BreadCrumbList