"use client"
import React, { useEffect, useState } from 'react'
import ImageViewer from './ImageViewer'

interface ImagePickerProps {
    multiple?: boolean,
    htmlFor: string,
    render?: (images: string[]) => React.ReactNode
}

const ImagePicker = ({ multiple, htmlFor, render }: ImagePickerProps) => {
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files

        if (!fileList) return

        const files = Array.from(fileList)

        setImageFiles(files)
    }

    useEffect(() => {
        if (imageFiles.length === 0) return;
        imageUrls.forEach(image => URL.revokeObjectURL(image));
        const newURLS = imageFiles.map(image => URL.createObjectURL(image));
        setImageUrls(newURLS);

        return imageUrls.forEach(url => URL.revokeObjectURL(url));
    }, [imageFiles])


    return (

        <label
            className={`group relative flex min-h-64 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-outline-variant bg-surface-container-low px-6 py-8 text-center transition hover:border-secondary hover:bg-secondary/5 ${imageFiles ? "border-solid" : ""}`}
            htmlFor={htmlFor}
        >

            {render ?
                render(imageUrls)
                :
                <ImageViewer
                    images={imageUrls}
                />
            }
            <input
                accept="image/png,image/jpeg,image/webp"
                className="sr-only"
                id={htmlFor}
                onChange={handleChange}
                required={!imageFiles}
                type="file"
                multiple={multiple}
            />
        </label>
    )
}

export default ImagePicker