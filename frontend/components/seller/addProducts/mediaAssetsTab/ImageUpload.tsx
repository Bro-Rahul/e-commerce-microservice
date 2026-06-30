"use client"

import { Input } from '@/components/ui/input'
import { forwardRef, useImperativeHandle, useRef } from 'react'

export interface ImageUploadHandle {
    open: () => void
}

interface ImageUploadProps {
    onImagesSelected: (files: File[]) => void
}

const ImageUpload = forwardRef<ImageUploadHandle, ImageUploadProps>(
    ({ onImagesSelected }, ref) => {
        const inputRef = useRef<HTMLInputElement>(null)

        useImperativeHandle(ref, () => ({
            open: () => inputRef.current?.click(),
        }))

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const files = Array.from(event.target.files ?? []).filter((file) =>
                file.type.startsWith('image/')
            )

            if (files.length) {
                onImagesSelected(files)
            }

            // Allows the seller to select the same image again after removing it.
            event.target.value = ''
        }

        return (
            <Input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                hidden
                aria-label="Choose product images"
                onChange={handleChange}
            />
        )
    }
)

ImageUpload.displayName = 'ImageUpload'

export default ImageUpload
