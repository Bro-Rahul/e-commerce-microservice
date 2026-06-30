import { TextAreaFieldSchema } from "@/types/formFields"
import { Controller, useFormContext } from "react-hook-form";


const TextAreaField = ({ textAreaField }: { textAreaField: TextAreaFieldSchema }) => {
    const { control } = useFormContext();
    return (
        <Controller
            name={textAreaField.name}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) =>
                <div className="grid gap-1">
                    <label className="text-sm font-bold">{textAreaField.label} <span className="text-destructive">*</span></label>
                    <div className="overflow-hidden rounded-md border border-outline-variant">
                        <textarea
                            name={textAreaField.name}
                            value={value}
                            onChange={e => onChange(e.target.value)}
                            className="min-h-36 w-full resize-y bg-surface-container-lowest p-4 text-sm fieldClassName"
                            placeholder={textAreaField.placeholder}
                            rows={6} />
                    </div>
                    {error?.message && <p className="text-red-500 font-bold">{error.message}</p>}
                </div>}
        />
    )
}

export default TextAreaField;