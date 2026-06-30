import fieldRegistry from '@/constants/data/formFields';
import { FormFieldSchema } from '@/types/formFields';


const FieldRenderer = ({ fieldsData }: { fieldsData: FormFieldSchema[] }) => {

    return fieldsData.map(field => {
        switch (field.type) {
            case "text":
                return <fieldRegistry.text textField={field} key={field.name} />;

            case "select":
                return <fieldRegistry.select selectField={field} key={field.name} />;

            case 'number':
                return <fieldRegistry.numeric numericField={field} key={field.name} />

            case 'textarea':
                return <fieldRegistry.textArea textAreaField={field} key={field.name} />

            case 'date':
                return <fieldRegistry.date dateField={field} key={field.name} />

            case 'file':
                return <fieldRegistry.file fileField={field} key={field.name} />

        }
    });
}

export default FieldRenderer