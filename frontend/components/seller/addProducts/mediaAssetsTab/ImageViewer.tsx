"use client"

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import Image from 'next/image'

interface ImageViewerProps {
    alt: string
    className?: string
    isSelected?: boolean
    onRemove?: () => void
    onSelect?: () => void
    src: string
}

const ImageViewer = ({
    alt,
    className,
    isSelected = false,
    onRemove,
    onSelect,
    src,
}: ImageViewerProps) => {
    return (
        <div
            className={cn(
                'group relative w-full overflow-hidden rounded-md border-2 bg-surface-container',
                isSelected ? 'border-secondary-container' : 'border-outline-variant',
                className
            )}
        >
            <button
                type="button"
                className="absolute inset-0 z-10 cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
                aria-label={`Use ${alt} as the cover image`}
                onClick={onSelect}
            />
            <Image
                src={src}
                alt={alt}
                priority
                fill
                className="object-contain"
            />
            {onRemove && (
                <Button
                    type="button"
                    variant="destructive"
                    size="icon-xs"
                    className="absolute top-1 right-1 z-20 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
                    aria-label={`Remove ${alt}`}
                    onClick={onRemove}
                >
                    <X />
                </Button>
            )}
        </div>
    )
}

export default ImageViewer
