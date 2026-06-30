import ProductCreationForm from "@/components/seller/addProducts/ProductCreationForm";
import { AvailableCategory } from "@/types/seller";


interface AddProductPageProps {
  params: {
    slug: Promise<AvailableCategory>
  }
}

const AddProductPage = async ({ params }: AddProductPageProps) => {
  const { slug } = await params;
  return (
    <ProductCreationForm category={await slug}>

    </ProductCreationForm>
  )
}

export default AddProductPage;