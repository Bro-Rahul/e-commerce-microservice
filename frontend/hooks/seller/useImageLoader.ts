import React, { useEffect, useState } from 'react'
import useDexie from './useDexie'
import { AvailableCategoryType } from '@/types/inventoryTypes';
import { ImagePlaceType, MediaAssetsType } from '@/types/mediaAssetsTypes';

const useImageLoader = (category: AvailableCategoryType, imageType: ImagePlaceType) => {
    const [images, setImages] = useState<File[]>([]);
    const { addImages, getImageByCategoryAndPlace } = useDexie();

    const handleImage = async (files: File[]) => {
        const images: MediaAssetsType[] = files.map(file => ({
            category,
            imageType,
            file,
            fileName: file.name
        }))

        await addImages(images, category, imageType);
    }

    useEffect(() => {
        const getImages = async () => {
            try {
                const imageResponse = await getImageByCategoryAndPlace(category, imageType);
                const images = imageResponse.map(image => new File(
                    [image.file],
                    image.fileName,
                    {
                        type: image.file.type,
                        lastModified: Date.now(),
                    }
                ));
                setImages(images);
            } catch (err) {

            }
        }
        getImages();
    }, []);

    return {
        images,
        handleImage
    }

}

export default useImageLoader