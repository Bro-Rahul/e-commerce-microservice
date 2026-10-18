
'use client';

import { AvailableCategory, ProductStatusList } from '@/constants/data/ui';
import { SellerProductListFilterType } from '@/types/searchFilter/sellerFilterTypes';
import { ChevronDown, Search, X } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';


const SearchFilterInputs = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const searchFilter: SellerProductListFilterType = {
        category: searchParams.get('category'),
        createdAt: searchParams.get('createdAt'),
        productSearch: searchParams.get('productSearch'),
        status: searchParams.get('status'),
    }


    const handleFilter = (
        key: keyof SellerProductListFilterType,
        value: string
    ) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value === '') {
            params.delete(key);
        } else {
            params.set(key, value);
        }

        const query = params.toString();

        router.replace(query ? `${pathname}?${query}` : pathname, {
            scroll: false,
        });
    };

    const clearFilters = () => {
        router.replace(pathname, {
            scroll: false,
        });
    };

    return (
        <section aria-label="Product filters" className="mb-3 border border-outline-variant bg-card p-4">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_1.5fr]">
                <label className="block">
                    <span className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                        Category
                    </span>
                    <span className="relative block">
                        <select
                            value={searchFilter.category ?? "All Category"}
                            onChange={(e) => handleFilter('category', e.target.value)}
                            className="h-10 w-full appearance-none rounded-sm border border-input bg-background px-3 pr-9 text-sm"
                        >
                            <option value="">All Categories</option>
                            {AvailableCategory.map((item) => (
                                <option key={item.name} value={item.name}>
                                    {item.lable}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-3 size-4 text-muted-foreground" />
                    </span>
                </label>

                <label className="block">
                    <span className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                        Status
                    </span>
                    <span className="relative block">
                        <select
                            value={searchFilter.status ?? "All Status"}
                            onChange={(e) => handleFilter('status', e.target.value)}
                            className="h-10 w-full appearance-none rounded-sm border border-input bg-background px-3 pr-9 text-sm"
                        >
                            <option value={''}>
                                All Status
                            </option>
                            {ProductStatusList.map((item) => (
                                <option key={item.name} value={item.name}>
                                    {item.lable}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-3 size-4 text-muted-foreground" />
                    </span>
                </label>

                <label className="block">
                    <span className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                        Date modified
                    </span>
                    <span className="relative block">
                        <select
                            value={searchFilter.createdAt ?? "All Time"}
                            onChange={(e) => handleFilter('createdAt', e.target.value)}
                            className="h-10 w-full appearance-none rounded-sm border border-input bg-background px-3 pr-9 text-sm"
                        >
                            <option value="">Any time</option>
                            <option value="now-30d">Last 30 days</option>
                            <option value="now-90d">Last 90 days</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-3 size-4 text-muted-foreground" />
                    </span>
                </label>

                <label className="block">
                    <span className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                        Search products
                    </span>
                    <span className="relative block">
                        <Search className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" />
                        <input
                            value={searchFilter.productSearch ?? ""}
                            onChange={(e) => handleFilter('productSearch', e.target.value)}
                            placeholder="Search by SKU, title, or ASIN"
                            className="h-10 w-full rounded-sm border border-input bg-background pl-9 pr-9 text-sm"
                        />
                        {searchFilter.productSearch && (
                            <button
                                type="button"
                                aria-label="Clear search"
                                onClick={() => handleFilter('productSearch', '')}
                                className="absolute right-3 top-3 text-muted-foreground"
                            >
                                <X className="size-4" />
                            </button>
                        )}
                    </span>
                </label>
            </div>

            <div className="mt-3 flex min-h-8 items-center justify-between border-t border-outline-variant pt-3">
                <button
                    type="button"
                    onClick={clearFilters}
                    className="text-sm font-semibold text-secondary-container hover:underline"
                >
                    Clear filters
                </button>
            </div>
        </section>
    );
};

export default SearchFilterInputs;
