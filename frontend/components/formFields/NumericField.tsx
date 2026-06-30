import { NumericFieldSchema } from '@/types/formFields'
import { Controller, useFormContext } from 'react-hook-form'
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const NumericField = ({ numericField }: { numericField: NumericFieldSchema }) => {
    const { control, } = useFormContext();
    return (
        <Controller
            name={numericField.name}
            control={control}
            defaultValue={0}
            render={({ fieldState: { error }, field: { name, value, onChange } }) =>
                <div className="grid gap-1">
                    <Label className="text-sm font-bold">{numericField.label} <span className="text-destructive">*</span></Label>
                    <Input
                        className='fieldClassName'
                        placeholder={numericField.placeholder}
                        type={numericField.type}
                        name={name}
                        value={value}
                        required
                        onChange={e => onChange(+e.target.value)}
                    />
                    {error?.message && <p className="mt-1 text-xs text-red-500">{error.message}.</p>}
                </div>
            }
        />
    )
}

export default NumericField