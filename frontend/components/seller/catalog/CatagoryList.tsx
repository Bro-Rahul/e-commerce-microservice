import { CirclePlus, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';


interface CatagoryListProps {
    name: string;
    description: string;
    icon: LucideIcon;
}


const CatagoryList: React.FC<{ categories: CatagoryListProps[] }> = ({ categories }) => {
    return (
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4" aria-label="Product categories">
            {categories.map(({ name, description, icon: Icon }) => (
                <Link
                    key={name}
                    href={`/seller/catalog/${name}`}
                    className="group flex min-h-48 flex-col items-center justify-center border border-outline-variant bg-surface-container-lowest p-4 text-center transition-all duration-200 hover:border-secondary-container hover:shadow-md active:scale-[0.98]"
                >
                    <span className="mb-2 grid size-16 place-items-center rounded-full bg-surface-container-high text-primary transition-transform duration-300 group-hover:scale-110">
                        <Icon size={34} strokeWidth={1.8} />
                    </span>
                    <span className="text-base font-bold leading-5 text-on-surface">{name}</span>
                    <span className="mt-1 text-xs leading-4 text-on-surface-variant">{description}</span>
                </Link>
            ))}
            <Link
                href="#"
                className="group flex min-h-48 flex-col items-center justify-center border border-dashed border-outline bg-surface-container-low p-4 text-center transition-all duration-200 hover:bg-surface-container-high active:scale-[0.98]"
            >
                <span className="mb-2 grid size-16 place-items-center rounded-full bg-surface-container text-outline transition-transform duration-300 group-hover:scale-110"><CirclePlus size={34} strokeWidth={1.8} /></span>
                <span className="text-base font-bold leading-5 text-outline">Other</span>
                <span className="mt-1 text-xs leading-4 text-outline">Custom category selection</span>
            </Link>
        </section>
    )
}

export default CatagoryList