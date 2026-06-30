// components/shared/Rating.tsx

import { Star } from "lucide-react";

interface RatingProps {
    rating: number;
    reviews?: number;
}

export function Rating({
    rating,
    reviews,
}: RatingProps) {
    return (
        <div className="mt-1 flex items-center gap-1">
            <Star
                className="h-4 w-4 fill-yellow-400 text-yellow-400"
            />

            <span className="text-sm">
                {rating}
            </span>

            {reviews && (
                <span className="text-xs text-muted-foreground">
                    ({reviews.toLocaleString()})
                </span>
            )}
        </div>
    );
}