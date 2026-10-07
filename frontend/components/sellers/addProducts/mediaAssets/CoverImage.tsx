"use client"
import useProductImage from '@/hooks/dexies/useProductImage'
import ImagePicker from './ImagePicker'
import useImageLoader from '@/hooks/dexies/useImageLoader';
import { AvailableCategoryType } from '@/types/inventoryTypes';
import { MediaAssetsType } from '@/types/dexie/mediaAssetsTypes';

const CoverImage = ({ variantId, category }: { variantId: string, category: AvailableCategoryType }) => {
    const { addCoverImage, getImage } = useProductImage();
    const images = useImageLoader<MediaAssetsType>({
        dependency: [category, variantId],
        loaderFn: async () => await getImage(category, "CoverImage", variantId)
    })

    const handleImage = async (files: File[]) => {
        const imageData: MediaAssetsType = {
            category,
            variantId,
            file: files[0],
            fileName: files[0].name,
            imageType: 'CoverImage'
        }
        await addCoverImage(imageData, category, variantId);
    }

    const formattedImage = () => {
        if (!images?.file) {
            return [];
        }

        const file = new File(
            [images.file],
            "image.jpg",
            {
                type: images.file.type,
                lastModified: Date.now(),
            }
        );

        return [file];
    };
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
                files={formattedImage()}
                htmlFor="Primary Image"
                onImageLoad={handleImage}
            />
        </section>
    )
}

export default CoverImage