import BookAttributesForm from '@/components/sellers/addProducts/productForms/book/BookAttributesForm'
import BookAuthors from '@/components/sellers/addProducts/productForms/book/BookAuthors'
import useAddProduct from '@/store/useAddProduct'

const BookForm = () => {
    const { products, addProductMetaDetail } = useAddProduct()
    const { currentVariant, variants } = products.book;
    return (
        <>
            <BookAttributesForm
                defaultValue={variants[currentVariant].productMetaDetail?.['attribute']}
                handleAttributeSubmit={(data) => addProductMetaDetail("book", { "attribute": data })}
            />
            <BookAuthors
                defaultValue={variants[currentVariant].productMetaDetail?.['author']}
                handleSubmitAuthor={(data) => addProductMetaDetail("book", {
                    "author": data
                })}
            />
        </>
    )
}

export default BookForm