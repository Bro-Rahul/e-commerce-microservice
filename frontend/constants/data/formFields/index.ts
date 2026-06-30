import DateField from "@/components/formFields/DateField";
import ImageUploadField from "@/components/formFields/FileUploadField";
import NumericField from "@/components/formFields/NumericField";
import SelectField from "@/components/formFields/SelectField";
import TextAreaField from "@/components/formFields/TextAreaField";
import TextField from "@/components/formFields/TextField";

const fieldRegistry = {
    text: TextField,
    select: SelectField,
    numeric: NumericField,
    textArea: TextAreaField,
    date: DateField,
    file: ImageUploadField,
};

export default fieldRegistry;