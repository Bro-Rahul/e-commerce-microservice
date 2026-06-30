import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProductInventorySchema } from '@/validators/addProduct';
import { Controller, useFormContext } from 'react-hook-form'

interface VariantAttributesProps {
    variantIndex: number,
    attributeIdx: number,
    handleRemoveAttribute: () => void

}

const VariantAttributes = ({ attributeIdx, variantIndex, handleRemoveAttribute }: VariantAttributesProps) => {
    const { control } = useFormContext<ProductInventorySchema>();
    return (
        <div className='relative'>
            <Controller
                name={`inventory.${variantIndex}.varientAttributes.${attributeIdx}.key`}
                control={control}
                render={({ field: { value, onChange }, fieldState: { error } }) =>
                    <div className="rounded-lg border p-3">
                        <Input
                            type='text'
                            className="text-xs uppercase text-muted-foreground"
                            name={`inventory.${variantIndex}.varientAttributes.${attributeIdx}.key`}
                            value={value}
                            onChange={e => onChange(e.target.value)}
                            placeholder='Enter Attribute Key'
                        />

                    </div>
                }
            />
            <Controller
                name={`inventory.${variantIndex}.varientAttributes.${attributeIdx}.value`}
                control={control}
                render={({ field: { value, onChange }, fieldState: { error } }) =>
                    <div className="rounded-lg border p-3">
                        <Input
                            type='text'
                            className="mt-1 font-medium"
                            name={`inventory.${variantIndex}.varientAttributes.${attributeIdx}.value`}
                            value={value}
                            onChange={e => onChange(e.target.value)}
                            placeholder='Enter Attribute Value'
                        />
                    </div>
                }
            />
            <Button
                onClick={handleRemoveAttribute}
                variant={'outline'}
                className="absolute -top-5 -right-5 rounded-md p-1 transition-colors hover:bg-muted cursor-pointer">
                <span className="material-symbols-outlined text-[10px]">
                    cancel
                </span>
            </Button>
        </div>
    )
}

export default VariantAttributes