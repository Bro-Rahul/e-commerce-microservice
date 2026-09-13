import React, { useEffect, useState } from 'react'

interface ImageViewerProps {
    images: string[],
}

const ImageViewer = ({ images }: ImageViewerProps) => {

    return (
        <>
            {images.length !== 0 ? <DefaultViewer images={images} /> : <>
                <span className="material-symbols-outlined mb-3 rounded-full bg-primary-fixed p-3 text-3xl text-primary">
                    add_photo_alternate
                </span>
                <span className="text-sm font-bold text-on-surface group-hover:text-primary">
                    Upload your primary image
                </span>
                <span className="mt-1 text-xs text-on-surface-variant">
                    PNG, JPG, or WEBP up to 10MB
                </span>
            </>}
        </>
    )
}

export default ImageViewer

const DefaultViewer = ({ images }: { images: string[] }) => {
    return <>
        {images.length !== 0 ?
            images.map((image, index) =>
                <img
                    key={index}
                    alt="Image File"
                    className="absolute inset-0 h-full w-full object-contain p-3"
                    src={image}
                />
            )
            :
            <>
                <span className="material-symbols-outlined mb-3 rounded-full bg-primary-fixed p-3 text-3xl text-primary">
                    add_photo_alternate
                </span>
                <span className="text-sm font-bold text-on-surface group-hover:text-primary">
                    Upload your primary image
                </span>
                <span className="mt-1 text-xs text-on-surface-variant">
                    PNG, JPG, or WEBP up to 10MB
                </span>
            </>
        }
    </>
}