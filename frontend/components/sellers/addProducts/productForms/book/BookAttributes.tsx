"use client"

import { Button } from '@/components/ui/button'
import { defaultBookAttributes } from '@/constants/data'
import { bookAttributesFields } from '@/constants/formFields/bookFields'
import useAddProduct from '@/store/useAddProduct'
import { BookAttributesType, BookAttributesValidator } from '@/validators/products/bookValidator'
import { zodResolver } from '@hookform/resolvers/zod'
import { Save } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'


const BookAttributes = () => {
    const { updateMetaDetails } = useAddProduct()

    const { handleSubmit, register, reset, formState: { errors } } = useForm<BookAttributesType>({
        resolver: zodResolver(BookAttributesValidator),
        defaultValues: defaultBookAttributes,
    })

    useEffect(() => {
        const bookMeta = useAddProduct.getState().products.book.productMetaDetail as Partial<BookAttributesType>

        if (Object.keys(bookMeta).length > 0) {
            reset(bookMeta as BookAttributesType)
        }
    }, [reset])

    const onSubmit = (data: BookAttributesType) => {
        updateMetaDetails('book', data)
        toast.success('Book details saved!', {
            position: 'bottom-right',
            duration: 5000,
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <section className="border-t border-outline-variant py-5 flex flex-col">
                <div className="border-b border-outline-variant bg-surface-container-low px-5 py-4 sm:px-8">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <span className="material-symbols-outlined rounded-lg bg-secondary p-2 text-xl text-on-secondary w-fit">
                                auto_stories
                            </span>
                            <div>
                                <h2 className="headline-sm">Book details</h2>
                                <p className="mt-1 text-sm text-on-surface-variant">Capture the key publication and product metadata for this book.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6 p-5 sm:p-8">
                    <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                        {bookAttributesFields.map((field) => {
                            const fieldName = field.name as keyof BookAttributesType
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

                <Button type="submit" className="rounded-lg w-fit self-end mr-5 border border-outline-variant px-5 py-2.5 text-sm font-bold text-on-surface transition hover:bg-surface-container" variant="outline">
                    <Save />
                    Save Book Attributes
                </Button>
            </section>
        </form>
    )
}

export default BookAttributes
