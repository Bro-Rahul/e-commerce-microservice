"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import type { ProductImageType } from "@/types/ProductDisplayTypes"
import { useEffect, useState } from "react"

interface ImagecarouselProps {
    images: ProductImageType[]
}

const Imagecarousel = ({ images }: ImagecarouselProps) => {
    const [selectedIndex, setSelectedIndex] = useState(0)

    useEffect(() => {
        setSelectedIndex((currentIndex) =>
            images.length === 0 ? 0 : Math.min(currentIndex, images.length - 1),
        )
    }, [images])

    if (images.length === 0) {
        return (
            <div className="w-full">
                <h2 className="mb-4 text-xl font-bold text-foreground">From the manufacturer</h2>
                <div className="mx-auto flex h-[50vh] w-[70%] items-center justify-center rounded-xl border border-dashed border-border bg-muted text-sm text-muted-foreground">
                    No images available
                </div>
            </div>
        )
    }

    const showPrevious = () => {
        setSelectedIndex((currentIndex) =>
            currentIndex === 0 ? images.length - 1 : currentIndex - 1,
        )
    }

    const showNext = () => {
        setSelectedIndex((currentIndex) => (currentIndex + 1) % images.length)
    }

    return (
        <div className="w-full my-5">
            <h2 className="mb-4 ml-5 text-xl font-bold text-foreground">From the manufacturer</h2>
            <div className="relative mx-auto flex h-[50vh] w-[70%] items-center justify-center overflow-hidden rounded-xl border border-border bg-card">
                <img
                    src={images[selectedIndex].imageURL}
                    alt={images[selectedIndex].name}
                    className="h-full w-full object-fill"
                />

                {images.length > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={showPrevious}
                            aria-label="Previous product image"
                            className="absolute left-3 rounded-full bg-background/90 p-2 text-foreground shadow-sm ring-1 ring-border transition hover:bg-muted"
                        >
                            <ChevronLeft className="size-5" />
                        </button>
                        <button
                            type="button"
                            onClick={showNext}
                            aria-label="Next product image"
                            className="absolute right-3 rounded-full bg-background/90 p-2 text-foreground shadow-sm ring-1 ring-border transition hover:bg-muted"
                        >
                            <ChevronRight className="size-5" />
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default Imagecarousel