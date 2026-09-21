"use client"
import { Button } from '@/components/ui/button'
import useAddProduct from '@/store/useAddProduct'
import { AvailableCategoryType } from '@/types/inventoryTypes'
import productBaseFieldsValidator, { ProductBaseFieldsType } from '@/validators/ProductBaseFieldsValidator'
import { zodResolver } from '@hookform/resolvers/zod'
import { Save } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'


const ProductBaseDetailForm = ({ category }: { category: AvailableCategoryType }) => {
    const { setProductBaseDetails, products } = useAddProduct();
    const { push } = useRouter();
    const { handleSubmit, register, control, setValues } = useForm<ProductBaseFieldsType>({
        defaultValues: {
            about: '',
            category,
            description: '',
            title: ''
        },
        resolver: zodResolver(productBaseFieldsValidator)
    });

    useEffect(() => {
        const setProductValues = () => {
            const products = useAddProduct.getState().products
            const product = products[category]

            setValues({
                about: product.baseDetail.about,
                category,
                description: product.baseDetail.description,
                title: product.baseDetail.title,
            })
        }
        if (useAddProduct.persist.hasHydrated()) {
            setProductValues()
            return
        }

        const unsubscribe = useAddProduct.persist.onFinishHydration(() => {
            setProductValues()
        })

        return unsubscribe
    }, [category, setValues])

    const onSubmit = (data: ProductBaseFieldsType) => {
        setProductBaseDetails(category, data);
        toast.success("Product Details Updated", {
            position: 'bottom-right',
            duration: 5000
        });
        push(`/seller/add-product/${category}/media-assets`)

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-7 p-5 sm:p-8">
                <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                    <Controller
                        name='title'
                        control={control}
                        render={({ fieldState: { error } }) =>
                            <div className="space-y-2 md:col-span-2">
                                <label className="block text-sm font-bold text-on-surface" htmlFor="title">
                                    Product title <span className="text-error">*</span>
                                </label>
                                <input
                                    className="inputfields"
                                    {...register('title')}
                                    placeholder="e.g. Wireless noise-cancelling headphones"
                                    type="text"
                                />
                                <p className="text-xs text-on-surface-variant">
                                    Use a clear, specific title that helps customers find your product.
                                </p>
                                {error?.message && <p className='error'>{error.message}</p>}
                            </div>
                        }
                    />

                    <Controller
                        name="category"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                            <div className="space-y-2">
                                <label
                                    className="block text-sm font-bold text-on-surface"
                                    htmlFor="category"
                                >
                                    Category <span className="text-error">*</span>
                                </label>

                                <input
                                    id="category"
                                    className="inputfields"
                                    {...field}
                                    value={category.toUpperCase()}
                                    disabled
                                />

                                {error?.message && (
                                    <p className="error">{error.message}</p>
                                )}
                            </div>
                        )}
                    />
                    <Controller
                        name='description'
                        control={control}
                        render={({ fieldState: { error } }) =>
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-on-surface" htmlFor="description">
                                    Description <span className="text-error">*</span>
                                </label>
                                <input
                                    className="inputfields"
                                    {...register('description')}
                                    placeholder="A short summary of what makes it useful"
                                    type="text"
                                />
                                {error?.message && <p className='error'>{error.message}</p>}
                            </div>
                        }
                    />

                    <Controller
                        name='about'
                        control={control}
                        render={({ fieldState: { error } }) => <div className="space-y-2 md:col-span-2">
                            <label className="block text-sm font-bold text-on-surface" htmlFor="description">
                                About the Product <span className="text-error">*</span>
                            </label>
                            <textarea
                                className="textareafield"
                                id="description"
                                {...register('about')}
                                placeholder="Share the details, benefits, and features customers should know about."

                            />
                            <p className="text-xs text-on-surface-variant">
                                Keep it helpful and easy to scan. Avoid pricing, delivery, or promotional details here.
                            </p>
                            {error?.message && <p className='error'>{error.message}</p>}
                        </div>
                        }
                    />
                </div>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-outline-variant bg-surface-container-low px-5 py-4 sm:flex-row sm:justify-end sm:px-8">
                <Button
                    type='submit'
                    className="rounded-lg border border-outline-variant px-5 py-2.5 text-sm font-bold text-on-surface transition hover:bg-surface-container"
                    variant={'outline'}
                >
                    <Save />
                    Save
                </Button>
            </div>
        </form>
    )
}

export default ProductBaseDetailForm