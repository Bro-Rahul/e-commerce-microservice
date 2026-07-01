import ArrayField from "@/components/formFields/ArrayField";
import DateField from "@/components/formFields/DateField";
import ImageUploadField from "@/components/formFields/FileUploadField";
import NumericField from "@/components/formFields/NumericField";
import SelectField from "@/components/formFields/SelectField";
import TextAreaField from "@/components/formFields/TextAreaField";
import TextField from "@/components/formFields/TextField";
import { FormFieldSchema } from "@/types/formFields";

type FieldComponent<T extends FormFieldSchema> = React.ComponentType<{
    schema: T;
}>;

type FieldRegistry = {
    [K in FormFieldSchema["type"]]: FieldComponent<
        Extract<FormFieldSchema, { type: K }>
    >;
};

const fieldRegistry: FieldRegistry = {
    text: TextField,
    select: SelectField,
    number: NumericField,
    textarea: TextAreaField,
    date: DateField,
    file: ImageUploadField,
    array: ArrayField
};

export default fieldRegistry;