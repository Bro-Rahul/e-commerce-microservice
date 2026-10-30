"use client"
import { ProductBaseFieldsType } from '@/validators/ProductBaseFieldsValidator'
import ProductBaseDetailForm from '../../addProducts/baseDetails/ProductBaseDetailForm'
import { sellerRepository } from '@/repositary/seller/sellerHttp'
import toast from 'react-hot-toast'

interface UpdateProductBaseDetailFromProps {
  variantId: string,
  defaultValue: ProductBaseFieldsType
}

const UpdateProductBaseDetailFrom = ({ variantId, defaultValue }: UpdateProductBaseDetailFromProps) => {
  const onSubmit = async (data: ProductBaseFieldsType) => {
    try {
      await sellerRepository.patchRequests.patchProductVariantBaseDetail(variantId, data);
      toast.success("Product Details Updated", {
        position: 'bottom-right',
        duration: 5000
      });
    } catch (err: any) {
      toast.success(err.message ?? "Can't update Product", {
        position: 'bottom-right',
        duration: 5000
      });
    }
  }
  return (
    <ProductBaseDetailForm
      formDefaults={defaultValue}
      handleOnSubmit={onSubmit}
    />
  )
}

export default UpdateProductBaseDetailFrom