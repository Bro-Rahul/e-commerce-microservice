import { phoneInventoryFields } from '@/constants/formFields/phoneFields'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Trash2, Plus, Save, Copy } from 'lucide-react'
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { PhoneInventoryType, phoneInventoryValidators } from '@/validators/inventoryValidator'
import { phoneInventoryFieldsDefaults } from '@/constants/data'
import AdditionalFieldsForm from './AdditionalFieldsForm'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import useAddProduct from '@/store/useAddProduct'
import { useEffect } from 'react'
import toast from 'react-hot-toast'


export interface PhoneInventoryForm {
    inventory: PhoneInventoryType[]
}


const inventoryResolver = z.object({
    inventory: z.array(phoneInventoryValidators),
})

const PhoneInventory = () => {
    const { updateProductInventory, addNewProductInventory } = useAddProduct();
    const methods = useForm<PhoneInventoryForm>({
        resolver: zodResolver(inventoryResolver),
        defaultValues: {
            inventory: [
                phoneInventoryFieldsDefaults
            ],
        },
    });

    const { fields, remove, append } = useFieldArray<PhoneInventoryForm, 'inventory'>({
        control: methods.control,
        name: 'inventory',
    });

    const handleCopy = (index: number) => {
        const { id, disabled, ...rest } = fields[index];
        append(rest);
        addNewProductInventory('phone', index);
    }

    useEffect(() => {
        const setProductValues = () => {
            const product = useAddProduct.getState().products.phone
            const inventory = product.inventory as PhoneInventoryType[]
            if (inventory.length > 0) {
                methods.reset({
                    inventory,
                })
            }
        }

        if (useAddProduct.persist.hasHydrated()) {
            setProductValues()
            return
        }

        const unsubscribe =
            useAddProduct.persist.onFinishHydration(() => {
                setProductValues()
            })

        return unsubscribe
    }, [methods.reset])


    const handleSubmit = (data: PhoneInventoryForm) => {
        updateProductInventory('phone', data.inventory)
        toast.success("Inventory Data Saved!", {
            position: 'bottom-right',
            duration: 5000
        })
    }

    const onErr = (err: any) => {
        console.log("error")
        console.log(err);
    }


    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit, onErr)}>
                <section className="border-t border-outline-variant py-5 flex flex-col">
                    <div className="border-b border-outline-variant bg-surface-container-low px-5 py-4 sm:px-8">
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                <span className="material-symbols-outlined rounded-lg bg-secondary p-2 text-xl text-on-secondary w-fit">
                                    inventory_2
                                </span>
                                <div>
                                    <h2 className="headline-sm">Inventory data</h2>
                                    <p className="mt-1 text-sm text-on-surface-variant">Manage stock levels, pricing, and internal product tracking.</p>
                                </div>


                            </div>
                            <Button className="self-end bg-secondary font-bold text-on-secondary hover:bg-secondary/90"
                                onClick={() => append(phoneInventoryFieldsDefaults)} type="button">
                                <Plus />
                                Add new variant
                            </Button>
                        </div>
                    </div>
                    <Accordion className="space-y-8 p-5 sm:p-8" defaultValue={['variant-1']} keepMounted multiple>
                        {fields.map((field, index) => (
                            <AccordionItem
                                className="rounded-xl border border-outline-variant p-5 sm:p-6"
                                key={field.id}
                                value={`variant-${field.id}`}>
                                <div className="relative">
                                    <AccordionTrigger className="w-full min-w-0 p-0 pr-16 hover:no-underline">
                                        <span>
                                            <span className="headline-sm block">Stock variant {index + 1}</span>
                                            <span className="mt-1 block text-sm text-on-surface-variant">Enter the stock and optional details for this variant.</span>
                                        </span>
                                    </AccordionTrigger>
                                    <div className="absolute right-8 top-1/2 z-10 flex -translate-y-1/2 shrink-0 items-center gap-1">
                                        {fields.length > 1 && (
                                            <Button
                                                aria-label={`Remove stock variant ${index + 1}`}
                                                className="rounded-md bg-card text-on-surface-variant shadow-sm hover:bg-error-container hover:text-error"
                                                onClick={() => remove(index)}
                                                size="icon-sm"
                                                title="Delete variant"
                                                type="button"
                                                variant="ghost">
                                                <Trash2 />
                                            </Button>
                                        )}
                                        <Button className="self-end font-bold "
                                            onClick={() => handleCopy(index)}
                                            type="button">
                                            <Copy />
                                            Copy
                                        </Button>
                                    </div>
                                </div>

                                <AccordionContent className="space-y-5 mt-3">
                                    <div className="space-y-5 rounded-lg border border-outline-variant bg-surface-container-low p-4 sm:p-5">
                                        <div>
                                            <h4 className="text-base font-bold text-on-surface">Mandatory fields</h4>
                                            <p className="mt-1 text-sm text-on-surface-variant">These fields are required for every stock variant.</p>
                                        </div>
                                        <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                                            {phoneInventoryFields.map((item, idx) => {
                                                if (item.name === "additionalFields") return null;
                                                return <Controller
                                                    key={`${index}-${idx}`}
                                                    name={`inventory.${index}.${item.name}`}
                                                    control={methods.control}
                                                    render={({ fieldState: { error } }) =>
                                                        <div className="space-y-2">
                                                            <label
                                                                className="block text-sm font-bold text-on-surface">
                                                                {item.label}
                                                            </label>
                                                            <input
                                                                className="inputfields"
                                                                {...methods.register(`inventory.${index}.${item.name}`, {
                                                                    valueAsNumber: item.type === "number"
                                                                })}
                                                                placeholder={item.placeholder}
                                                            />
                                                            {error?.message && <p className='error'>{error?.message}</p>}
                                                        </div>
                                                    } />
                                            })}
                                        </div>
                                    </div>
                                    <AdditionalFieldsForm variantIndex={index} />
                                </AccordionContent>
                            </AccordionItem>
                        ))
                        }
                    </Accordion>
                    <Button
                        className="self-end mr-10 bg-card font-bold text-on-secondary hover:bg-secondary/90"
                        variant={'outline'}
                        type='submit'
                    >
                        <Save />
                        Save Data
                    </Button>
                </section>

            </form>
        </FormProvider>
    )
}

export default PhoneInventory