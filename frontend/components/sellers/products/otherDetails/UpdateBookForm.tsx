import { ProductMetaDetailResponseType } from '@/types/products/SellerProductListType'
import BookAttributesForm from '../../addProducts/productForms/book/BookAttributesForm'
import BookAuthors from '../../addProducts/productForms/book/BookAuthors'

interface UpdateBookFormProps {
    metaDetails: ProductMetaDetailResponseType
}

const UpdateBookForm = ({ metaDetails }: UpdateBookFormProps) => {
    return (
        <section className='flex flex-col gap-5'>
            <BookAttributesForm
                defaultValue={metaDetails?.['attribute']}
                handleAttributeSubmit={(data) => { }}
            />
            <BookAuthors
                defaultValue={metaDetails?.['author']}
                handleSubmitAuthor={data => { }}
            />
        </section>
    )
}

export default UpdateBookForm