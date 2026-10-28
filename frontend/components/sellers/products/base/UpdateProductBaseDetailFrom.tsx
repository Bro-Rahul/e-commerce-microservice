"use client"
import { ProductBaseFieldsType } from '@/validators/ProductBaseFieldsValidator'
import ProductBaseDetailForm from '../../addProducts/baseDetails/ProductBaseDetailForm'

interface UpdateProductBaseDetailFromProps {
  defaultValue: ProductBaseFieldsType
}

const UpdateProductBaseDetailFrom = ({ defaultValue }: UpdateProductBaseDetailFromProps) => {

  return (
    <ProductBaseDetailForm
      formDefaults={defaultValue}
      handleOnSubmit={() => { }}
    />
  )
}

export default UpdateProductBaseDetailFrom