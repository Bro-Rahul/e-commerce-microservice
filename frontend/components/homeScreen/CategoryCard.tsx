// components/cards/CategoryCard.tsx

import Image from "next/image";

interface CategoryCardProps {
    title: string;
    image: string;
    linkText: string;
}

export function CategoryCard({
    title,
    image,
    linkText,
}: CategoryCardProps) {
    return (
        <div className="product-card">
            <h3 className="font-bold">{title}</h3>

            <div className="aspect-square overflow-hidden bg-muted">
                <Image
                    src={image}
                    alt={title}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover"
                />
            </div>

            <button className="text-link mt-auto text-left">
                {linkText}
            </button>
        </div>
    );
}