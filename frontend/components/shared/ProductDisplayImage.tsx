import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react'

interface ImageDisplaySchema {
    id: string
    name: string;
    file: string;
    isCoverImage: boolean;
}

interface ProductDisplayImageProps {
    productImages: ImageDisplaySchema[]
}

const ProductDisplayImage = ({ productImages }: ProductDisplayImageProps) => {
    const [selectedImage, setSelectedImage] = useState<ImageDisplaySchema | undefined>(() => productImages.find(image => image.isCoverImage));

    const handleSelect = (id: string) => {
        setSelectedImage(productImages.find(image => image.id === id))
    }

    useEffect(() => {
        setSelectedImage(productImages.find(image => image.isCoverImage))
    }, [productImages]);

    return (
        <div className="lg:col-span-5">
            <div className="sticky top-25 flex gap-4">
                <div className="flex flex-col gap-2">
                    {productImages.map((image, index) => (
                        <div
                            key={image.id}
                            onClick={() => handleSelect(image.id)}
                            className={cn('w-14 h-14 rounded p-1 cursor-pointer', selectedImage?.id === image.id ? "border border-blue-500" : "")}
                        >
                            <img
                                src={image.file}
                                alt={image.name}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    ))}
                </div>

                <div className="flex-1 bg-white rounded-lg p-4 flex justify-center">
                    {selectedImage && <img
                        src={selectedImage.file}
                        alt={selectedImage.name}
                        className="max-h-150 object-contain"
                    />}
                </div>
            </div>
        </div>
    )
}

export default ProductDisplayImage