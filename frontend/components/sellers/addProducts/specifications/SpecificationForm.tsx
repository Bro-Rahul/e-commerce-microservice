
import { Button } from '@/components/ui/button'
import { SpecificationType, specificationValidator } from '@/validators/specificationValidator'
import { zodResolver } from '@hookform/resolvers/zod'
import { ListChecks, Save, X } from 'lucide-react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import z from 'zod'
import SpecificationNameDialog from './SpecificationNameDialog'
import toast from 'react-hot-toast'
import SpecificationKeyValuePair from './SpecificationKeyValuePair'
import { useEffect } from 'react'
import useAddProduct from '@/store/useAddProduct'
import FormCard from '../productForms/FormCard'
import JsonUploadBtn from '../JsonUploadBtn'
import { AvailableCategoryType } from '@/types/inventoryTypes'
import { productStateDefaults } from '@/constants/data/productData'

export interface SpecificationForm {
    data: SpecificationType
}

const specificationFormValidator = z.object({
    data: specificationValidator
})

const SpecificationForm = ({ category }: { category: AvailableCategoryType }) => {
    const { addProductMetaDetail, products } = useAddProduct();
    const { currentVariant } = products[category];

    const methods = useForm<SpecificationForm>({
        defaultValues: {
            data: []
        },
        resolver: zodResolver(specificationFormValidator)
    })

    const { fields, append, remove } = useFieldArray<SpecificationForm, 'data'>({
        name: "data",
        control: methods.control
    })


    useEffect(() => {
        const setProductValues = () => {
            const { variants, currentVariant } = useAddProduct.getState().products[category]
            const metaDetail = variants[currentVariant].productMetaDetail
            const specification = metaDetail?.specifications ?? productStateDefaults.productMetaDetail
            methods.reset({
                data: specification
            })
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
    }, [category, currentVariant, methods.reset])

    const handleSubmit = (specifications: SpecificationForm) => {
        addProductMetaDetail(category, {
            "specifications": specifications.data
        });
        toast.success("Specifications Data Saved!", {
            position: 'bottom-right',
            duration: 5000
        })
    }

    const onErr = (err: any) => {
        console.log("err")
        console.log(err);
    }

    const handleAppend = (name: string) => {
        const isPresent = fields.some(field => field.name === name);
        if (!isPresent) {
            append({ name: name, specifications: [] })
            return;
        }
        toast.error("Specification Name Already Exists", {
            position: "bottom-right",
            duration: 5000,
        })
    }
    return (
        <FormProvider {...methods}>
            <FormCard
                Icon={ListChecks}
                heading="Phone Specification Data"
                description="List down phone specifications about cameras, display, processor, and more."
                headerActions={
                    <>
                        <SpecificationNameDialog handleSave={handleAppend} />
                        <JsonUploadBtn
                            schema={specificationFormValidator}
                            onSuccess={data => {
                                handleSubmit(data)
                                methods.reset(data)
                            }}
                        />
                    </>
                }
            >
                <form onSubmit={methods.handleSubmit(handleSubmit, onErr)}>
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 p-5 w-full sm:p-8">
                        {fields.map((field, index) => (
                            <article className="relative rounded-xl border border-outline-variant p-5 sm:p-6" key={field.id}>
                                <Button
                                    aria-label={`Remove ${field.name} group`}
                                    className="absolute -top-3 -right-2 text-on-surface-variant hover:bg-error-container hover:text-error"
                                    size="icon-sm"
                                    type="button"
                                    variant="ghost"
                                    onClick={() => remove(index)}
                                >
                                    <X className='size-6' />
                                </Button>
                                <SpecificationKeyValuePair specificationIdx={index} specificationName={field.name} />
                            </article>

                        ))}

                        {fields.length === 0 && (
                            <p className="rounded-xl w-full border border-dashed border-outline-variant bg-surface-container-low px-5 py-12 text-center text-sm text-on-surface-variant col-span-2">
                                No specification groups added yet. Use the button above to create one.
                            </p>
                        )}
                    </div>
                    <div className="flex justify-end border-t border-outline-variant bg-surface-container-low px-5 py-4 sm:px-8">
                        <Button
                            className="self-end bg-card font-bold text-on-secondary hover:bg-secondary/90"
                            variant={'outline'}
                            type='submit'
                        >
                            <Save />
                            Save Data
                        </Button>
                    </div>
                </form>
            </FormCard>
        </FormProvider>
    )

}

export default SpecificationForm