import { Button } from '@/components/ui/button';
import { ProductInventorySchema } from '@/validators/addProduct';
import React from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import VariantAttributes from './VariantAttributes';

interface VariantAttributesFormProp {
    variantIndex: number
}

const VariantAttributesForm = ({ variantIndex }: VariantAttributesFormProp) => {
    const { control } = useFormContext<ProductInventorySchema>();

    const { append, remove, fields } = useFieldArray({
        name: `inventory.${variantIndex}.varientAttributes`,
        control: control,
    })

    const addAttributes = () => {
        append({
            key: "",
            value: ""
        })
    }
    return (
        <tr>
            <td colSpan={6} className="bg-muted/20 p-4">
                <div className="rounded-xl border bg-white p-5 flex flex-col gap-3">
                    <div className="mb-5 flex items-center justify-between">
                        <h4 className="flex items-center gap-2 font-semibold">
                            <span className="material-symbols-outlined text-[18px]">
                                tune
                            </span>
                            Variant Attributes
                        </h4>

                        <Button
                            type='button'
                            onClick={addAttributes}
                            variant={'outline'}
                            className="flex items-center gap-1 text-sm font-medium text-primary cursor-pointer">
                            <span className="material-symbols-outlined text-[16px]">
                                add_circle
                            </span>
                            Add Attribute
                        </Button>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {fields.map((field, index) =>
                            <VariantAttributes
                                handleRemoveAttribute={() => remove(index)}
                                attributeIdx={index}
                                variantIndex={variantIndex}
                                key={field.id}
                            />
                        )}
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default VariantAttributesForm