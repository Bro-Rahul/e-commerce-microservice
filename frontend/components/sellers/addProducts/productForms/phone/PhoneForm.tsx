import PhoneInventory from '../../inventory/PhoneInventory'
import SpecificationForm from '../../specifications/SpecificationForm'
import ArrayFields, { ArrayDataType } from '../../inventory/ArrayFields'
import useAddProduct from '@/store/useAddProduct'


const PhoneForm = () => {
    const { updateMetaDetails } = useAddProduct();

    const onSave = (data: ArrayDataType[]) => {
        updateMetaDetails("phone", {
            "insideBox": data
        });
    }


    return (
        <>
            <PhoneInventory />
            <SpecificationForm />
            <ArrayFields
                searchKey='insideBox'
                title='What is in the Box'
                description='Enter the things that will be found inside the box '
                onSave={onSave}
            />
        </>
    )
}

export default PhoneForm