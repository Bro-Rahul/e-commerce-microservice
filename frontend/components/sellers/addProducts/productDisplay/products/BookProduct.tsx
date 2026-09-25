"use client"

import useDexie from '@/hooks/seller/useDexie'
import { ProductDataType } from '@/types/ProductDisplayTypes'
import { BookAuthorTableType } from '@/types/dexie/bookAuthorTableType'
import { BookInventoryType } from '@/validators/inventoryValidator'
import { ChevronDown, Heart, MapPin, ShieldCheck, Star, Truck } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import AboutItems from '../AboutItems'
import ImageDisplay from '../ImageDisplay'
import Imagecarousel from '../Imagecarousel'
import OffersCard from '../OffersCard'

const trustBadges = [
  { label: 'Free Delivery', icon: Truck },
  { label: '10 days replacement', icon: ShieldCheck },
  { label: 'Secure transaction', icon: ShieldCheck },
]

const BookProduct = ({ productData }: { productData: ProductDataType }) => {
  const { getAuthorProfile } = useDexie()
  const [authorProfile, setAuthorProfile] = useState<BookAuthorTableType>()
  const [authorImage, setAuthorImage] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [selectedBinding, setSelectedBinding] = useState('')

  const inventory = productData.productInventory as BookInventoryType[]
  const selectedVariant = inventory.find((item) => item.binding === selectedBinding) ?? inventory[0]
  const meta = productData.productMetaDetails
  const attributes = meta as Record<string, unknown>
  const authorName = typeof attributes.author === 'string' ? attributes.author : 'Author'
  const description = typeof attributes.description === 'string'
    ? attributes.description
    : productData.productBaseDetails.description
  const bindings = useMemo(
    () => Array.from(new Set(inventory.map((item) => item.binding).filter(Boolean))),
    [inventory],
  )

  useEffect(() => {
    if (!selectedBinding && bindings[0]) setSelectedBinding(bindings[0])
  }, [bindings, selectedBinding])

  useEffect(() => {
    const loadAuthorProfile = async () => {
      const profile = await getAuthorProfile()
      if (!profile) return

      setAuthorProfile(profile)
      setAuthorImage(URL.createObjectURL(profile.profile))
    }

    loadAuthorProfile()
  }, [])

  const price = selectedVariant?.price ?? 0
  const authorDescription = authorProfile?.description ?? 'Learn more about the author and their work.'
  const productDetails = {
    Publisher: attributes.publisher,
    'Publication date': attributes.publicationDate,
    Edition: attributes.edition,
    Language: attributes.language,
    'Print length': attributes.pages ? `${attributes.pages} pages` : undefined,
    'ISBN-10': attributes.isbn10,
    'ISBN-13': attributes.isbn13,
    'Reading age': attributes.readingAgeMin ? `${attributes.readingAgeMin}+ years` : undefined,
    Binding: selectedVariant?.binding,
    Genre: attributes.genre,
  }

  return (
    <div className="mx-auto w-full bg-background px-3 py-4 md:px-6 md:py-6">
      <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm">
        <nav className="flex items-center gap-2 overflow-hidden border-b border-border px-4 py-3 text-xs text-primary md:px-6" aria-label="Breadcrumb">
          <span>Books</span>
          <span>/</span>
          <span>{typeof attributes.genre === 'string' ? attributes.genre : 'Books'}</span>
          <span>/</span>
          <span className="truncate text-muted-foreground">{productData.productBaseDetails.title}</span>
        </nav>

        <section className="grid grid-cols-1 gap-8 p-4 md:p-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            {productData.mediaAssets.productDisplay.length > 0 ? (
              <ImageDisplay galleryImages={productData.mediaAssets.productDisplay} />
            ) : (
              <div className="flex min-h-105 items-center justify-center border border-dashed border-border text-sm text-muted-foreground">
                No product images available
              </div>
            )}
          </div>

          <div className="space-y-4 lg:col-span-4">
            <div>
              <h1 className="text-[22px] font-medium leading-tight">
                {productData.productBaseDetails.title}
              </h1>
              <p className="mt-2 text-sm">
                by <span className="text-primary">{authorProfile?.name ?? authorName}</span> (Author)
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                <span className="font-medium text-primary">4.5</span>
                <div className="flex text-orange-500" aria-label="4.5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, index) => <Star key={index} className="size-4 fill-current" />)}
                </div>
                <span className="text-primary">(38,419 ratings)</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Part of the {String(attributes.series || 'book')} series</p>
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-medium">₹{price.toLocaleString('en-IN')}</span>
              </div>
              <p className="text-xs text-muted-foreground">Inclusive of all taxes</p>
            </div>

            {bindings.length > 0 && (
              <div className="border-t border-border pt-4">
                <p className="mb-3 text-sm font-bold">Format: <span className="font-normal">{selectedVariant?.binding}</span></p>
                <div className="flex flex-wrap gap-2">
                  {bindings.map((binding) => (
                    <button
                      key={binding}
                      type="button"
                      onClick={() => setSelectedBinding(binding)}
                      className={`rounded-md border px-4 py-2 text-left text-sm ${selectedBinding === binding ? 'border-primary bg-primary/5 font-semibold ring-1 ring-primary' : 'border-border hover:border-primary'}`}
                    >
                      {binding.replaceAll('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <OffersCard />

            <div className="grid grid-cols-3 gap-2 border-y border-border py-4 text-center">
              {trustBadges.map(({ label, icon: Icon }) => (
                <div key={label} className="space-y-1">
                  <Icon className="mx-auto size-6 text-muted-foreground" />
                  <p className="text-[10px] leading-tight text-primary">{label}</p>
                </div>
              ))}
            </div>

            <AboutItems aboutItem={{
              Author: authorProfile?.name ?? authorName,
              Publisher: String(attributes.publisher ?? 'Not specified'),
              Language: String(attributes.language ?? 'Not specified'),
              Pages: String(attributes.pages ?? 'Not specified'),
            }} />
          </div>

          <aside className="lg:col-span-3">
            <div className="space-y-4 rounded-lg border border-border bg-card p-4 shadow-sm lg:sticky lg:top-24">
              <div className="text-lg font-bold text-green-600">{selectedVariant?.quantity ? 'In stock' : 'Currently unavailable'}</div>
              <p className="text-sm text-muted-foreground">Usually dispatched within 2 to 3 days.</p>
              <label className="sr-only" htmlFor="book-quantity">Quantity</label>
              <select
                id="book-quantity"
                value={quantity}
                onChange={(event) => setQuantity(Number(event.target.value))}
                className="w-full rounded-md border border-border bg-background px-2.5 py-2 text-sm"
              >
                {Array.from({ length: Math.min(selectedVariant?.quantity ?? 1, 10) }, (_, index) => (
                  <option key={index + 1} value={index + 1}>Quantity: {index + 1}</option>
                ))}
              </select>
              <button type="button" className="w-full rounded-full bg-yellow-400 px-4 py-2.5 text-sm font-semibold text-gray-900 hover:bg-yellow-300">
                Add to cart
              </button>
              <button type="button" className="w-full rounded-full bg-orange-400 px-4 py-2.5 text-sm font-semibold text-gray-900 hover:bg-orange-300">
                Buy Now
              </button>
              <button type="button" className="flex w-full items-center justify-center gap-2 rounded-md border border-border px-4 py-2 text-sm hover:bg-muted">
                <Heart className="size-4" /> Add to List
              </button>
              <div className="space-y-3 border-t border-border pt-4 text-xs">
                <p className="flex items-start gap-2"><MapPin className="size-4 shrink-0" /> Deliver to your location</p>
                <p className="flex items-start gap-2"><ShieldCheck className="size-4 shrink-0" /> Secure payments and data protection</p>
                <p className="flex items-start gap-2"><ChevronDown className="size-4 shrink-0" /> Sold by Urban StoryNest</p>
              </div>
            </div>
          </aside>
        </section>

        <section className="border-t border-border px-4 py-8 md:px-6">
          <h2 className="mb-4 text-xl font-bold">Product description</h2>
          <p className="max-w-5xl text-sm leading-6">{description || 'No product description available.'}</p>
        </section>

        <section className="border-t border-border px-4 py-8 md:px-6">
          <h2 className="mb-4 text-xl font-bold">Product details</h2>
          <dl className="grid max-w-4xl grid-cols-1 text-sm sm:grid-cols-2">
            {Object.entries(productDetails).filter(([, value]) => value !== undefined && value !== '').map(([label, value]) => (
              <div key={label} className="grid grid-cols-[150px_1fr] gap-3 border-b border-border py-2">
                <dt className="font-bold">{label}</dt>
                <dd>{String(value)}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="border-t border-border px-4 py-8 md:px-6">
          <h2 className="mb-2 text-xl font-bold">About the author</h2>
          <p className="mb-5 text-sm">Follow authors to get new release updates, plus improved recommendations.</p>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="size-28 shrink-0 overflow-hidden rounded-full bg-muted">
              {authorImage ? <img src={authorImage} alt={authorProfile?.name ?? authorName} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-3xl font-bold text-muted-foreground">{(authorProfile?.name ?? authorName).charAt(0)}</div>}
            </div>
            <div className="max-w-5xl">
              <h3 className="text-xl font-bold text-primary">{authorProfile?.name ?? authorName}</h3>
              <p className="mt-3 text-sm leading-6">{authorDescription}</p>
              <button type="button" className="mt-4 rounded-full border border-border px-5 py-2 text-sm hover:bg-muted">Follow</button>
            </div>
          </div>
        </section>

        <Imagecarousel images={productData.mediaAssets.imageCarousel} />
      </div>
    </div>
  )
}

export default BookProduct