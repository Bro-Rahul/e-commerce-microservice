import { Button } from '@/components/ui/button'
import { Plus, X } from 'lucide-react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { SpecificationForm } from './SpecificationForm'

interface SpecificationKeyValuePairProps {
    specificationIdx: number,
    specificationName: string
}

const SpecificationKeyValuePair = ({ specificationIdx, specificationName }: SpecificationKeyValuePairProps) => {
    const { control, register, formState: { errors } } = useFormContext<SpecificationForm>();

    const { fields, remove, append } = useFieldArray<SpecificationForm, `data.${number}.specifications`>({
        name: `data.${specificationIdx}.specifications`,
        control: control
    })
    return (
        <>

            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <h4 className="headline-sm capitalize">{specificationName}</h4>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                    <Button
                        aria-label={`Add details to ${specificationName}`}
                        className="rounded-lg border border-outline-variant bg-card px-3 py-2 text-xs font-bold text-on-surface hover:border-secondary hover:text-primary"
                        type="button"
                        variant="outline"
                        onClick={() => append({ key: "", value: "" })}
                    >
                        <Plus className="size-4" />
                        Add details
                    </Button>
                </div>
            </div>
            {fields.length > 0 ? (
                <dl className="mt-5 space-y-2">
                    {fields.map((pair, pairIndex) => (
                        <div className="grid grid-cols-1 items-center gap-3 rounded-lg border border-outline-variant bg-card p-3 text-sm lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]" key={`${pair.key}-${pair.value}-${pairIndex}`}>
                            <Controller
                                name={`data.${specificationIdx}.specifications.${pairIndex}.key`}
                                control={control}
                                render={({ fieldState: { error } }) =>
                                    <div className="space-y-1">
                                        <input
                                            className="inputfields"
                                            {...register(`data.${specificationIdx}.specifications.${pairIndex}.key`)}
                                            placeholder="Enter Key"
                                        />

                                        {error?.message && <p className="error">
                                            {error.message}
                                        </p>}
                                    </div>}
                            />
                            <Controller
                                name={`data.${specificationIdx}.specifications.${pairIndex}.value`}
                                control={control}
                                render={({ fieldState: { error } }) =>
                                    <div className="space-y-1">
                                        <input
                                            className="inputfields"
                                            {...register(`data.${specificationIdx}.specifications.${pairIndex}.value`)}
                                            placeholder="Enter Value"
                                        />

                                        {error?.message && <p className="error">
                                            {error.message}
                                        </p>}
                                    </div>}
                            />
                            <Button
                                aria-label={`Remove ${pair.key || "detail"}`}
                                className="text-on-surface-variant hover:bg-error-container hover:text-error"
                                size="icon-xs"
                                type="button"
                                variant="ghost"
                                onClick={() => remove(pairIndex)}
                            >
                                <X />
                            </Button>
                        </div>
                    ))}
                </dl>
            ) : (
                <p className="mt-5 w-full rounded-lg border border-dashed border-outline-variant px-3 py-4 text-center text-xs text-on-surface-variant">
                    No details added yet
                </p>
            )}
        </>
    )
}

export default SpecificationKeyValuePair