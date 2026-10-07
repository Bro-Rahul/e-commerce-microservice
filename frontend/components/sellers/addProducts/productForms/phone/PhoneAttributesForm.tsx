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
import useAddProduct from '@/store/useAddProduct'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

const phoneAttributeDefaults: PhoneAttributeType = {
    brand: '',
    cpuSpeed: '',
    installedRam: '',
    memoryStorage: '',
    operatingSystem: ''
}


const PhoneAttributesForm = () => {
    const { addProductMetaDetail, products } = useAddProduct()
    const { currentVariant, variants } = products['phone']
    const { productMetaDetail } = variants[currentVariant]
    const { control, handleSubmit, reset } = useForm<PhoneAttributeType>({
        defaultValues: phoneAttributeDefaults,
        resolver: zodResolver(phoneAttributeValidator)
    })

    useEffect(() => {
        const setProductValues = () => {
            const { currentVariant, variants } = useAddProduct.getState().products.phone
            const metaDetail = variants[currentVariant].productMetaDetail
            const attribute = metaDetail?.attribute ?? {}

            reset({ ...phoneAttributeDefaults, ...attribute })
        }

        if (useAddProduct.persist.hasHydrated()) {
            setProductValues()
            return
        }

        const unsubscribe =
            useAddProduct.persist.onFinishHydration(() => {
                setProductValues()
            })

        return unsubscribe;

    }, [reset, currentVariant])

    const onSubmit = (data: PhoneAttributeType) => {
        addProductMetaDetail("phone", {
            "attribute": data
        });
        toast.success("Product Attribute has been Saved", {
            position: 'bottom-right',
            duration: 5000
        })
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