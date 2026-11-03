import useAddProduct from '@/store/useAddProduct'
import SpecificationForm from '../../specifications/SpecificationForm'
import PhoneAttributesForm from './PhoneAttributesForm'
import WhatIsInBoxForm from './WhatIsInBoxForm'


const PhoneForm = ({ category }: { category: string }) => {

    const { addProductMetaDetail, getProductData } = useAddProduct();
    const { variants, currentVariant } = getProductData(category)

    return (
        <>
            <PhoneAttributesForm
                defaultAttribute={variants[currentVariant]?.productMetaDetail['attribute']}
                handleAttributeSubmit={(data) => addProductMetaDetail("phones", {
                    "attribute": data
                })}
            />
            <SpecificationForm
                defaultValue={variants[currentVariant].productMetaDetail?.['specifications'] ?? []}
                handleFormSubmit={(data) => addProductMetaDetail("phones", { "specifications": data })}
            />
            <WhatIsInBoxForm
                defaultValues={variants[currentVariant].productMetaDetail?.['insideBox'] ?? []}
                handleSubmit={(data) => addProductMetaDetail("phones", { "insideBox": data })}
            />
        </>
    )
}

export default PhoneForm