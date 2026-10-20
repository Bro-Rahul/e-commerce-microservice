import useAddProduct from '@/store/useAddProduct'
import SpecificationForm from '../../specifications/SpecificationForm'
import PhoneAttributesForm from './PhoneAttributesForm'
import WhatIsInBoxForm from './WhatIsInBoxForm'


const PhoneForm = () => {
    const { products, addProductMetaDetail } = useAddProduct();
    const { variants, currentVariant } = products['phone'];

    return (
        <>
            <PhoneAttributesForm
                defaultAttribute={variants[currentVariant]?.productMetaDetail['attribute']}
                handleAttributeSubmit={(data) => addProductMetaDetail("phone", {
                    "attribute": data
                })}
            />
            <SpecificationForm
                defaultValue={variants[currentVariant].productMetaDetail?.['specifications'] ?? []}
                handleFormSubmit={(data) => addProductMetaDetail("phone", { "specifications": data })}
            />
            <WhatIsInBoxForm
                defaultValues={variants[currentVariant].productMetaDetail?.['insideBox'] ?? []}
                handleSubmit={(data) => addProductMetaDetail("phone", { "insideBox": data })}
            />
        </>
    )
}

export default PhoneForm