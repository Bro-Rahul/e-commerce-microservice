import BookAttributesForm from '@/components/sellers/addProducts/productForms/book/BookAttributesForm'
import BookAuthors from '@/components/sellers/addProducts/productForms/book/BookAuthors'
import InventoryForm from '../../inventory/InventoryForm'

const BookForm = () => {
    return (
        <>
            <BookAttributesForm />
            <InventoryForm category='book' />
            <BookAuthors />
        </>
    )
}

export default BookForm