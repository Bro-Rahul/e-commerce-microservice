import BookAttributes from '@/components/sellers/addProducts/productForms/book/BookAttributes'
import BookAuthors from '@/components/sellers/addProducts/productForms/book/BookAuthors'
import BookInventory from '../../inventory/BookInventory'

const BookForm = () => {
    return (
        <>
            <BookInventory />
            <BookAttributes />
            <BookAuthors />
        </>
    )
}

export default BookForm