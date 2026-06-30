"use client"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { ImageIcon, Upload, FileImage } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import SectionHeading from '../SectionHeading'
import ImageUpload, { type ImageUploadHandle } from './ImageUpload'
import ImageViewer from './ImageViewer'
import { AvailableCategory } from '@/types/seller'
import { ImageTableRowType } from '@/types/indexDb'
import { addGallaryImages, deleteImageById, getImagesByCategory } from '@/lib/imageService'
import toast from 'react-hot-toast'


interface MediaAssetTabProps {
    category: AvailableCategory
}

type ImageGallaryState = {
    previewURL: string
} & ImageTableRowType;


const MediaAssetTab: React.FC<MediaAssetTabProps> = ({ category }) => {

    const uploadRef = useRef<ImageUploadHandle>(null)
    const [images, setImages] = useState<ImageGallaryState[]>([])
    const [coverImageId, setCoverImageId] = useState<string | null>(null)

    useEffect(() => {
        const getImages = async () => {
            const response = await getImagesByCategory(category) || [];
            const imageData: ImageGallaryState[] = response.map(item => ({
                ...item,
                previewURL: URL.createObjectURL(item.file)
            }));
            setImages(pre => [
                ...imageData
            ])

            const coverImage = imageData.find(item => item.isCoverImage);
            setCoverImageId(coverImage?.id ?? imageData[0]?.id ?? null);
        }
        getImages();

        return () => {
            images.forEach(image => URL.revokeObjectURL(image.previewURL))
        }
    }, []);


    const addImages = (files: File[]) => {

        const imageData: ImageGallaryState[] = files.map((file) => ({
            category,
            file,
            createdAt: new Date(),
            id: `${crypto.randomUUID()}`,
            isCoverImage: false,
            name: file.name,
            previewURL: URL.createObjectURL(file)
        }))

        setCoverImageId((currentCover) => currentCover ?? imageData[0]?.id ?? null)
        setImages(pre => [
            ...pre,
            ...imageData
        ])
    }

    const removeImage = async (imageId: string) => {
        setImages((currentImages) => {
            const image = currentImages.find((item) => item.id === imageId)
            if (image) URL.revokeObjectURL(image.previewURL)
            return currentImages.filter((item) => item.id !== imageId)
        })
        setCoverImageId((currentCover) => {
            if (currentCover !== imageId) return currentCover
            const nextImage = images.find((image) => image.id !== imageId)
            return nextImage?.id ?? null
        })

        await deleteImageById(imageId);
    }


    const handleSave = async () => {
        const imagePayload: ImageTableRowType[] = images.map(file => ({
            category: file.category,
            createdAt: file.createdAt,
            file: file.file,
            id: file.id,
            isCoverImage: coverImageId === file.id,
            name: file.name
        }));
        await addGallaryImages(imagePayload);
        toast.success("Media Assets are saved ", {
            position: "bottom-right",
            duration: 5000
        });
    }

    const coverImage = images.find((image) => image.id === coverImageId)

    return (
        <section className="max-w rounded-lg border border-outline-variant bg-surface-container-lowest p-6 shadow-sm overflow-hidden" >
            <SectionHeading>
                <FileImage />4. Media Management
            </SectionHeading>
            <ImageUpload ref={uploadRef} onImagesSelected={addImages} />
            <div className="grid min-w-0 gap-8 md:grid-cols-2">
                <div className="min-w-0 space-y-4">
                    <Label className="text-sm font-bold">Cover Image Preview</Label>
                    <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-md border-2 border-dashed border-outline-variant bg-surface-container-high text-on-surface-variant">
                        {coverImage ? (
                            <Image
                                src={coverImage.previewURL}
                                alt={`Cover preview: ${coverImage.name}`}
                                fill
                                priority
                                className='object-cover'
                            />
                        ) : (
                            <div className="text-center">
                                <ImageIcon className="mx-auto size-16" />
                                <p className="mt-2 text-sm">Your selected cover image appears here</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="min-w-0 space-y-6">
                    <div>
                        <div className="mb-3 flex items-center justify-between gap-3">
                            <Label className="text-sm font-bold">Media Gallery</Label>
                            <span className="text-xs text-on-surface-variant">
                                {images.length} image{images.length === 1 ? '' : 's'}
                            </span>
                        </div>
                        <div className="grid min-w-0 grid-cols-3 gap-2 sm:grid-cols-4">
                            {images.map((image) => (
                                <ImageViewer
                                    key={image.id}
                                    src={image.previewURL}
                                    alt={image.name}
                                    isSelected={image.id === coverImageId}
                                    onSelect={() => setCoverImageId(image.id)}
                                    onRemove={() => removeImage(image.id)}
                                    className="aspect-square"
                                />
                            ))}
                        </div>
                        <p className="mt-3 text-xs text-on-surface-variant">
                            Select an image to make it the cover. You can add as many product images as needed.
                        </p>
                    </div>

                    <Button
                        type="button"
                        onClick={() => uploadRef.current?.open()}
                        className="w-full bg-primary py-2 text-on-primary hover:bg-primary/90"
                    >
                        <Upload className="size-4" />
                        Upload Images
                    </Button>

                    <Button
                        disabled={images.length === 0}
                        type="button"
                        onClick={handleSave}
                        className="w-full bg-primary py-2 text-on-primary hover:bg-primary/90"
                    >
                        <Upload className="size-4" />
                        Save
                    </Button>
                </div>
            </div>
        </section >
    )
}

export default MediaAssetTab
