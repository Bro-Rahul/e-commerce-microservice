import BookAttributesForm from '@/components/sellers/addProducts/productForms/book/BookAttributesForm'
import BookAuthors from '@/components/sellers/addProducts/productForms/book/BookAuthors'
import useAddProduct from '@/store/useAddProduct'

const BookForm = ({ category }: { category: string }) => {
    const { getProductData, addProductMetaDetail } = useAddProduct()
    const { currentVariant, variants } = getProductData(category);
    return (
        <>
            <BookAttributesForm
                defaultValue={variants[currentVariant].productMetaDetail?.['attribute']}
                handleAttributeSubmit={(data) => addProductMetaDetail("books", { "attribute": data })}
            />
            <BookAuthors
                defaultValue={variants[currentVariant].productMetaDetail?.['author']}
                handleSubmitAuthor={(data) => addProductMetaDetail("books", {
                    "author": data
                })}
            />
        </>
    )
}

export default BookForm