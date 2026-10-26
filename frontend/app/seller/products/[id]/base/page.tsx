"use client"
import ProductBaseDetailForm from '@/components/sellers/addProducts/baseDetails/ProductBaseDetailForm'

const ProductBaseDetailsPage = () => (
    <ProductBaseDetailForm
        formDefaults={{ about: '', category: '', description: '', title: '' }}
        handleOnSubmit={() => { }}
    />
)

export default ProductBaseDetailsPage
