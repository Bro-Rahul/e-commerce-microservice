import fieldRegistry from '@/constants/data/formFields';
import { FormFieldSchema } from '@/types/formFields';


const FieldRenderer = ({ fieldsData }: { fieldsData: FormFieldSchema[] }) => {

    return fieldsData.map(field => {
        switch (field.type) {
            case "text":
                return <fieldRegistry.text schema={field} key={field.name} />;

            case "select":
                return <fieldRegistry.select schema={field} key={field.name} />;

            case 'number':
                return <fieldRegistry.number schema={field} key={field.name} />

            case 'textarea':
                return <fieldRegistry.textarea schema={field} key={field.name} />

            case 'date':
                return <fieldRegistry.date schema={field} key={field.name} />

            case 'file':
                return <fieldRegistry.file schema={field} key={field.name} />

            case 'array':
                return <fieldRegistry.array schema={field} key={field.name} />

        }
    });
}

export default FieldRenderer