"use client"
import { ProductMetaDetailResponseType } from '@/types/products/SellerProductListType'
import UpdateBookForm from './UpdateBookForm'
import UpdatePhoneForm from './UpdatePhoneForm'

interface UpdateProductMetaDetailsFromProps {
  metaDetails: ProductMetaDetailResponseType,
  variantId: string
}

const UpdateProductMetaDetailsForm = ({ variantId, metaDetails }: UpdateProductMetaDetailsFromProps) => {

  switch (metaDetails.category.toLowerCase()) {
    case 'book':
      return <UpdateBookForm
        variantId={variantId}
        metaDetails={metaDetails}
      />
    case 'phone':
      return <UpdatePhoneForm
        variantId={variantId}
        metaDetails={metaDetails}
      />
  }
}

export default UpdateProductMetaDetailsForm