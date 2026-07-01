import { TextFieldSchema } from '@/types/formFields';
import { Input } from '../ui/input';
import { useFormContext, Controller } from 'react-hook-form';
import { Label } from '../ui/label';
import { Lock } from 'lucide-react';

const TextField = ({ schema }: { schema: TextFieldSchema }) => {
    const { control } = useFormContext();
    return (
        <Controller
            name={schema.name}
            control={control}
            defaultValue={''}
            render={({ fieldState: { error }, field }) =>
                <div className="grid place-self-start w-full gap-2">
                    <Label className="text-sm font-bold">{schema.label} <span className="text-destructive">*</span></Label>
                    <Input
                        className='fieldClassName'
                        {...field}
                    />
                    {schema.readOnly && <Lock className="size-4" />}
                    {error?.message && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
                </div>
            }
        />
    );
}


export default TextField