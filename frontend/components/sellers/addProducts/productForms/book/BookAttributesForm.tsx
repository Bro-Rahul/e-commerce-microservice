"use client"

import { Button } from '@/components/ui/button'
import { defaultBookAttributes } from '@/constants/data/bookData'
import { bookAttributesFields } from '@/constants/formFields/bookFields'
import useAddProduct from '@/store/useAddProduct'
import { BookAttributesType, bookAttributesValidator } from '@/validators/products/bookValidator'
import { zodResolver } from '@hookform/resolvers/zod'
import { BookOpenText, Save } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import FormCard from '../FormCard'
import JsonUploadBtn from '../../JsonUploadBtn'


const BookAttributesForm = () => {
    const { addProductMetaDetail } = useAddProduct()

    const { handleSubmit, register, reset, formState: { errors } } = useForm<BookAttributesType>({
        resolver: zodResolver(bookAttributesValidator),
        defaultValues: defaultBookAttributes,
    })

    useEffect(() => {
        const { variants, currentVariant } = useAddProduct.getState().products.book
        const bookMeta = variants[currentVariant].productMetaDetail

        if (Object.keys(bookMeta).length > 0) {
            reset(bookMeta as BookAttributesType)
        }
    }, [reset])

    const onSubmit = (data: BookAttributesType) => {
        addProductMetaDetail('book', data)
        toast.success('Book details saved!', {
            position: 'bottom-right',
            duration: 5000,
        })
    }

    return (
        <FormCard
            Icon={BookOpenText}
            heading="Book Attributes"
            description="Capture the key publication and product metadata for this book."
            headerActions={
                <JsonUploadBtn
                    schema={bookAttributesValidator}
                    onSuccess={data => {
                        onSubmit(data)
                        reset(data)
                    }}
                />}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-6 p-5 sm:p-8">
                    <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                        {bookAttributesFields.map((field) => {
                            const fieldName = field.name
                            const fieldError = errors[fieldName]?.message as string | undefined
                            const isNumber = field.type === 'number'
                            const isDate = field.type === 'date'
                            const isTextarea = field.type === 'textarea'
                            const isSelect = field.type === 'select'

                            const fieldRegister = register(fieldName, {
                                setValueAs: (value) => {
                                    if (value === '' || value === null || value === undefined) {
                                        return ''
                                    }

                                    if (isNumber) return Number(value)
                                    if (isDate) return value
                                    return value
                                },
                            })

                            return (
                                <div key={String(field.name)} className={fieldName === 'description' ? 'md:col-span-2' : 'space-y-2'}>
                                    <label className="block text-sm font-bold text-on-surface">
                                        {field.label}
                                    </label>

                                    {isSelect ? (
                                        <select className="inputfields" {...fieldRegister}>
                                            {(field.options ?? []).map((option) => (
                                                <option key={String(option.value)} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    ) : isTextarea ? (
                                        <textarea
                                            className="textareafield"
                                            {...fieldRegister}
                                            placeholder={field.placeholder}
                                        />
                                    ) : (
                                        <input
                                            className="inputfields"
                                            type={field.type}
                                            {...fieldRegister}
                                            placeholder={field.placeholder}
                                        />
                                    )}

                                    {fieldError && <p className="error">{fieldError}</p>}
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="flex justify-end border-t border-outline-variant bg-surface-container-low px-5 py-4 sm:px-8">
                    <Button type="submit" className="rounded-lg w-fit border border-outline-variant px-5 py-2.5 text-sm font-bold text-on-surface transition hover:bg-surface-container" variant="outline">
                        <Save />
                        Save Book Attributes
                    </Button>
                </div>
            </form>
        </FormCard>
    )
}

export default BookAttributesForm
