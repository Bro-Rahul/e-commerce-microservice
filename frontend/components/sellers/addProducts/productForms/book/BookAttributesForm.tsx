"use client"
import { Button } from '@/components/ui/button'
import { defaultBookAttributes } from '@/constants/data/bookData'
import { bookAttributesFields } from '@/constants/formFields/bookFields'
import { BookAttributesType, bookAttributesValidator } from '@/validators/products/bookValidator'
import { zodResolver } from '@hookform/resolvers/zod'
import { BookOpenText, Save } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import FormCard from '../FormCard'
import JsonUploadBtn from '../../JsonUploadBtn'
import Field from '@/components/auth/Field'


interface BookAttributesFormProps {
    defaultValue: BookAttributesType,
    handleAttributeSubmit: (data: BookAttributesType) => void

}

const BookAttributesForm = ({ defaultValue, handleAttributeSubmit }: BookAttributesFormProps) => {

    const { handleSubmit, register, control, reset, formState: { errors } } = useForm<BookAttributesType>({
        resolver: zodResolver(bookAttributesValidator),
        values: { ...defaultBookAttributes, ...defaultValue }
    })


    const onSubmit = (data: BookAttributesType) => {
        handleAttributeSubmit(data)
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
                        {bookAttributesFields.map((item) => {
                            const fieldName = item.name
                            const fieldError = errors[fieldName]?.message as string | undefined
                            const isNumber = item.type === 'number'
                            const isDate = item.type === 'date'
                            const isTextarea = item.type === 'textarea'
                            const isSelect = item.type === 'select'

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
                                <Controller
                                    key={item.name}
                                    name={item.name}
                                    control={control}
                                    render={({ field, fieldState: { error } }) => <Field
                                        htmlFor={item.name}
                                        label={item.label}
                                        key={item.name}
                                        optionalText={item.helperText}
                                        error={error?.message}
                                    // className={fieldName === 'description' ? 'md:col-span-2' : 'space-y-2'}
                                    >
                                        {/* <label className="block text-sm font-bold text-on-surface">
                                        {field.label}
                                    </label> */}

                                        {isSelect ? (
                                            <select className="inputfields" {...fieldRegister}>
                                                {(item.options ?? []).map((option) => (
                                                    <option key={String(option.value)} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : isTextarea ? (
                                            <textarea
                                                className="textareafield"
                                                {...fieldRegister}
                                                placeholder={item.placeholder}
                                            />
                                        ) : (
                                            <input
                                                className="inputfields"
                                                type={item.type}
                                                {...fieldRegister}
                                                placeholder={item.placeholder}
                                            />
                                        )}

                                        {/* {fieldError && <p className="error">{fieldError}</p>} */}
                                    </Field>}
                                />
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
