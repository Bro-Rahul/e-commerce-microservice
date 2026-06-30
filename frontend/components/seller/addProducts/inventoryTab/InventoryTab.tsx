import SectionHeading from '../SectionHeading'
import { Package, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { ProductInventorySchema, productInventoryValidator } from '@/validators/addProduct'
import { zodResolver } from '@hookform/resolvers/zod'
import VariantForm from './VariantForm'
import useAddProduct from '@/store/useAddProduct'
import { useEffect } from 'react'
import { AvailableCategory } from '@/types/seller'
import toast from 'react-hot-toast'

interface InventoryTabProps {
    category: AvailableCategory
}

const InventoryTab = ({ category }: InventoryTabProps) => {
    const { setInventory, inventory } = useAddProduct();
    const method = useForm<ProductInventorySchema>({
        resolver: zodResolver(productInventoryValidator),
        defaultValues: {
            inventory: []
        }
    });
    const { fields, append, remove } = useFieldArray({
        name: "inventory",
        control: method.control
    })

    useEffect(() => {
        const unsub = useAddProduct.persist.onFinishHydration((state) => {
            method.reset(state.inventory[category]);
        });

        if (useAddProduct.persist.hasHydrated()) {
            method.reset(useAddProduct.getState().inventory[category]);

        }
        return unsub;
    }, []);

    const onSubmit = (data: ProductInventorySchema) => {
        console.log("data")
        console.log(data)
        setInventory(data, category);
        toast.success("Stock Detail has been saved!", {
            position: 'bottom-right',
            duration: 5000
        })
    }


    const addNewVarient = () => {
        append({
            price: 0,
            sku: '',
            stock: 0,
            varientName: "",
            varientAttributes: []
        })
    }


    return (
        <FormProvider {...method}>
            <form
                onSubmit={method.handleSubmit(onSubmit)}
                className="overflow-hidden rounded-xl border bg-white shadow-sm">
                <div className="flex items-start justify-between border-b px-6 py-5">
                    <div className="flex-1">
                        <SectionHeading>
                            <Package className="size-5 text-primary" />
                            3. Stock & Variants
                        </SectionHeading>

                        <p className="-mt-4 text-sm text-muted-foreground">
                            Manage product variants, pricing and inventory.
                        </p>
                    </div>

                    <Button
                        type='button'
                        onClick={addNewVarient}
                        className="flex shrink-0 items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/85"
                    >
                        <Plus className="size-4" />
                        Add Variant
                    </Button>
                </div>

                <div className="overflow-x-auto">
                    {fields.map((field, index) =>
                        <VariantForm
                            key={field.id}
                            variantIndex={index}
                            handleRemoveVarient={() => remove(index)}

                        />)}
                </div>
                {method.formState.errors.inventory?.message && <p className='text-sm mt-1 text-red-500 ml-3'>{method.formState.errors.inventory.message}</p>}
                <Button className='w-full mt-5 cursor-pointer hover:bg-primary/85'>Save</Button>
            </form>

        </FormProvider>
    )
}

export default InventoryTab