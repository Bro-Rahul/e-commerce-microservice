"use client"
import { Edit3, Lock, ReceiptText } from 'lucide-react'
import SectionHeading from '../SectionHeading'
import { baseFields } from '@/constants/data/addProducts/phone'
import FieldRenderer from '@/components/formFields/FieldRenderer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import productFields from '@/constants/data/addProducts'
import { FormProvider, useForm } from 'react-hook-form'
import { AvailableCategory } from '@/types/seller'
import { productValidatorMapping } from '@/validators/addProduct'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import useAddProduct from '@/store/useAddProduct'
import { Label } from '@/components/ui/label'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

const ProductDetails = ({ category }: { category: AvailableCategory }) => {
    const validator = productValidatorMapping[category];

    type ValidatorSchema = z.infer<typeof validator>;

    const { products, updateProduct } = useAddProduct();

    const method = useForm<ValidatorSchema>({
        resolver: zodResolver(validator),
        defaultValues: products[category]

    });

    useEffect(() => {
        const unsub = useAddProduct.persist.onFinishHydration((state) => {
            method.reset(state.products[category]);
        });

        if (useAddProduct.persist.hasHydrated()) {
            method.reset(
                useAddProduct.getState().products[category]
            );
        }

        return unsub;
    }, [category, method]);

    const onSubmit = (data: ValidatorSchema) => {
        updateProduct(category, data);
        toast.success("Product Details has been Saved! ", {
            position: "bottom-right",
            duration: 5000
        })
    }
    return (
        <FormProvider {...method}>
            <form onSubmit={method.handleSubmit(onSubmit, (err) => console.log(err))}>
                <div className="space-y-6">
                    <section className='rounded-lg border border-outline-variant bg-surface-container-lowest p-6 shadow-sm'>
                        <SectionHeading>
                            <Edit3 className="size-5 text-primary" />1. Basic Information
                        </SectionHeading>
                        <div className="space-y-5">
                            <div className="grid gap-1">
                                <Label className="text-sm font-bold">Category</Label>
                                <div className="flex items-center justify-between rounded-md border border-outline-variant p-2 text-sm ">
                                    <Input
                                        value={category}
                                        name='category'
                                        disabled
                                        className='fieldClassName font-bold border-none'
                                    />
                                    <Lock className="size-4" />
                                </div>
                            </div>
                            <FieldRenderer fieldsData={baseFields} />
                        </div>
                    </section>

                    <section className='rounded-lg border border-outline-variant bg-surface-container-lowest p-6 shadow-sm'>
                        <SectionHeading>
                            <ReceiptText className="size-5 text-primary" />2. {category} Metadata (Required)
                        </SectionHeading>
                        <div className="grid gap-x-6 gap-y-5 md:grid-cols-2 ">

                            <FieldRenderer fieldsData={productFields[category as keyof typeof productFields]} />
                        </div>
                        <Button className='w-full mt-5 cursor-pointer hover:bg-primary/85'>Save</Button>
                    </section>
                </div>
            </form>
        </FormProvider>
    )
}

export default ProductDetails