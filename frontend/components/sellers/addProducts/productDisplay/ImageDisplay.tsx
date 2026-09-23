import { ProductDisplayImageType } from '@/types/ProductDisplayTypes'
import React, { useState } from 'react'

const ImageDisplay = ({ galleryImages }: { galleryImages: ProductDisplayImageType[] }) => {
    const [selectedImage, setSelectedImage] = useState<ProductDisplayImageType>(
        () => galleryImages.find(item => item.isCoverImage) ?? galleryImages[0]);

    return (
        <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
            <div className="flex gap-3">
                <div className="flex w-16 flex-col gap-2">
                    {galleryImages.map((image, index) => (
                        <button
                            key={`${image}-${index}`}
                            type="button"
                            onClick={() => setSelectedImage(image)}
                            className={`h-14 w-14 overflow-hidden rounded border p-1 shadow-sm transition ${selectedImage === image
                                ? 'border-primary/60 bg-card ring-2 ring-primary/20'
                                : 'border-border bg-muted hover:border-primary/40'
                                }`}
                            aria-label={`View product image ${index + 1}`}
                        >
                            {index === 0 ? (
                                <img
                                    src={image.imageURL}
                                    alt="Phone thumbnail"
                                    className="h-full w-full object-contain"
                                />
                            ) : (
                                <img
                                    src={image.imageURL}
                                    alt={`Phone view ${index + 1}`}
                                    className="h-full w-full rounded object-cover"
                                />
                            )}
                        </button>
                    ))}
                </div>

                <div className="relative flex flex-1 items-center justify-center rounded-xl border border-border bg-card p-4">
                    <img
                        src={selectedImage.imageURL}
                        alt={selectedImage.name}
                        className="max-h-135 w-full max-w-105 object-contain"
                    />
                    <button className="absolute right-4 top-4 rounded-full bg-card p-2 shadow-md ring-1 ring-border hover:bg-muted">
                        <svg viewBox="0 0 24 24" className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M12 21s-8.5-4.9-11-9.2C.6 9.2 2.2 4 6.8 4c2 0 3.2 1.1 4.2 2.3C12 5.1 13.2 4 15.2 4 19.8 4 21.4 9.2 23 11.8 20.5 16.1 12 21 12 21Z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ImageDisplay