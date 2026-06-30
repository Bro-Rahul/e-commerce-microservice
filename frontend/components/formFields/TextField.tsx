import { TextFieldSchema } from '@/types/formFields';
import { Input } from '../ui/input';
import { useFormContext, Controller } from 'react-hook-form';
import { Label } from '../ui/label';
import { Lock } from 'lucide-react';

const TextField = ({ textField }: { textField: TextFieldSchema }) => {
    const { control } = useFormContext();
    return (
        <Controller
            name={textField.name}
            control={control}
            defaultValue={''}
            render={({ fieldState: { error }, field: { name, value, onChange } }) =>
                <div className="grid gap-1">
                    <Label className="text-sm font-bold">{textField.label} <span className="text-destructive">*</span></Label>
                    <Input
                        className='fieldClassName'
                        placeholder={textField.placeholder}
                        type={textField.type}
                        name={name}
                        value={value}
                        required
                        readOnly={textField.readOnly}
                        onChange={e => onChange(e.target.value)}
                    />
                    {textField.readOnly && <Lock className="size-4" />}
                    {error?.message && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
                </div>
            }
        />
    );
}


export default TextField