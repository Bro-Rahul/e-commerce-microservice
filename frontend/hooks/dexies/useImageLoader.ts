import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

interface UseImageLoaderProp<T> {
    loaderFn: () => Promise<T | undefined>,
    dependency: any[]
}

const useImageLoader = <T>({ loaderFn, dependency }: UseImageLoaderProp<T>) => {
    const [images, setImages] = useState<T | undefined>(undefined);

    useEffect(() => {
        const loadImages = async () => {
            try {
                const response = await loaderFn();
                setImages(response);
            } catch (err) {
                toast.error("Fail to load the images", {
                    position: "bottom-right",
                    duration: 5000
                })
            }
        }
        loadImages();
    }, dependency);

    return images
}

export default useImageLoader