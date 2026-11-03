"use client"
import Field from '@/components/auth/Field'
import FormCard from '@/components/sellers/addProducts/productForms/FormCard'
import { Button } from '@/components/ui/button'
import { adminRepositary } from '@/repositary/admin/adminRepositary'
import { CategoryNamesResponseType } from '@/types/products/SellerProductListType'
import { CreateCategoryType, createCategoryValidator } from '@/validators/category/categoryValidators'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronDown, PlusCircle, Network } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface CategoryFormProps {
    availableCategories: CategoryNamesResponseType[]
}

const CategoryForm = ({ availableCategories }: CategoryFormProps) => {

    const names = availableCategories.map(item => item.name);

    const { control, handleSubmit, reset } = useForm<CreateCategoryType>({
        defaultValues: {
            name: '',
            description: '',
            parentCategoryName: ""
        },
        resolver: zodResolver(createCategoryValidator(names))
    });

    const onSubmit = async (data: CreateCategoryType) => {
        try {
            await adminRepositary.post.createNewCategory(data);
            toast.success("Created ", {
                position: "bottom-right",
                duration: 5000
            })
            reset();
        } catch (err: any) {
            toast.error(err.message ?? "Can't create category at this moment", {
                position: "bottom-right",
                duration: 5000
            })
        }
    }

    const onErr = (err: any) => {
        console.log(err)
        toast.error(err.message ?? "fail", {
            position: "bottom-right",
            duration: 5000
        })
    }
    return (
        <FormCard
            Icon={Network}
            heading='General Information'
            description='Define identity, hierarchy, and customer-facing slug.'
        >
            <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit, onErr)} >
                <section
                    className="rounded-xl border border-outline-variant/50 bg-card p-5 shadow-sm sm:p-8"
                >
                    <div className="space-y-16 gap-5 flex flex-col">
                        <Controller
                            control={control}
                            name='name'
                            render={({ field, fieldState: { error } }) =>
                                <Field
                                    htmlFor='categoryName'
                                    label='Category Name'
                                    error={error?.message}
                                    optionalText='Use clear, search-friendly titles that customers instinctively browse.'>
                                    <input
                                        autoComplete="off"
                                        className='inputfields'
                                        placeholder="e.g. Smart Wearables & Fitness"
                                        {...field}
                                    />
                                </Field>
                            }

                        />

                        <Controller
                            control={control}
                            name='parentCategoryName'
                            render={({ field: { onChange, value, name }, fieldState: { error } }) =>
                                <Field
                                    htmlFor='parentCategory'
                                    label='Parent Category'
                                    optionalText='Select parent Category else blank'
                                    error={error?.message}
                                >

                                    <select
                                        className='inputfields uppercase'
                                        value={value}
                                        name={name}
                                        onChange={e => onChange(e.target.value)}
                                    >
                                        <option value="">No parent (top-level category)</option>
                                        {availableCategories.map((item) => <option key={item.name} value={item.name} className='uppercase'>{item.name}</option>
                                        )}
                                    </select>
                                    <ChevronDown
                                        aria-hidden="true"
                                        className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                                    />
                                </Field>}
                        />

                        <Controller
                            control={control}
                            name='description'
                            render={({ field, fieldState: { error } }) =>
                                <Field
                                    htmlFor='categoryDescription'
                                    label='Catalog Description &amp; Meta Summary'
                                    error={error?.message}
                                >
                                    <textarea
                                        {...field}
                                        className='textareafield'
                                        maxLength={280}
                                        placeholder="Provide a concise catalog overview for category landing pages and search engine snippets..."
                                        rows={4}
                                    />
                                </Field>
                            }
                        />
                    </div>
                    <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row sm:items-center">
                        <div className="flex flex-col gap-3 sm:flex-row self-end">
                            <Button
                                type="submit"
                            >
                                <PlusCircle aria-hidden="true" className="size-5" />
                                Create Category
                            </Button>
                        </div>
                    </div>
                </section>
            </form>
        </FormCard>)
}

export default CategoryForm