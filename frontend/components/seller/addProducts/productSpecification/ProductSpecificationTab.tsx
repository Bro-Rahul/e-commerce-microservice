import { ScrollText } from 'lucide-react'
import SectionHeading from '../SectionHeading'
import AddSpecificationDialog from './AddSpecificationDialog'
import SpecificationCard from './SpecificationCard'
import { FormProvider, useForm, useFieldArray } from 'react-hook-form'
import { ProductSpecificationSchema, productSpecificationValidator } from '@/validators/addProduct'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import useAddProduct from '@/store/useAddProduct'
import { AvailableCategory } from '@/types/seller'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'


interface ProductSpecificationTabProps {
  category: AvailableCategory
}

const ProductSpecificationTab: React.FC<ProductSpecificationTabProps> = ({ category }) => {
  const router = useRouter();
  const method = useForm<ProductSpecificationSchema>({
    resolver: zodResolver(productSpecificationValidator),
    defaultValues: {
      specifications: [],
    },
  });

  const { setProductSpecifications } = useAddProduct();

  const { fields, append, remove } = useFieldArray({
    control: method.control,
    name: "specifications",
  });

  useEffect(() => {
    const unsub = useAddProduct.persist.onFinishHydration((state) => {
      method.reset(state.productSpecifications[category]);
    });

    if (useAddProduct.persist.hasHydrated()) {
      method.reset(
        useAddProduct.getState().productSpecifications[category]
      );
    }

    return unsub;
  }, [category, method]);

  const handleAdd = (val: string) => {
    append({
      name: val,
      specification: [
        {
          key: "",
          value: "",
        },
      ],
    });
  };

  const onSubmit = (data: ProductSpecificationSchema) => {
    console.log("data")
    console.log(data);
    setProductSpecifications(data, category);
  };

  const onError = (err: any) => {
    console.log("err")
    console.log(err)
  }

  return (
    <FormProvider {...method}>
      <form
        onSubmit={method.handleSubmit(onSubmit, onError)}
        className="max-w rounded-lg border p-6"
      >
        <div className="flex justify-between items-center">
          <SectionHeading>
            <ScrollText /> 5. Product Specifications
          </SectionHeading>

          <AddSpecificationDialog handleOnSave={handleAdd} />
        </div>

        <div className="space-y-6 mt-4">
          {fields.map((field, index) => (
            <SpecificationCard
              key={field.id}
              specIndex={index}
              specificationName={field.name}
              removeSpecification={() => remove(index)}
            />
          ))}
        </div>
        {method.formState.errors.specifications?.message && <p className='mt-1 text-xs text-red-500'>{method.formState.errors.specifications?.message}</p>}
        <Button
          onClick={() => router.push(`/seller/catalog/${category}/product-review`)}
          className="w-full mt-5">Review And Submit</Button>
      </form>
    </FormProvider>
  );
};

export default ProductSpecificationTab;