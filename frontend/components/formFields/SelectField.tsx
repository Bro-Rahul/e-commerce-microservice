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
    selectField: SelectFieldSchema;
};

const SelectField = ({
    selectField,
}: SelectFieldProps) => {
    const { control } = useFormContext();
    return (
        <Controller
            name={selectField.name}
            control={control}

            render={({ field: { name, value, onChange }, fieldState: { error } }) =>
                <div className="flex flex-col gap-2">
                    <Label htmlFor={selectField.name} className="text-sm font-bold">
                        {selectField.label}
                    </Label>

                    <Select
                        value={value}
                        onValueChange={e => onChange(e)}
                    >
                        <SelectTrigger
                            id={selectField.name}
                            className="w-full"
                        >
                            <SelectValue
                                placeholder={`Select ${selectField.label}`}
                            />
                        </SelectTrigger>

                        <SelectContent>
                            {selectField.options.map((option) => (
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