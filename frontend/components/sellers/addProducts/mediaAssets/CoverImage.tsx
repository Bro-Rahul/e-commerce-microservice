"use client"
import ImagePicker from './ImagePicker'


interface CoverImageProps {
    image?: File | string
    onImageLoaded: (files: File[]) => void
}


const CoverImage = ({ onImageLoaded, image }: CoverImageProps) => {

    const handleImage = async (files: File[]) => {
        onImageLoaded(files);
    }

    const formateImage = () => {
        if (!image) return [];
        if (image instanceof File) return [image]
        return [image];
    }

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
                files={formateImage()}
                htmlFor="Primary Image"
                onImageLoad={handleImage}
                multiple={false}
            />
        </section>
    )
}

export default CoverImage