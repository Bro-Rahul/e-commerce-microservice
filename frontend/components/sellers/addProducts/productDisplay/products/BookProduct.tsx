
"use client"

import { useEffect, useState } from "react"
import {
  BookOpenText,
  CheckCircle2,
  MapPin,
  PackageCheck,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react"

import type { ProductDataType } from "@/types/ProductDisplayTypes"
import type { BookAuthorTableType } from "@/types/dexie/bookAuthorTableType"
import db from "@/lib/dexie/db"

import ImageDisplay from "../ImageDisplay"
import Imagecarousel from "../Imagecarousel"
import ProductVariants from "../ProductVariants"
import useProductVariantProvider from "@/hooks/context/useProductVariantProvider"
import KeyAttributes from "../keyAttributes"

interface BookProductProps {
  productData: ProductDataType
}

const BookProduct = ({ productData }: BookProductProps) => {
  const { availableOptions, selectedOptions, stockAvailable } =
    useProductVariantProvider()

  const [authorProfile, setAuthorProfile] = useState<
    (BookAuthorTableType & { imageUrl: string }) | null
  >(null)

  const attributes = productData?.productMetaDetails?.attribute ?? {}
  const productTitle =
    productData?.productBaseDetails?.title ?? "Untitled book"

  const price = productData?.productInventory?.price
  const inStock =
    stockAvailable && (productData?.productInventory?.quantity ?? 0) > 0

  const priceLabel =
    typeof price === "number"
      ? new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
      }).format(price)
      : "Price unavailable"

  const detailEntries = [
    ["Publisher", attributes.publisher],
    ["Publication date", attributes.publicationDate],
    ["Edition", attributes.edition],
    ["Language", attributes.language],
    ["Binding", attributes.binding],
    ["Print length", attributes.pages ? `${attributes.pages} pages` : undefined],
    ["ISBN-10", attributes.isbn10],
    ["ISBN-13", attributes.isbn13],
    ["Genre", attributes.genre],
    ["Series", attributes.series],
    ["Country of origin", attributes.countryOfOrigin],
    ["Weight", attributes.weight ? `${attributes.weight} g` : undefined],
  ].filter((entry): entry is [string, string | number] => Boolean(entry[1]))

  useEffect(() => {
    let active = true
    let imageUrl: string | undefined

    const loadAuthorProfile = async () => {
      const profile = await db.bookAuthor.toCollection().first()

      if (!profile || !active) return

      imageUrl = URL.createObjectURL(profile.profile)
      setAuthorProfile({ ...profile, imageUrl })
    }

    void loadAuthorProfile().catch(() => undefined)

    return () => {
      active = false
      if (imageUrl) URL.revokeObjectURL(imageUrl)
    }
  }, [])

  return (
    <main className="mx-auto w-full bg-background px-3 py-4 md:px-6 md:py-6">

      <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm">
        {/* Main product layout */}
        <div className="grid grid-cols-1 gap-8 p-4 md:p-6 lg:grid-cols-12">
          {productData?.mediaAssets?.productDisplay?.length > 0 ? (
            <ImageDisplay galleryImages={productData.mediaAssets.productDisplay} />
          ) : (
            <div className="flex aspect-4/5 min-h-64 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
              <BookOpenText
                aria-label="No book cover uploaded"
                className="size-16"
              />
            </div>
          )}

          {/* Product information */}
          <section
            className="min-w-0 space-y-6 lg:col-span-4"
            aria-label="Book information"
          >
            <div className="border-b border-border pb-5">
              {attributes.genre && (
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {attributes.genre}
                </p>
              )}

              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {productTitle}
              </h1>

              <p className="mt-3 text-sm text-muted-foreground">
                by{" "}
                <span className="font-semibold text-primary">
                  {attributes.author || "Unknown author"}
                </span>

                {attributes.binding && (
                  <>
                    <span aria-hidden="true"> · </span>
                    Format:{" "}
                    <strong className="font-semibold capitalize text-foreground">
                      {String(attributes.binding)
                        .replaceAll("_", " ")
                        .toLowerCase()}
                    </strong>
                  </>
                )}
              </p>

              {attributes.series && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Series: {attributes.series}
                </p>
              )}
            </div>

            {/* Price and length */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-xs font-medium text-muted-foreground">
                  Price
                </p>
                <p className="mt-1 text-xl font-bold text-foreground">
                  {priceLabel}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Current seller price
                </p>
              </div>

              {attributes.pages && (
                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="text-xs font-medium text-muted-foreground">
                    Print length
                  </p>
                  <p className="mt-1 text-xl font-bold text-foreground">
                    {attributes.pages} pages
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {attributes.language || "Language not specified"}
                  </p>
                </div>
              )}
            </div>

            {/* Offers */}
            {Array.isArray(productData?.productMetaDetails?.offers) &&
              productData?.productMetaDetails.offers.length > 0 && (
                <section className="space-y-3" aria-label="Offers">
                  <h2 className="text-base font-semibold text-foreground">
                    Available offers
                  </h2>

                  {productData?.productMetaDetails.offers.map(
                    (
                      offer: { title?: string; description?: string },
                      index: number
                    ) => (
                      <div
                        key={`${offer.title ?? "offer"}-${index}`}
                        className="rounded-xl border border-border p-4"
                      >
                        {offer.title && (
                          <p className="font-semibold text-foreground">
                            {offer.title}
                          </p>
                        )}

                        {offer.description && (
                          <p className="mt-1 text-sm leading-5 text-muted-foreground">
                            {offer.description}
                          </p>
                        )}
                      </div>
                    )
                  )}
                </section>
              )}

            {/* Variants */}
            {Object.keys(availableOptions).length > 0 && (
              <section className="space-y-3" aria-label="Available formats">
                <div>
                  <h2 className="text-base font-semibold text-foreground">
                    Choose a format
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Select an available variant to view its price and stock.
                  </p>
                </div>

                <div className="rounded-xl border border-border p-4">
                  <ProductVariants
                    selectedVariantOptions={selectedOptions}
                    variantsOptions={availableOptions}
                  />
                </div>
              </section>
            )}

            {/* Trust indicators */}
            <div className="grid grid-cols-2 gap-3 border-t border-border pt-5 sm:grid-cols-4">
              {[
                { label: "Book listing", Icon: BookOpenText },
                { label: "Format details", Icon: RotateCcw },
                { label: "Seller inventory", Icon: PackageCheck },
                { label: "Secure page", Icon: ShieldCheck },
              ].map(({ label, Icon }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card px-2 py-3 text-center"
                >
                  <Icon
                    aria-hidden="true"
                    className="size-5 text-muted-foreground"
                  />
                  <p className="text-xs leading-tight text-muted-foreground">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Purchase panel */}
          <aside
            className="min-w-0 lg:col-span-3"
            aria-label="Purchase information"
          >
            <div className="space-y-4 rounded-2xl border border-border bg-card p-5 shadow-sm lg:sticky lg:top-24">
              <div>
                <p className="text-2xl font-bold tracking-tight text-foreground">
                  {priceLabel}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Inclusive of all taxes
                </p>
              </div>

              <div
                className={`flex items-center gap-2 text-sm font-semibold ${inStock
                  ? "text-green-700 dark:text-green-400"
                  : "text-destructive"
                  }`}
              >
                <span
                  className={`size-2 rounded-full ${inStock ? "bg-green-600" : "bg-destructive"
                    }`}
                />
                {inStock ? "In stock" : "Out of stock"}
              </div>

              {productData?.productInventory?.stockDescription && (
                <p className="text-sm leading-5 text-muted-foreground">
                  {productData?.productInventory?.stockDescription}
                </p>
              )}

              <div className="space-y-3 border-t border-border pt-4">
                <p className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Truck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  <span>Delivery options are set by the seller.</span>
                </p>

                <p className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin
                    className="mt-0.5 size-4 shrink-0"
                    aria-hidden="true"
                  />
                  <span>Delivery location not set</span>
                </p>
              </div>

              <div className="flex items-start gap-2 border-t border-border pt-4 text-sm text-muted-foreground">
                <CheckCircle2
                  className="mt-0.5 size-4 shrink-0 text-green-700 dark:text-green-400"
                  aria-hidden="true"
                />
                <span>Book listing details provided by seller</span>
              </div>

              {productData?.productInventory?.additionalFields?.length > 0 && (
                <dl className="space-y-3 border-t border-border pt-4 text-sm">
                  {productData?.productInventory?.additionalFields.map((item) => (
                    <div
                      key={item.key}
                      className="flex items-start justify-between gap-4"
                    >
                      <dt className="font-medium text-foreground">
                        {item.key}
                      </dt>
                      <dd className="text-right text-muted-foreground">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </aside>
        </div>

        {productData?.mediaAssets?.imageCarousel?.length > 0 && (
          <section className="border-t border-border px-4 py-6 md:px-6" aria-label="More book images">
            <Imagecarousel images={productData.mediaAssets.imageCarousel} />
          </section>
        )}

        {/* Supporting information */}
        <div className="space-y-6">
          {/* Description */}
          <section
            className="border-t border-border px-4 py-6 md:px-6"
            aria-labelledby="about-book-heading"
          >
            <h2
              id="about-book-heading"
              className="text-lg font-bold text-foreground"
            >
              About this book
            </h2>

            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-muted-foreground">
              {attributes?.description ||
                productData?.productBaseDetails?.description ||
                "No description provided."}
            </p>
          </section>

          {/* Product details */}
          <section
            className="border-t border-border px-4 py-6 md:px-6"
            aria-labelledby="product-details-heading"
          >
            <h2
              id="product-details-heading"
              className="text-lg font-bold text-foreground"
            >
              Product details
            </h2>
            {productData?.productMetaDetails?.attribute && <KeyAttributes aboutItem={productData.productMetaDetails?.attribute} />}
          </section>

          {/* Author */}
          {authorProfile && (
            <section
              className="border-t border-border px-4 py-6 md:px-6"
              aria-labelledby="about-author-heading"
            >
              <h2
                id="about-author-heading"
                className="text-lg font-bold text-foreground"
              >
                About the author
              </h2>

              <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start">
                <img
                  src={authorProfile.imageUrl}
                  alt={authorProfile.name}
                  className="size-20 shrink-0 rounded-full object-cover"
                />

                <div className="min-w-0">
                  <h3 className="flex items-center gap-2 font-semibold text-foreground">
                    <BookOpenText
                      aria-hidden="true"
                      className="size-4 text-primary"
                    />
                    {authorProfile.name}
                  </h3>

                  <p className="mt-2 whitespace-pre-line text-sm leading-7 text-muted-foreground">
                    {authorProfile.description}
                  </p>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  )
}

export default BookProduct