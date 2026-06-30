"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductDetails from "./productDetailTab/ProductDetailTab";
import InventoryTab from "./inventoryTab/InventoryTab";
import MediaAssetTab from "./mediaAssetsTab/MediaAssetTab";
import ProductSpecificationTab from "./productSpecification/ProductSpecificationTab";
import { AvailableCategory } from "@/types/seller";



const ProductCreationForm = ({ category }: { category: AvailableCategory }) => {
  return (
    <Tabs defaultValue="product-details" className="mx-auto w-full max-w-6xl overflow-hidden">
      <TabsList
        variant="line"
        className="h-auto w-full justify-start gap-2 overflow-x-auto rounded-none border-b border-outline-variant p-0 scrollbar-none [&::-webkit-scrollbar]:hidden">

        <TabsTrigger
          value="product-details"
          className="flex-none rounded-none px-4 py-3 text-sm data-[state=active]:text-secondary">
          Product Details
        </TabsTrigger>

        <TabsTrigger
          value="inventory"
          className="flex-none rounded-none px-4 py-3 text-sm data-[state=active]:text-secondary">
          Inventory & Stock
        </TabsTrigger>

        <TabsTrigger
          value="media"
          className="flex-none rounded-none px-4 py-3 text-sm data-[state=active]:text-secondary">
          Media Assets
        </TabsTrigger>

        <TabsTrigger
          value="productSpecification"
          className="flex-none rounded-none px-4 py-3 text-sm data-[state=active]:text-secondary">
          Product Specification
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="product-details"
        className="mt-6">
        <ProductDetails category={category} />
      </TabsContent>

      <TabsContent
        value="inventory"
        className="mt-6">
        <InventoryTab category={category} />
      </TabsContent>

      <TabsContent
        value="media"
        className="mt-6 min-w-0 max-w-full overflow-x-clip">
        <MediaAssetTab category={category} />
      </TabsContent>

      <TabsContent
        value="productSpecification"
        className="mt-6 min-w-0 max-w-full overflow-x-clip">
        <ProductSpecificationTab category={category} />
      </TabsContent>
    </Tabs>
  )
};

export default ProductCreationForm;
