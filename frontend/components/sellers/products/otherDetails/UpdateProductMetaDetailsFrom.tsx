"use client"
import { ProductMetaDetailResponseType } from '@/types/products/SellerProductListType'
import UpdateBookForm from './UpdateBookForm'
import UpdatePhoneForm from './UpdatePhoneForm'

interface UpdateProductMetaDetailsFromProps {
  metaDetails: ProductMetaDetailResponseType
}

const UpdateProductMetaDetailsFrom = ({ metaDetails }: UpdateProductMetaDetailsFromProps) => {

  switch (metaDetails.category.toLowerCase()) {
    case 'book':
      return <UpdateBookForm metaDetails={metaDetails} />
    case 'phone':
      return <UpdatePhoneForm />
  }
}

export default UpdateProductMetaDetailsFrom