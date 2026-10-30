import { ProductMetaDetailResponseType } from '@/types/products/SellerProductListType'
import BookAttributesForm from '../../addProducts/productForms/book/BookAttributesForm'
import BookAuthors from '../../addProducts/productForms/book/BookAuthors'
import { sellerRepository } from '@/repositary/seller/sellerHttp'
import { ProductMetaDetailsType } from '@/types/ProductDisplayTypes'
import toast from 'react-hot-toast'

interface UpdateBookFormProps {
    variantId: string
    metaDetails: ProductMetaDetailResponseType
}

const UpdateBookForm = ({ metaDetails, variantId }: UpdateBookFormProps) => {

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
            <BookAttributesForm
                defaultValue={metaDetails?.['attribute']}
                handleAttributeSubmit={(data) => onSubmit("attribute", data)}
            />
            <BookAuthors
                defaultValue={metaDetails?.['author']}
                handleSubmitAuthor={data => onSubmit("author", data)}
            />
        </section>
    )
}

export default UpdateBookForm