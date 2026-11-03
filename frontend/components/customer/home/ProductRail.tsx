import { StoreProduct } from '@/app/(customer)/page';
import { ChevronLeft, ChevronRight, Heart, ShoppingBag } from 'lucide-react';
import React, { useRef } from 'react'



const ProductRail = ({
    title,
    subtitle,
    label,
    products,
    onAdd,
}: {
    title: string;
    subtitle: string;
    label: string;
    products: StoreProduct[];
    onAdd: (product: StoreProduct) => void;
}) => {
    const railRef = useRef<HTMLDivElement>(null);

    return (
        <section className="mx-auto mt-7 w-full max-w-max px-4 sm:px-6" id={label}>
            <div className="rounded-xl bg-surface-container-lowest p-4 shadow-sm sm:p-6">
                <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                        <div className="flex flex-wrap items-center gap-2">
                            <h2 className="text-lg font-bold text-on-surface sm:text-xl">{title}</h2>
                            <span className="rounded bg-secondary-fixed px-2 py-0.5 text-[10px] font-black text-on-secondary-fixed">
                                {label === "smartphones" ? "NEW ARRIVALS" : "LITERATURE DEALS"}
                            </span>
                        </div>
                        <p className="mt-0.5 text-xs text-on-surface-variant">{subtitle}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                            <button
                                type="button"
                                aria-label={`Scroll ${title} left`}
                                onClick={() => railRef.current?.scrollBy({ left: -280, behavior: "smooth" })}
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container text-on-surface transition hover:bg-surface-container-high"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <button
                                type="button"
                                aria-label={`Scroll ${title} right`}
                                onClick={() => railRef.current?.scrollBy({ left: 280, behavior: "smooth" })}
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container text-on-surface transition hover:bg-surface-container-high"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                        <a className="whitespace-nowrap text-xs font-bold text-secondary hover:underline" href={`#${label}`}>
                            View all
                        </a>
                    </div>
                </div>

                {products.length === 0 ? (
                    <p className="rounded-lg bg-surface-container-low p-6 text-center text-sm text-on-surface-variant">
                        No products match your search.
                    </p>
                ) : (
                    <div
                        ref={railRef}
                        className="flex snap-x gap-3 overflow-x-auto pb-2 scrollbar-none [&::-webkit-scrollbar]:hidden"
                    >
                        {products.map((product) => (
                            <article
                                key={product.name}
                                className="group relative flex w-56 shrink-0 snap-start flex-col rounded-lg bg-surface-container-low p-3 transition hover:bg-surface-container sm:w-60"
                            >
                                {product.badge && (
                                    <span className="absolute left-5 top-5 z-10 rounded bg-secondary px-2 py-1 text-[9px] font-bold text-on-secondary">
                                        {product.badge}
                                    </span>
                                )}
                                <div className="relative mb-3 flex h-44 items-center justify-center overflow-hidden rounded-lg bg-surface-container-lowest p-3 sm:h-48">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <button
                                        type="button"
                                        aria-label={`Add ${product.name} to wishlist`}
                                        className="absolute right-2 top-2 rounded-full bg-surface-container-lowest/90 p-1.5 text-on-surface-variant transition hover:text-error"
                                    >
                                        <Heart size={15} />
                                    </button>
                                </div>
                                <div className="flex flex-1 flex-col">
                                    <h3 className="line-clamp-1 text-xs font-bold text-on-surface">{product.name}</h3>
                                    <p className="mt-0.5 line-clamp-1 text-[11px] text-on-surface-variant">{product.detail}</p>
                                    <div className="mt-2 flex items-center gap-1 text-xs">
                                        <span className="text-secondary">★★★★★</span>
                                        <span className="font-semibold text-on-surface">{product.rating}</span>
                                        <span className="text-on-surface-variant">({product.reviews})</span>
                                    </div>
                                    <div className="mt-2 flex items-baseline gap-2">
                                        <span className="text-base font-black text-on-surface">{product.price}</span>
                                        {product.originalPrice && (
                                            <span className="text-[10px] text-outline line-through">{product.originalPrice}</span>
                                        )}
                                    </div>
                                    <p className="mt-2 text-[10px] text-tertiary">⚡ PRIME · FREE next-day delivery</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => onAdd(product)}
                                    className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-secondary px-3 py-2 text-xs font-bold text-on-secondary shadow-sm transition hover:brightness-95"
                                >
                                    <ShoppingBag size={14} />
                                    Add to Cart
                                </button>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default ProductRail