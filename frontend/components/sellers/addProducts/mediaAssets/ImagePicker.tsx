"use client"
import React, { useEffect, useState } from 'react'
import ImageViewer from './ImageViewer'

interface ImagePickerProps {
    multiple?: boolean,
    htmlFor: string,
    files?: File[]
    onImageLoad?: (files: File[]) => void;
    render?: (images: string[]) => React.ReactNode
}

const ImagePicker = ({ multiple, htmlFor, files, render, onImageLoad }: ImagePickerProps) => {
    const [imageFiles, setImageFiles] = useState<File[]>(files ?? []);
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files

        if (!fileList) return

        const files = Array.from(fileList)
        if (onImageLoad) onImageLoad(files);
        setImageFiles(files)
    }

    useEffect(() => {
        setImageFiles(files ?? [])
    }, [files])

    useEffect(() => {
        if (imageFiles.length === 0) {
            setImageUrls([]);
            return;
        }

        const urls = imageFiles.map(file =>
            URL.createObjectURL(file)
        );

        setImageUrls(urls);

        return () => {
            urls.forEach(url => {
                URL.revokeObjectURL(url);
            });
        };
    }, [imageFiles]);


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