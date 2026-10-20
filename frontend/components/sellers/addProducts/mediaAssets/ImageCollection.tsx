"use client"
import ImagePicker from './ImagePicker'
import useProductImage from '@/hooks/dexies/useProductImage';
import { MediaAssetsType } from '@/types/dexie/mediaAssetsTypes';
import useImageLoader from '@/hooks/dexies/useImageLoader';

interface ImageCollectionProps {
    images?: File[] | string[]
    onImageLoaded: (files: File[]) => void
}

const ImageCollection = ({ onImageLoaded, images }: ImageCollectionProps) => {

    const handleImages = async (files: File[]) => {
        onImageLoaded(files);
    }


    return (
        <section className="space-y-4 border-t border-outline-variant pt-8">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h3
                        className="text-base font-bold text-on-surface"
                        id="carousel-heading"
                    >
                        Image Collection
                    </h3>

                    <p className="mt-1 text-sm text-on-surface-variant">
                        This image will be there alongside with the Cover Image this will refer to as supplimentary images
                    </p>
                </div>
            </div>
            <ImagePicker
                multiple
                onImageLoad={handleImages}
                files={images}
                htmlFor="Image Collection"
                render={(images) =>
                    <section className="space-y-3 border-t border-outline-variant pt-8" aria-labelledby="collection-heading">
                        <div>
                            <h3 className="text-base font-bold text-on-surface" id="collection-heading">
                                Image collection
                            </h3>
                            <p className="mt-1 text-sm text-on-surface-variant">
                                Include lifestyle photos, close-ups, packaging, or other supporting images.
                            </p>
                        </div>


                        {images.length > 0 && (
                            <div className="mb-3 grid w-full max-w-lg grid-cols-4 gap-2 sm:grid-cols-6">
                                {images.map((previewUrl, index) => (
                                    <img
                                        alt={`Collection preview ${index + 1}`} className="aspect-square w-full rounded-md border border-outline-variant bg-surface-container object-cover" key={previewUrl}
                                        src={previewUrl}
                                    />
                                ))}
                            </div>
                        )}
                    </section>
                }
            />
        </section>



    )
}

export default ImageCollection