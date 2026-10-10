"use client"
import { ProductDataType } from '@/types/ProductDisplayTypes'
import { Star } from 'lucide-react'
import ImageDisplay from '../ImageDisplay'
import OffersCard from '../OffersCard'
import SpecificationRenderer from '../SpecificationRenderer'
import Imagecarousel from '../Imagecarousel'
import KeyAttributes from '../keyAttributes'
import useProductVariantProvider from '@/hooks/context/useProductVariantProvider'
import ProductVariants from '../ProductVariants'
import { cn } from '@/lib/utils'


const trustBadges = [
  '10 days Service Centre Replacement',
  'Free Delivery',
  '1 Year Warranty',
  'Pay on Delivery',
]


const PhoneProduct = ({ productData }: { productData: ProductDataType }) => {
  const { availableOptions, selectedOptions, stockAvailable } = useProductVariantProvider();

  return (
    <div className="mx-auto w-full bg-background px-3 py-4 md:px-6 md:py-6">
      <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm">
        <div className="grid grid-cols-1 gap-8 p-4 md:p-6 lg:grid-cols-12">

          {productData?.mediaAssets?.productDisplay?.length > 0
            && <ImageDisplay galleryImages={productData.mediaAssets.productDisplay}
            />}

          <div className="space-y-4 lg:col-span-4">
            <div>
              <h2 className="text-[22px] font-medium leading-tight text-foreground">
                {productData?.productBaseDetails?.title}
              </h2>
              <div className="mt-1 flex items-center gap-2 text-sm font-medium text-primary">
                <span>Brand: {productData?.productMetaDetails?.['attribute']?.brand}</span>
                <div className="flex items-center text-orange-400">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className='size-4' />
                  ))}
                </div>
                <span className="text-primary">(143)</span>
              </div>

              <div className="mt-2 inline-block rounded-sm bg-foreground px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-background">
                Amazon&apos;s Choice
              </div>
              <p className="mt-1 text-xs text-muted-foreground">50+ bought in past month</p>
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-light text-red-500">-13%</span>
                <span className="text-3xl font-medium text-foreground">₹{productData?.productInventory?.price}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                M.R.P.: <span className="line-through">₹{productData?.productInventory?.price}</span>
              </p>
              <p className="mt-1 text-sm font-medium text-foreground">Inclusive of all taxes</p>
            </div>
            <OffersCard />

            <div className="grid grid-cols-4 gap-2 border-y border-border py-4 text-center">
              {trustBadges.map((badge) => (
                <div key={badge} className="space-y-1">
                  <div className="flex justify-center">
                    <svg viewBox="0 0 24 24" className="h-6 w-6 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M12 3l7 4v5c0 4.5-3.1 8.7-7 10-3.9-1.3-7-5.5-7-10V7l7-4Z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-[10px] leading-tight text-primary">{badge}</p>
                </div>
              ))}
            </div>

            <ProductVariants
              selectedVariantOptions={selectedOptions}
              variantsOptions={availableOptions}
            />

            {productData?.productMetaDetails?.['attribute'] &&
              <KeyAttributes aboutItem={productData?.productMetaDetails?.['attribute']} />}
          </div>

          <div className="lg:col-span-3">
            <div className="space-y-4 rounded-lg border border-border bg-card p-4 shadow-sm">
              <div
                className={cn("text-lg font-bold", stockAvailable ? "text-green-600 dark:text-green-400" : "error")}>
                {stockAvailable ? 'In stock' : 'Out of Stock'}
              </div>

              <div className="border-t border-border pt-4">
                <h3 className="mb-3 text-sm font-bold text-foreground">Stock Additional detail</h3>
                <dl className="space-y-2 text-xs">

                  {productData?.productInventory?.additionalFields.map((item) =>
                    <div key={item.key} className="flex items-start justify-between gap-4">
                      <dt className="font-semibold text-foreground capitalize">{item.key}</dt>
                      <dd className="text-right text-muted-foreground">{item.value}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </div>
        </div>

        {productData?.mediaAssets?.imageCarousel &&
          <Imagecarousel images={productData.mediaAssets.imageCarousel} />}

        {productData?.productMetaDetails?.['specifications'] &&
          <SpecificationRenderer
            specificationsData={productData?.productMetaDetails?.['specifications']} />}

        <div className="border-t border-border px-4 py-8 md:px-6">
          <h3 className="mb-3 text-[20px] font-bold text-foreground">Product description</h3>
          <p className="max-w-4xl text-sm leading-6 text-foreground/90">
            {productData?.productBaseDetails?.description}
          </p>
        </div>


        <div className="border-t border-border px-4 py-8 md:px-6">
          <h3 className="mb-4 text-[20px] font-bold text-foreground">What is in the box?</h3>
          <ul className="ml-1 list-inside list-disc space-y-1 text-sm text-foreground/90">
            {productData?.productMetaDetails['insideBox']?.map((item: any, index: number) => <li key={index}>{item.value}</li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PhoneProduct