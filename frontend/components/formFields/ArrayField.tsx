import { ArrayFieldSchema } from "@/types/formFields";
import { useFieldArray, useFormContext, get } from "react-hook-form";
import { Button } from "../ui/button";
import { Plus, Trash2 } from "lucide-react";
import FieldRenderer from "./FieldRenderer";

interface ArrayFieldProps {
    schema: ArrayFieldSchema;
}

const ArrayField = ({ schema }: ArrayFieldProps) => {
    const { control, formState: { errors }, } = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name: schema.name,
    });
    const arrayError = get(errors, `${schema.name}.root.message`);

    const childField = schema.childrenFieldType;

    return (
        <div className="space-y-3 grid gap-1 place-self-start w-full">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">{schema.label}</h3>

                <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={() => append("")}
                >
                    <Plus className="size-4" />
                </Button>
            </div>

            <div className="max-h-72 overflow-y-auto rounded-lg border bg-muted/20 p-3">
                <div className="space-y-3">
                    {fields.length === 0 && (
                        <div className="flex h-20 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
                            No entries added
                        </div>
                    )}

                    {fields.map((field, index) => (
                        <div
                            key={field.id}
                            className="flex items-start rounded-md bg-background p-3 shadow-sm"
                        >
                            <div className="flex-1">
                                <FieldRenderer
                                    fieldsData={[
                                        {
                                            ...childField,
                                            name: `${schema.name}.${index}`,
                                            label: `${childField.label} ${index + 1}`,
                                        },
                                    ]}
                                />
                            </div>

                            <Button
                                type="button"
                                size="icon"
                                variant="destructive"
                                onClick={() => remove(index)}
                            >
                                <Trash2 className="size-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            {arrayError && (
                <p className="mt-1 text-xs text-red-500">{arrayError}</p>
            )}
        </div>
    );
};

export default ArrayField;