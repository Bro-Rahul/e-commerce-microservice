"use client"

import { Button } from '@/components/ui/button'
import { BookAuthorType, BookAuthorValidator } from '@/validators/products/bookValidator'
import { zodResolver } from '@hookform/resolvers/zod'
import { ImagePlus, Save, UserRound } from 'lucide-react'
import { use, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import FormCard from '../FormCard'
import useAddProduct from '@/store/useAddProduct'

const defaultBookAuthor: BookAuthorType = {
  name: '',
  description: '',
  profilePicture: '',
}

const BookAuthors = () => {

  const { addProductMetaDetail, products } = useAddProduct();
  const { currentVariant } = products.book
  const { handleSubmit, register, reset, watch, formState: { errors } } = useForm<BookAuthorType>({
    resolver: zodResolver(BookAuthorValidator),
    defaultValues: defaultBookAuthor,
  })
  const imagePreview = watch("profilePicture");

  useEffect(() => {
    const setProductValues = () => {
      const { variants, currentVariant } = useAddProduct.getState().products.book
      const metaDetail = variants[currentVariant].productMetaDetail
      const authorData = metaDetail?.author ?? defaultBookAuthor
      reset({
        ...authorData
      })
    }

    if (useAddProduct.persist.hasHydrated()) {
      setProductValues()
      return
    }

    const unsubscribe =
      useAddProduct.persist.onFinishHydration(() => {
        setProductValues()
      })

    return unsubscribe
  }, [currentVariant, reset])

  const onSubmit = async (data: BookAuthorType) => {
    addProductMetaDetail("book", {
      "author": data
    })
    toast.success('Author profile saved!', {
      position: 'bottom-right',
      duration: 5000,

    })
  }

  return (
    <FormCard
      Icon={UserRound}
      heading="Author profile"
      description="Add the author information shown on the book page."
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-7 p-5 sm:p-8 md:grid-cols-[180px_1fr]">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-on-surface" htmlFor="author-profile-picture">
              Profile picture URL
            </label>
            <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-outline-variant bg-surface-container-low">
              {imagePreview ? (
                <img alt="Author profile preview" className="h-full w-full object-cover" src={imagePreview} />
              ) : (
                <div className="flex flex-col items-center gap-2 p-4 text-center">
                  <ImagePlus className="text-on-surface-variant" />
                  <span className="text-xs font-bold text-on-surface-variant">Enter an image URL below</span>
                </div>
              )}
            </div>
            <input
              className="inputfields"
              id="author-profile-picture"
              type="url"
              {...register('profilePicture')}
              placeholder="https://example.com/author.jpg"
            />
            {errors.profilePicture?.message && <p className="error">Please enter the author's profile picture URL.</p>}
          </div>

          <div className="grid grid-cols-1 gap-7 content-start">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-on-surface" htmlFor="author-name">
                Author Name
              </label>
              <input
                className="inputfields"
                id="author-name"
                {...register('name')}
                placeholder="Enter author name"
              />
              {errors.name?.message && <p className="error">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-on-surface" htmlFor="author-description">
                About the Author
              </label>
              <textarea
                className="textareafield min-h-32"
                id="author-description"
                {...register('description')}
                placeholder="Share a short biography or introduction"
              />
              {errors.description?.message && <p className="error">{errors.description.message}</p>}
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t border-outline-variant bg-surface-container-low px-5 py-4 sm:px-8">
          <Button type="submit" className="rounded-lg px-5 py-2.5 text-sm font-bold" variant="outline">
            <Save />
            Save Author Profile
          </Button>
        </div>
      </form>
    </FormCard>
  )
}

export default BookAuthors