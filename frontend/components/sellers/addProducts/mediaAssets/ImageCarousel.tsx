"use client"
import { AvailableCategoryType } from '@/types/inventoryTypes'
import ImagePicker from './ImagePicker'
import useImageLoader from '@/hooks/seller/useImageLoader'

interface ImageCarouselProps {
    category: AvailableCategoryType
}

const ImageCarousel = ({ category }: ImageCarouselProps) => {
    const { handleImage, images } = useImageLoader(category, "Carousel");

    return (
        <section
            className="space-y-4 border-t border-outline-variant pt-8"
            aria-labelledby="carousel-heading"
        >

            <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h3
                        className="text-base font-bold text-on-surface"
                        id="carousel-heading"
                    >
                        Product carousel
                    </h3>

                    <p className="mt-1 text-sm text-on-surface-variant">
                        Add multiple views so customers can explore your product
                        from different angles.
                    </p>
                </div>

                <span className="w-fit rounded-full bg-surface-container px-3 py-1 text-xs font-bold text-on-surface-variant">
                    Up to 8 images
                </span>
            </div>

            <ImagePicker
                htmlFor="carousel-images"
                multiple
                files={images}
                onImageLoad={handleImage}
                render={(images) => (
                    <div className="space-y-4">
                        {images.length > 0 ? (
                            <>
                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
                                    {images.map((previewUrl, index) => (
                                        <div
                                            key={previewUrl}
                                            className="group relative overflow-hidden rounded-xl border border-outline-variant bg-surface-container"
                                        >
                                            <img
                                                src={previewUrl}
                                                alt={`Carousel preview ${index + 1}`}
                                                className="aspect-square w-full object-cover transition-transform duration-200 group-hover:scale-105"
                                            />

                                            <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-2 py-1.5 text-center text-xs font-medium text-white">
                                                Image {index + 1}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <label
                                    htmlFor="carousel-images"
                                    className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-outline-variant px-4 py-3 text-sm font-semibold text-primary transition hover:bg-surface-container"
                                >
                                    <span className="material-symbols-outlined text-lg">
                                        add_photo_alternate
                                    </span>
                                    Add more images
                                </label>
                            </>
                        ) : (
                            <label
                                htmlFor="carousel-images"
                                className="group flex cursor-pointer items-center gap-5 rounded-xl border border-dashed border-outline-variant bg-surface-container-low p-5 transition hover:border-primary hover:bg-surface-container sm:p-6"
                            >
                                {/* Extreme left icon */}
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary text-on-primary shadow-sm">
                                    <span className="material-symbols-outlined text-2xl text-white">
                                        view_carousel
                                    </span>
                                </div>

                                {/* Helpful information */}
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-bold text-on-surface">
                                        Show your product from different angles
                                    </p>

                                    <p className="mt-1 text-sm leading-5 text-on-surface-variant">
                                        Add up to 8 images showing the front, back,
                                        side, details, and important features of your
                                        product.
                                    </p>

                                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-on-surface-variant">
                                        <span className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-sm">
                                                check_circle
                                            </span>
                                            Clear & well-lit
                                        </span>

                                        <span className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-sm">
                                                crop
                                            </span>
                                            Square images preferred
                                        </span>

                                        <span className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-sm">
                                                image
                                            </span>
                                            JPG, PNG or WEBP
                                        </span>
                                    </div>
                                </div>

                                <span className="hidden shrink-0 rounded-lg border border-outline-variant bg-card px-4 py-2.5 text-sm font-bold text-on-surface shadow-sm transition group-hover:border-primary group-hover:text-primary sm:block">
                                    Browse files
                                </span>
                            </label>
                        )}
                    </div>
                )}
            />
        </section>
    )
}

export default ImageCarousel