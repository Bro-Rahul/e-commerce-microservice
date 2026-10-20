"use client"
import React, { useEffect, useState } from 'react'
import ImageViewer from './ImageViewer'
import { getImageUrlFromFile } from '@/lib/utils';

interface ImagePickerProps {
    multiple?: boolean,
    htmlFor: string,
    files?: File[] | string[],
    onImageLoad?: (files: File[]) => void;
    render?: (images: string[]) => React.ReactNode
}



const ImagePicker = ({ multiple, htmlFor, files, render, onImageLoad }: ImagePickerProps) => {
    const [imageUrls, setImageUrls] = useState<string[]>(() => getImageUrlFromFile(files ?? []));

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files
        if (!fileList) return

        const files = Array.from(fileList)
        if (onImageLoad) onImageLoad(files);
        setImageUrls(pre => {
            pre.forEach(file => URL.revokeObjectURL(file));

            return files.map(file =>
                URL.createObjectURL(file)
            );
        })
    }

    useEffect(() => {
        setImageUrls(getImageUrlFromFile(files ?? []))
        return () => {
            imageUrls.forEach(url => {
                URL.revokeObjectURL(url);
            });
        };
    }, [files]);


    return (

        <label
            className={`group relative flex min-h-64 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-outline-variant bg-surface-container-low px-6 py-8 text-center transition hover:border-secondary hover:bg-secondary/5 ${imageUrls ? "border-solid" : ""}`}
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
                type="file"
                multiple={multiple}
            />
        </label>
    )
}

export default ImagePicker