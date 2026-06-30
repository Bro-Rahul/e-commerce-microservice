// components/cards/BookCard.tsx

import Image from "next/image";
import { Rating } from "../shared/Rating";

interface BookCardProps {
    title: string;
    author: string;
    image: string;
    price: number;
    rating: number;
    reviews: number;
}

export function BookCard({
    title,
    author,
    image,
    price,
    rating,
    reviews,
}: BookCardProps) {
    return (
        <div className="flex flex-col">
            <div className="aspect-3/4 overflow-hidden bg-muted">
                <Image
                    src={image}
                    alt={title}
                    width={300}
                    height={400}
                    className="h-full w-full object-cover"
                />
            </div>

            <h3 className="mt-2 text-sm font-semibold line-clamp-1">
                {title}
            </h3>

            <p className="text-xs text-muted-foreground">
                {author}
            </p>

            <Rating
                rating={rating}
                reviews={reviews}
            />

            <p className="text-price mt-2">
                ${price}
            </p>
        </div>
    );
}