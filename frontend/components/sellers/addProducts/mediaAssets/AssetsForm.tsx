"use client"
import { AvailableCategoryType } from '@/types/inventoryTypes'
import FormCard from '../productForms/FormCard'
import { Images } from 'lucide-react'
import CoverImage from './CoverImage'
import ImageCarousel from './ImageCarousel'
import ImageCollection from './ImageCollection'
import SaveAssetsBtn from './SaveAssetsBtn'
import useImageLoader from '@/hooks/dexies/useImageLoader'
import { ImagePlaceType, MediaAssetsType } from '@/types/dexie/mediaAssetsTypes'
import useProductImage from '@/hooks/dexies/useProductImage'

interface AssetsFormProps {
    currentVariantId: string,
    category: AvailableCategoryType
}

const AssetsForm = ({ category, currentVariantId }: AssetsFormProps) => {
    const {
        addCoverImage,
        addCarouselImages,
        addImageCollection,
        getVariantImagesForAnCategory
    } = useProductImage();
    const images = useImageLoader<MediaAssetsType[]>({
        dependency: [category, currentVariantId],
        loaderFn: async () => await getVariantImagesForAnCategory(currentVariantId, category)
    })
    console.log(images)

    const handleImageUpload = async (files: File[], imageType: ImagePlaceType) => {
        const payload: MediaAssetsType[] = [];
        files.forEach(file => {
            const imageData: MediaAssetsType = {
                category,
                variantId: currentVariantId,
                file: file,
                fileName: file.name,
                imageType
            }
            payload.push(imageData);
        });

        switch (imageType) {
            case 'CoverImage':
                await addCoverImage(payload[0], category, currentVariantId);
                break;
            case 'CarouselImages':
                await addCarouselImages(payload, category, currentVariantId);
                break;
            case 'CollectionImages':
                await addImageCollection(payload, category, currentVariantId);
                break;
        }

    }

    const getCoverImageFile = (asset: MediaAssetsType | undefined) => {
        if (!asset) return undefined;
        return new File(
            [asset.file],
            asset.fileName,
            {
                type: asset.file.type
            }
        )
    }

    const filterImages = (imageType: ImagePlaceType) => {
        if (!images) return undefined;
        return images
            .filter(image => image.imageType === imageType)
            .map(image => new File(
                [image.file],
                image.fileName, {
                type: image.file.type
            }
            ));
    }

    return (
        <FormCard
            Icon={Images}
            heading="Media assets"
            description="Add high-quality visuals that help customers understand the product."
        >
            <div className="space-y-8 p-5 sm:p-8">
                <CoverImage
                    onImageLoaded={(files) => handleImageUpload(files, "CoverImage")}
                    image={getCoverImageFile(images?.find(image => image.imageType === "CoverImage"))}
                />
                <ImageCarousel
                    onImageLoaded={(files) => handleImageUpload(files, "CarouselImages")}
                    images={filterImages("CarouselImages")}
                />
                <ImageCollection
                    onImageLoaded={(files) => handleImageUpload(files, "CollectionImages")}
                    images={filterImages("CollectionImages")}
                />
            </div>
            <SaveAssetsBtn
                slug={category}
                advanceOnSave={false}
                variantId={currentVariantId}
            />
        </FormCard>
    )
}

export default AssetsForm