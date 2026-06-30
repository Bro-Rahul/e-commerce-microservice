// components/cards/DealCard.tsx

import Image from "next/image";

interface DealCardProps {
    image: string;
    title: string;
    badge: string;
}

export function DealCard({
    image,
    title,
    badge,
}: DealCardProps) {
    return (
        <div className="min-w-55 shrink-0">
            <div className="mb-2 flex h-48 items-center justify-center bg-muted p-4">
                <Image
                    src={image}
                    alt={title}
                    width={250}
                    height={250}
                    className="max-h-full object-contain"
                />
            </div>

            <div className="mb-1 flex gap-2">
                <span className="rounded-sm bg-destructive px-2 py-1 text-xs text-white">
                    {badge}
                </span>

                <span className="text-price text-sm">
                    Deal
                </span>
            </div>

            <p className="line-clamp-2 text-sm">
                {title}
            </p>
        </div>
    );
}