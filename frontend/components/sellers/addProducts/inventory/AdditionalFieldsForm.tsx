import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { PhoneInventoryForm } from './PhoneInventory';
import { AdditionalFieldsType } from '@/validators/inventoryValidator';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { phoneInventoryFieldsDefaults } from '@/constants/data';


interface AdditionalFieldsForm {
    additionalFields: AdditionalFieldsType;
}

interface AdditionalFieldsProps {
    variantIndex: number
}

const AdditionalFieldsForm = ({ variantIndex }: AdditionalFieldsProps) => {
    const { control, register } = useFormContext<PhoneInventoryForm>();
    const { fields, remove, append } = useFieldArray<PhoneInventoryForm, `inventory.${number}.additionalFields`>({
        control: control,
        name: `inventory.${variantIndex}.additionalFields`
    });

    return (
        <div className="space-y-5 rounded-lg border border-outline-variant p-4 sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h4 className="text-base font-bold text-on-surface">Additional fields</h4>
                    <p className="mt-1 text-sm text-on-surface-variant">Add optional details such as color, size, or warehouse location.</p>
                </div>
                <Button
                    className="self-start text-sm font-bold text-primary"
                    onClick={() => append({ key: "", value: "" })} type="button" variant="outline">
                    <Plus />
                    Add field
                </Button>
            </div>

            {fields.length > 0 ? (
                <div className="space-y-3">
                    {fields.map((field, fieldIndex) => (
                        <div className="grid grid-cols-1 items-end gap-3 rounded-lg border border-outline-variant bg-surface-container-low p-3 sm:grid-cols-[1fr_1fr_auto]" key={field.id}>
                            <Controller
                                control={control}
                                name={`inventory.${variantIndex}.additionalFields.${fieldIndex}.key`}
                                render={({ fieldState: { error } }) => <label
                                    className="space-y-1.5 text-xs font-bold text-on-surface-variant">
                                    Key
                                    <input
                                        className="inputfields my-2"
                                        {...register(`inventory.${variantIndex}.additionalFields.${fieldIndex}.key`)}
                                    />
                                    {error?.message && <p className='error'>{error.message}</p>}
                                </label>

                                }
                            />
                            <Controller
                                name={`inventory.${variantIndex}.additionalFields.${fieldIndex}.value`}
                                control={control}
                                render={({ fieldState: { error } }) => <label
                                    className="space-y-1.5 text-xs font-bold text-on-surface-variant">
                                    Value
                                    <input
                                        className="inputfields my-2"
                                        {...register(`inventory.${variantIndex}.additionalFields.${fieldIndex}.value`)}

                                    />
                                    {error?.message && <p className='error'>{error.message}</p>}
                                </label>}
                            />
                            <Button
                                aria-label={`Remove additional field ${fieldIndex + 1}`}
                                className="self-end text-on-surface-variant hover:bg-error-container hover:text-error"
                                onClick={() => remove(fieldIndex)}
                                size="icon-sm" type="button" variant="ghost">
                                <Trash2 />
                            </Button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="rounded-lg border border-dashed border-outline-variant px-4 py-5 text-center text-sm text-on-surface-variant">No additional fields added for this variant.</p>
            )}
        </div>
    )
}

export default AdditionalFieldsForm

