import { Button } from '@/components/ui/button'
import { Save, Package2 } from 'lucide-react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import useAddProduct from '@/store/useAddProduct'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { inventoryFields } from '@/constants/formFields/inventoryFields'
import { InventoryFieldType, inventoryFieldValidator } from '@/validators/inventoryValidator'
import FormCard from '../productForms/FormCard'
import AdditionalFieldsForm from './AdditionalFieldsForm'
import Field from '@/components/auth/Field'
import { AvailableCategoryType } from '@/types/inventoryTypes'
import JsonUploadBtn from '../JsonUploadBtn'
import { inventoryFieldsDefaults } from '@/constants/data/inventoryData'

const InventoryForm = ({ category }: { category: AvailableCategoryType }) => {
    const { addInventory, products } = useAddProduct();
    const { currentVariant } = products[category]
    const methods = useForm<InventoryFieldType>({
        resolver: zodResolver(inventoryFieldValidator),
        defaultValues: inventoryFieldsDefaults,
    });

    useEffect(() => {
        const setProductValues = () => {
            const { variants, currentVariant } = useAddProduct.getState().products[category]
            const inventory = variants[currentVariant].inventory ?? inventoryFieldsDefaults
            methods.reset(inventory)
        }

        if (useAddProduct.persist.hasHydrated()) {
            setProductValues()
            return
        }

        const unsubscribe = useAddProduct.persist.onFinishHydration(() => {
            setProductValues()
        })

        return unsubscribe
    }, [category, currentVariant, methods.reset])

    const handleSubmit = (data: InventoryFieldType) => {
        addInventory(category, data)
        toast.success('Inventory Data Saved!', {
            position: 'bottom-right',
            duration: 5000,
        })
    }

    const onErr = (err: any) => {
        console.log('error')
        console.log(err)
    }

    return (
        <FormProvider {...methods}>
            <FormCard
                Icon={Package2}
                heading="Inventory data"
                description="Manage stock levels, pricing, and internal product tracking."
                headerActions={
                    <JsonUploadBtn
                        schema={inventoryFieldValidator}
                        onSuccess={(data) => {
                            handleSubmit(data);
                            methods.reset(data);
                        }}
                    />}
            >
                <form onSubmit={methods.handleSubmit(handleSubmit, onErr)}>
                    <div className="grid grid-cols-1 gap-7 p-5 sm:p-8 md:grid-cols-2">
                        {inventoryFields.map((item) => {
                            if (item.name === 'additionalFields') return null

                            return (
                                <Controller
                                    key={String(item.name)}
                                    name={item.name}
                                    control={methods.control}
                                    render={({ field, fieldState: { error } }) => (

                                        <Field
                                            htmlFor={item.name}
                                            label={item.label}
                                            error={error?.message}
                                        >
                                            {item.type === 'textarea' ? (
                                                <textarea
                                                    className="textareafield"
                                                    {...field}
                                                    placeholder={item.placeholder}
                                                />
                                            ) : (
                                                <input
                                                    className="inputfields"
                                                    {...field}
                                                    type={item.type}
                                                    placeholder={item.placeholder}
                                                    value={field.value ?? ''}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />
                            )
                        })}
                    </div>
                    <AdditionalFieldsForm />


                    <div className="flex justify-end border-t border-outline-variant bg-surface-container-low px-5 py-4 sm:px-8">
                        <Button
                            className="w-fit bg-card font-bold text-on-secondary hover:bg-secondary/90"
                            variant={'outline'}
                            type="submit"
                        >
                            <Save />
                            Save Inventory Data
                        </Button>
                    </div>
                </form>
            </FormCard>
        </FormProvider>
    )
}

export default InventoryForm