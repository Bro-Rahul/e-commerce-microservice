"use client"
import { ProductDataType } from '@/types/ProductDisplayTypes'
import { Star } from 'lucide-react'
import ImageDisplay from '../ImageDisplay'
import OffersCard from '../OffersCard'
import AboutItems from '../AboutItems'
import SpecificationRenderer from '../SpecificationRenderer'
import { SpecificationType } from '@/validators/specificationValidator'
import ProductVariants from '../ProductVariants'
import { BaseInventoryFieldType } from '@/validators/inventoryValidator'
import useVariants from '@/hooks/seller/useVariants'
import Imagecarousel from '../Imagecarousel'

const phoneImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC-xeq4gsoXBFKNJhk53GqvoNuJfQSj5Lepn-a4ezpjOhB3ScbFy92d278O0VcgUPbPYpYD11f55v1ANR4N1JFPTzjZdGex340H39qH402pGQP5MtbqINTwdiejSdFJN2W92KSyMGPq7YARwk3pa6G4OJ8Hf5Yymz_gngGBu6XWyonjxZaHq1AnEo-g8UzXmZlTkTzLw5gTeLTLrRmAPdCWcBH4KVgKx4z0VyeyhLrQ-7GRdoMTrTzuyOlzim1RHfQTySlsptV1K48v'


const trustBadges = [
  '10 days Service Centre Replacement',
  'Free Delivery',
  '1 Year Warranty',
  'Pay on Delivery',
]

const variants = [
  { label: 'Frost Silver', price: '₹21,863', active: true },
  { label: 'Carbon Black', price: '₹21,900' },
  { label: 'Turquoise', price: '₹22,100' },
  { label: 'Ocean Blue', price: '₹22,200' },
  { label: 'Graphite', price: '₹22,300' },
  { label: 'Royal Blue', price: '₹22,500' },
  { label: 'Nebula', price: '₹22,900' },
  { label: 'Pearl White', price: '₹23,200' },
]

const infoSections = [
  'Additional details',
  'Camera',
  'Battery',
  'Measurements',
  'Video',
  'Display',
  'Connectivity',
  'Item details',
  'Battery Life',
  'Navigation',
]
const phoneSpecifications: SpecificationType = [
  {
    name: "Display",
    specifications: [
      { key: "Display Size", value: "6.7 inches" },
      { key: "Display Type", value: "AMOLED" },
      { key: "Resolution", value: "2400 × 1080 pixels" },
      { key: "Refresh Rate", value: "120 Hz" },
      { key: "Peak Brightness", value: "2000 nits" },
      { key: "HDR Support", value: "HDR10+" },
      { key: "Screen Protection", value: "Corning Gorilla Glass" },
    ],
  },
  {
    name: "Performance",
    specifications: [
      { key: "Processor", value: "Snapdragon 8 Gen 3" },
      { key: "CPU", value: "Octa-core" },
      { key: "GPU", value: "Adreno 750" },
      { key: "RAM", value: "12 GB" },
      { key: "Storage", value: "256 GB" },
    ],
  },
  {
    name: "Camera",
    specifications: [
      { key: "Rear Camera", value: "50 MP + 12 MP + 8 MP" },
      { key: "Main Camera", value: "50 MP, f/1.8" },
      { key: "Ultra Wide Camera", value: "12 MP" },
      { key: "Telephoto Camera", value: "8 MP" },
      { key: "Front Camera", value: "32 MP" },
      { key: "Video Recording", value: "4K @ 60fps" },
      { key: "Optical Stabilization", value: "OIS" },
    ],
  },
  {
    name: "Battery",
    specifications: [
      { key: "Battery Capacity", value: "5000 mAh" },
      { key: "Charging", value: "67W Fast Charging" },
      { key: "Wireless Charging", value: "15W" },
      { key: "Reverse Charging", value: "Supported" },
    ],
  },
  {
    name: "Operating System",
    specifications: [
      { key: "OS", value: "Android 15" },
      { key: "UI", value: "One UI" },
      { key: "OS Updates", value: "4 Years" },
      { key: "Security Updates", value: "5 Years" },
    ],
  },
  {
    name: "Connectivity",
    specifications: [
      { key: "Network", value: "5G" },
      { key: "SIM", value: "Dual SIM" },
      { key: "Wi-Fi", value: "Wi-Fi 7" },
      { key: "Bluetooth", value: "Bluetooth 5.4" },
      { key: "NFC", value: "Yes" },
      { key: "USB", value: "USB Type-C 3.2" },
      { key: "GPS", value: "GPS, GLONASS, Galileo, NavIC" },
    ],
  },
  {
    name: "Design",
    specifications: [
      { key: "Dimensions", value: "162.3 × 74.6 × 8.2 mm" },
      { key: "Weight", value: "198 g" },
      { key: "Build", value: "Glass Front, Aluminum Frame" },
      { key: "Water Resistance", value: "IP68" },
      { key: "Colors", value: "Black, Blue, Silver" },
    ],
  },

];

const similarProducts = [
  { name: 'Redmi Note 13 Pro 5G', price: '₹24,999', image: phoneImage },
  { name: 'POCO M7 Pro 5G', price: '₹21,999', image: phoneImage },
  { name: 'OnePlus Nord CE 4 Lite', price: '₹23,699', image: phoneImage },
  { name: 'Realme Narzo 70 Pro', price: '₹19,999', image: phoneImage },
]

const galleryImages = [
  phoneImage,
  'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
]

const inventoryData: BaseInventoryFieldType[] = [
  {
    sku: "IPH15-BLK-8-128",
    name: "iPhone 15",
    price: 69999,
    quantity: 10,
    stockDescription: "Black iPhone 15 with 8GB RAM and 128GB storage",
    additionalFields: [
      {
        key: "color",
        value: "Black",
      },
      {
        key: "ram",
        value: "8GB",
      },
      {
        key: "storage",
        value: "128GB",
      },
    ],
  },
  {
    sku: "IPH15-BLK-8-256",
    name: "iPhone 15",
    price: 74999,
    quantity: 8,
    stockDescription: "Black iPhone 15 with 8GB RAM and 256GB storage",
    additionalFields: [
      {
        key: "color",
        value: "Black",
      },
      {
        key: "ram",
        value: "8GB",
      },
      {
        key: "storage",
        value: "256GB",
      },
    ],
  },
  {
    sku: "IPH15-BLU-8-128",
    name: "iPhone 15",
    price: 69999,
    quantity: 12,
    stockDescription: "Blue iPhone 15 with 8GB RAM and 128GB storage",
    additionalFields: [
      {
        key: "color",
        value: "Blue",
      },
      {
        key: "ram",
        value: "8GB",
      },
      {
        key: "storage",
        value: "128GB",
      },
    ],
  },
  {
    sku: "IPH15-BLU-8-256",
    name: "iPhone 15",
    price: 74999,
    quantity: 6,
    stockDescription: "Blue iPhone 15 with 8GB RAM and 256GB storage",
    additionalFields: [
      {
        key: "color",
        value: "Yellow",
      },
      {
        key: "ram",
        value: "8GB",
      },
      {
        key: "storage",
        value: "256GB",
      },
    ],
  },
];

const PhoneProduct = ({ productData }: { productData: ProductDataType }) => {
  const {
    variant,
    selectedVariantOptions,
    variantsOptions,
    toggleVariant } = useVariants({
      inventoryData: productData.productInventory,
      keys: ["color", "ram", "storage"]
    });


  return (
    <div className="mx-auto w-full bg-background px-3 py-4 md:px-6 md:py-6">
      <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm">
        <div className="grid grid-cols-1 gap-8 p-4 md:p-6 lg:grid-cols-12">

          {productData.mediaAssets.productDisplay.length > 0
            && <ImageDisplay galleryImages={productData.mediaAssets.productDisplay}
            />}

          <div className="space-y-4 lg:col-span-4">
            <div>
              <h2 className="text-[22px] font-medium leading-tight text-foreground">
                {productData.productBaseDetails.title} | {variant?.stockDescription}
              </h2>
              <div className="mt-1 flex items-center gap-2 text-sm font-medium text-primary">
                <span>Brand: POCO</span>
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
                <span className="text-3xl font-medium text-foreground">₹21,863</span>
              </div>
              <p className="text-xs text-muted-foreground">
                M.R.P.: <span className="line-through">₹24,999</span>
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
              selectedVariantOptions={selectedVariantOptions}
              toggleVariant={toggleVariant}
              variantsOptions={variantsOptions}
            />

            {/* <div className="pt-4">
              <p className="mb-3 text-xs font-bold text-foreground">
                Set name: <span className="font-normal text-muted-foreground">Poco M8 5G (Frost Silver, 8GB RAM), (128GB ROM)</span>
              </p>
              <div className="grid grid-cols-4 gap-2">
                {variants.map((variant) => (
                  <div
                    key={variant.label}
                    className={`rounded-md border px-2 py-2 text-center text-[11px] ${variant.active
                      ? 'border-2 border-primary bg-primary/10 font-semibold text-foreground'
                      : 'border-border bg-card text-muted-foreground'
                      }`}
                  >
                    <div>{variant.label}</div>
                    <div className="mt-1 text-[10px] text-muted-foreground">{variant.price}</div>
                  </div>
                ))}
              </div>
            </div> */}

            <AboutItems aboutItem={{
              "Brand": "POCO",
              "Operating System": 'Android 15, Xiaomi HyperOS',
              "RAM Memory Installed Size": "8GB",
              "CPU Model": "Snapdragon",
              "CPU Speed": "2.4GHz"
            }} />
            {/* <AboutItems aboutItem={Object.entries(rest) as any} /> */}
          </div>

          <div className="lg:col-span-3">
            <div className="space-y-4 rounded-lg border border-border bg-card p-4 shadow-sm">
              <div
                className="text-lg font-bold text-green-600 dark:text-green-400">
                In stock
              </div>

              <div className="space-y-3">
                <select className="w-full rounded-md border border-border bg-background px-2.5 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
                  {Array.from({ length: 10 }, (_, k) =>
                    <option key={k}>Qty: {k + 1}</option>
                  )}
                </select>
                <button className="w-full rounded-md bg-yellow-400 px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-yellow-300">
                  Add to cart
                </button>
                <button className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-muted">
                  Buy Now
                </button>
              </div>
              <div className="border-t border-border pt-4">
                <h3 className="mb-3 text-sm font-bold text-foreground">Stock Additional detail</h3>
                <dl className="space-y-2 text-xs">

                  {variant?.additionalFields.map((item) =>
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

        <Imagecarousel images={productData.mediaAssets.imageCarousel} />

        <SpecificationRenderer
          specificationsData={productData.productMetaDetails['specifications']} />

        <div className="border-t border-border px-4 py-8 md:px-6">
          <h3 className="mb-3 text-[20px] font-bold text-foreground">Product description</h3>
          <p className="max-w-4xl text-sm leading-6 text-foreground/90">
            {productData.productBaseDetails.description}
          </p>
        </div>


        <div className="border-t border-border px-4 py-8 md:px-6">
          <h3 className="mb-4 text-[20px] font-bold text-foreground">What is in the box?</h3>
          <ul className="ml-1 list-inside list-disc space-y-1 text-sm text-foreground/90">
            {productData.productMetaDetails['insideBox']?.map((item: any, index: number) => <li key={index}>{item.value}</li>)}
          </ul>
        </div>

        <div className="border-t border-border px-4 py-8 md:px-6">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-[20px] font-bold text-foreground">Customers who viewed this item also viewed</h3>
            <span className="text-xs text-muted-foreground">Page 1 of 4</span>
          </div>

          <div className="relative">
            <div className="flex gap-6 overflow-x-auto pb-4">
              {similarProducts.map((product) => (
                <div key={product.name} className="min-w-45 shrink-0 space-y-2">
                  <div className="rounded-lg border border-border bg-card p-2">
                    <img src={product.image} alt={product.name} className="h-45 w-full object-contain" />
                  </div>
                  <div className="text-sm font-medium text-foreground/90">{product.name}</div>
                  <div className="text-base font-bold text-foreground">{product.price}</div>
                </div>
              ))}
            </div>
            <button className="absolute -left-2 top-1/2 hidden -translate-y-1/2 rounded-full border border-border bg-card/90 p-2 shadow-md md:block">
              <svg viewBox="0 0 20 20" className="h-4 w-4 text-foreground" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12.5 5l-5 5 5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button className="absolute -right-2 top-1/2 hidden -translate-y-1/2 rounded-full border border-border bg-card/90 p-2 shadow-md md:block">
              <svg viewBox="0 0 20 20" className="h-4 w-4 text-foreground" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M7.5 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhoneProduct