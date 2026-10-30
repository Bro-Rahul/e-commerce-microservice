"use client"
import Field from '@/components/auth/Field'
import { Button } from '@/components/ui/button'
import { phoneAttributeFields } from '@/constants/formFields/phoneFields'
import { PhoneAttributeType, phoneAttributeValidator } from '@/validators/products/phoneValidator'
import { zodResolver } from '@hookform/resolvers/zod'
import { Save, Smartphone } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import FormCard from '../FormCard'
import JsonUploadBtn from '../../JsonUploadBtn'
import toast from 'react-hot-toast'
import { phoneAttributeDefaults } from '@/constants/data/phoneData'

interface PhoneAttributesFormProps {
    defaultAttribute: PhoneAttributeType,
    handleAttributeSubmit: (data: PhoneAttributeType) => void;
}

const PhoneAttributesForm = ({ defaultAttribute, handleAttributeSubmit }: PhoneAttributesFormProps) => {
    const { control, handleSubmit, reset } = useForm<PhoneAttributeType>({
        values: { ...phoneAttributeDefaults, ...defaultAttribute },
        resolver: zodResolver(phoneAttributeValidator)
    })


    const onSubmit = (data: PhoneAttributeType) => {
        handleAttributeSubmit(data);
    }
    return (
        <FormCard
            Icon={Smartphone}
            heading='Phone Attributes'
            description='Enter Phone Specific Data'
            headerActions={
                <JsonUploadBtn
                    schema={phoneAttributeValidator}
                    onSuccess={(data) => {
                        onSubmit(data);
                        reset(data)
                    }}
                />
            }
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-8">
                    {phoneAttributeFields.map(item =>
                        <Controller
                            key={item.name}
                            name={item.name}
                            control={control}
                            render={({ field, fieldState: { error } }) =>
                                <Field
                                    htmlFor={item.name}
                                    label={item.label}
                                    error={error?.message}
                                >
                                    <input
                                        {...field}
                                        placeholder={item.placeholder}
                                        className='inputfields'
                                        type={item.type}
                                    />
                                </Field>
                            }
                        />
                    )}
                </div>

                <div className="flex justify-end border-t border-outline-variant bg-surface-container-low px-5 py-4 sm:px-8">
                    <Button
                        className="w-fit bg-card font-bold text-on-secondary hover:bg-secondary/90"
                        variant={'outline'}
                        type='submit'
                    >
                        <Save />
                        Save Data
                    </Button>
                </div>
            </form>
        </FormCard>
    )
}

export default PhoneAttributesForm