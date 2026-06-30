import React, { useRef } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import ImageUpload, { ImageUploadHandle } from '../seller/addProducts/mediaAssetsTab/ImageUpload';
import { FileUploadSchema } from '@/types/formFields';
import { Button } from '../ui/button';
import { Upload } from 'lucide-react';


interface FileUploadFieldProps {
    fileField: FileUploadSchema
}

const FileUploadField = ({ fileField }: FileUploadFieldProps) => {
    const { control } = useFormContext();
    const inputRef = useRef<ImageUploadHandle>(null);

    return (
        <Controller
            name={fileField.name}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                    <ImageUpload
                        onImagesSelected={(imageFiles) => onChange({
                            ...value,
                            display: imageFiles.map((file, index) => ({
                                id: `${file.name}-${file.lastModified}-${index}-${crypto.randomUUID()}`,
                                name: file.name,
                                previewUrl: URL.createObjectURL(file),
                            }))
                        })}
                        ref={inputRef}
                    />
                    <Button
                        type="button"
                        onClick={() => inputRef.current?.open()}
                        className="w-full bg-primary py-2 text-on-primary hover:bg-primary/90"
                    >
                        <Upload className="size-4" />
                        Upload Images
                    </Button>

                </>
            )}
        />
    )
}

export default FileUploadField