import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFieldArray, useFormContext, Controller } from 'react-hook-form'
import VariantAttributesForm from './VariantAttributesForm';
import { ProductInventorySchema } from '@/validators/addProduct';

interface VariantFormProps {
    variantIndex: number,
    handleRemoveVarient: () => void
}

const VariantForm = ({ variantIndex, handleRemoveVarient }: VariantFormProps) => {
    const { control, } = useFormContext<ProductInventorySchema>();

    const { append, remove, fields } = useFieldArray({
        name: "inventory",
        control: control
    })

    return (
        <table className="w-full border-separate border-spacing-0">
            <thead>
                <tr className="border-b bg-muted/50">
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Variant Name
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        SKU
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Price
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Stock
                    </th>

                    <th className="px-6 py-4" />
                </tr>
            </thead>

            <tbody>
                {/* Variant Row */}
                <tr className="transition-colors hover:bg-muted/30">
                    <Controller
                        control={control}
                        name={`inventory.${variantIndex}.varientName`}
                        render={({ field: { onChange, value }, fieldState: { error } }) =>
                            <td className="px-6 py-5">
                                <div>
                                    <Input
                                        value={value}
                                        name={`inventory.${variantIndex}.varientName`}
                                        onChange={e => onChange(e.target.value)}
                                        placeholder='Enter Varient Name'
                                    />
                                    {error?.message && <p className='text-sm  text-red-500'>{error.message}</p>}
                                </div>
                            </td>
                        }
                    />

                    <Controller
                        name={`inventory.${variantIndex}.sku`}
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) =>
                            <td className="px-6 py-5">
                                <Input
                                    value={value}
                                    name={`inventory.${variantIndex}.sku`}
                                    onChange={e => onChange(e.target.value)}
                                    placeholder='ERGO-CHAIR-V4-BLK-L'
                                />
                                {error?.message && <p className='text-sm text-red-500'>{error.message}</p>}
                            </td>
                        }
                    />

                    <Controller
                        name={`inventory.${variantIndex}.price`}
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) =>
                            <td className="px-6 py-5">
                                <Input
                                    type='number'
                                    value={value}
                                    onChange={e => onChange(+e.target.value)}
                                    name={`inventory.${variantIndex}.price`}
                                    placeholder='Enter the Varient Price'
                                />
                                {error?.message && <p className='text-sm text-red-500'>{error.message}</p>}
                            </td>}
                    />

                    <Controller
                        name={`inventory.${variantIndex}.stock`}
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) =>
                            <td className="px-6 py-5">
                                <div className="flex items-center gap-2">
                                    <Input
                                        type='number'
                                        value={value}
                                        onChange={e => onChange(+e.target.value)}
                                        name={`inventory.${variantIndex}.stock`}
                                        placeholder='Enter the Available stock'
                                    />
                                </div>
                                {error?.message && <p className='text-sm text-red-500'>{error.message}</p>}
                            </td>
                        }
                    />

                    <td className="px-6 py-5 text-right">
                        <Button
                            onClick={handleRemoveVarient}
                            variant={'outline'}
                            className="rounded-md p-2 transition-colors hover:bg-muted cursor-pointer">
                            <span className="material-symbols-outlined text-[20px]">
                                cancel
                            </span>
                        </Button>
                    </td>
                </tr>

                {/* Expanded Details */}
                <VariantAttributesForm
                    variantIndex={variantIndex}
                />
            </tbody>
        </table>
    )
}

export default VariantForm