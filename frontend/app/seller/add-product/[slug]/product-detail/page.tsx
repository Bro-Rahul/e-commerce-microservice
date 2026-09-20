import Heading from "@/components/sellers/addProducts/Heading"
import { Button } from "@/components/ui/button"
import { ClipboardList } from "lucide-react"
import { AvailableCategoryType } from "@/types/inventoryTypes"
import ProductFormRenderer from "@/components/sellers/addProducts/inventory/productForms/ProductFormRenderer"


interface ProductDetailPageProps {
  params: Promise<{
    slug: AvailableCategoryType
  }>
}

const page = async ({ params }: ProductDetailPageProps) => {
  const { slug } = await params

  return (
    <main className="mx-auto w-[80%] flex-1 px-4 pb-32 pt-6 sm:px-6 md:px-10 md:pt-10">
      <Heading Icon={ClipboardList}>
        <span>
          <span className="headline-md block">Product Detail</span>
          <span className="mt-1 block text-sm font-normal text-on-surface-variant">
            Add the product information and inventory details customers and your team need.
          </span>
        </span>
      </Heading>

      <div className="overflow-hidden rounded-xl border border-outline-variant bg-card shadow-sm">
        <ProductFormRenderer category={slug} />
        <div className="flex flex-col-reverse gap-3 border-t border-outline-variant bg-surface-container-low px-5 py-4 sm:flex-row sm:justify-end sm:px-8">
          <Button className="rounded-lg border border-outline-variant px-5 py-2.5 text-sm font-bold text-on-surface transition hover:bg-surface-container" type="button" variant="outline">
            Cancel
          </Button>
          <Button className="rounded-lg bg-secondary px-5 py-2.5 text-sm font-bold text-on-secondary transition hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:ring-offset-2" type="submit">
            Save and continue
          </Button>
        </div>
      </div>
    </main>
  )
}

export default page