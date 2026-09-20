
import { Button } from '@/components/ui/button'
import { SpecificationType, specificationValidator } from '@/validators/specificationValidator'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Save, X } from 'lucide-react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import z from 'zod'
import SpecificationNameDialog from './SpecificationNameDialog'
import toast from 'react-hot-toast'
import SpecificationKeyValuePair from './SpecificationKeyValuePair'

export interface SpecificationForm {
    data: SpecificationType
}

const specificationFormValidator = z.object({
    data: specificationValidator
})

const SpecificationForm = () => {

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

    const handleSubmit = (data: SpecificationForm) => {
        console.log("data")
        console.log(data);
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
            <form onSubmit={methods.handleSubmit(handleSubmit, onErr)}>
                <section className="flex flex-col border-t border-outline-variant py-5">
                    <div className="border-b border-outline-variant bg-surface-container-low px-5 py-4 sm:px-8">
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                <span className="material-symbols-outlined w-fit rounded-lg bg-secondary p-2 text-xl text-on-secondary">
                                    instant_mix
                                </span>
                                <div>
                                    <h2 className="headline-sm">Phone Specification Data</h2>
                                    <p className="mt-1 text-sm text-on-surface-variant">List Down Phone Specfications about Cameras,Display,Processor etc.</p>
                                </div>


                            </div>
                            <SpecificationNameDialog
                                handleSave={handleAppend}
                            />
                        </div>
                    </div>
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

export default SpecificationForm