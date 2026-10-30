import { ProductMetaDetailResponseType } from '@/types/products/SellerProductListType'
import PhoneAttributesForm from '../../addProducts/productForms/phone/PhoneAttributesForm'
import WhatIsInBoxForm from '../../addProducts/productForms/phone/WhatIsInBoxForm'
import SpecificationForm from '../../addProducts/specifications/SpecificationForm'
import { ProductMetaDetailsType } from '@/types/ProductDisplayTypes'
import { sellerRepository } from '@/repositary/seller/sellerHttp'
import toast from 'react-hot-toast'

interface UpdatePhoneFormProps {
    metaDetails: ProductMetaDetailResponseType,
    variantId: string
}

const UpdatePhoneForm = ({ metaDetails, variantId }: UpdatePhoneFormProps) => {

    const onSubmit = async (key: string, data: ProductMetaDetailsType) => {
        try {
            await sellerRepository.patchRequests.patchProductVariantMetaDetail(variantId, {
                ...metaDetails,
                [key]: data
            });
            toast.success("Meta Detail Updated Successfully ", {
                duration: 5000,
                position: "bottom-right"
            })
        } catch (err: any) {
            toast.error(err.message ?? "Can't update the Meta Detail ", {
                duration: 5000,
                position: "bottom-right"
            })
        }
    }
    return (
        <section className='flex flex-col gap-5'>
            <PhoneAttributesForm
                defaultAttribute={metaDetails?.['attribute']}
                handleAttributeSubmit={(data) => onSubmit("attribute", {
                    "attribute": data
                })}
            />
            <SpecificationForm
                defaultValue={metaDetails?.['specifications'] ?? []}
                handleFormSubmit={(data) => onSubmit("specifications", { "specifications": data })}
            />
            <WhatIsInBoxForm
                defaultValues={metaDetails?.['insideBox'] ?? []}
                handleSubmit={(data) => onSubmit("insideBox", { "insideBox": data })}
            />
        </section>
    )
}

export default UpdatePhoneForm