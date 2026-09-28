"use client"
import ImagePicker from './ImagePicker'
import { AvailableCategoryType } from '@/types/inventoryTypes';
import useImageLoader from '@/hooks/seller/useImageLoader';

const CoverImage = ({ category }: { category: AvailableCategoryType }) => {
    const { handleImage, images } = useImageLoader(category, "CoverImage");


    return (
        <section className="space-y-3" aria-labelledby="primary-image-heading">
            <div>
                <h3 className="text-base font-bold text-on-surface" id="primary-image-heading">
                    Primary product image <span className="text-error">*</span>
                </h3>
                <p className="mt-1 text-sm text-on-surface-variant">
                    This image represents your product in search results and product listings.
                </p>
            </div>
            <ImagePicker
                files={images ?? []}
                htmlFor="Primary Image"
                onImageLoad={handleImage}
            />
        </section>
    )
}

export default CoverImage