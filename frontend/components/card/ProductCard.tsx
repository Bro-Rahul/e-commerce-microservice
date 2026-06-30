// components/cards/ProductCard.tsx

import Image from "next/image";

interface ProductCardProps {
    image: string;
    title: string;
    price: number;
    delivery?: string;
}

export function ProductCard({
    image,
    title,
    price,
    delivery,
}: ProductCardProps) {
    return (
        <div className="group flex cursor-pointer flex-col">
            <div className="aspect-square overflow-hidden bg-muted p-4">
                <Image
                    src={image}
                    alt={title}
                    width={300}
                    height={300}
                    className="h-full w-full object-contain transition-transform group-hover:scale-105"
                />
            </div>

            <p className="mt-3 text-sm text-link line-clamp-2">
                {title}
            </p>

            <p className="text-price mt-2">
                ${price}
            </p>

            {delivery && (
                <p className="text-muted-foreground text-xs">
                    {delivery}
                </p>
            )}
        </div>
    );
}