"use client"
import ImagePicker from './ImagePicker'

const ImageCollection = () => {

    return (
        <ImagePicker
            multiple
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

    )
}

export default ImageCollection