import { SelectFieldSchema } from "@/types/formFields";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Controller, useFormContext } from "react-hook-form";

type SelectFieldProps = {
    schema: SelectFieldSchema;
};

const SelectField = ({
    schema,
}: SelectFieldProps) => {
    const { control } = useFormContext();
    return (
        <Controller
            name={schema.name}
            control={control}

            render={({ field: { name, value, onChange }, fieldState: { error } }) =>
                <div className="flex flex-col gap-2">
                    <Label htmlFor={schema.name} className="text-sm font-bold">
                        {schema.label}
                    </Label>

                    <Select
                        value={value}
                        onValueChange={e => onChange(e)}
                    >
                        <SelectTrigger
                            id={schema.name}
                            className="w-full"
                        >
                            <SelectValue
                                placeholder={`Select ${schema.label}`}
                            />
                        </SelectTrigger>

                        <SelectContent>
                            {schema.options.map((option) => (
                                <SelectItem
                                    key={option.label}
                                    value={option.value}
                                >
                                    <span className="truncate">
                                        {option.label}
                                    </span>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {error?.message && <p className="mt-1 text-xs text-red-500">{error.message}.</p>}
                </div>
            }
        />
    );
};

export default SelectField;