"use client"

import { Button } from '@/components/ui/button'
import { BookAuthorType, BookAuthorValidator } from '@/validators/products/bookValidator'
import { zodResolver } from '@hookform/resolvers/zod'
import { ImagePlus, Save, UserRound } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import FormCard from '../FormCard'
import { defaultBookAuthor } from '@/constants/data/bookData'
import Field from '@/components/auth/Field'

interface BookAuthorsProps {
  defaultValue: BookAuthorType,
  handleSubmitAuthor: (data: BookAuthorType) => void
}

const BookAuthors = ({ defaultValue, handleSubmitAuthor }: BookAuthorsProps) => {

  const { handleSubmit, register, watch, control } = useForm<BookAuthorType>({
    resolver: zodResolver(BookAuthorValidator),
    values: { ...defaultBookAuthor, ...defaultValue }
  })
  const imagePreview = watch("profilePicture");

  const onSubmit = async (data: BookAuthorType) => {
    handleSubmitAuthor(data);
    toast.success('Author profile saved!', {
      position: 'bottom-right',
      duration: 5000,
    })
  }

  const onErr = (err: any) => {
    console.log(err)
  }
  return (
    <FormCard
      Icon={UserRound}
      heading="Author profile"
      description="Add the author information shown on the book page."
    >
      <form onSubmit={handleSubmit(onSubmit, onErr)}>
        <div className="grid grid-cols-1 gap-7 p-5 sm:p-8 md:grid-cols-[180px_1fr]">
          <div className="space-y-2">
            <Controller
              control={control}
              name='profilePicture'
              render={({ field, fieldState: { error } }) =>
                <Field
                  htmlFor='author-profile-picture'
                  label='Profile picture URL'
                  error={error?.message}
                  required
                >
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
                    {...field}
                    placeholder="https://example.com/author.jpg"
                  />
                </Field>}
            />
          </div>

          <div className="grid grid-cols-1 gap-7 content-start">

            <Controller

              control={control}
              name='name'
              render={({ field, fieldState: { error } }) =>
                <Field
                  error={error?.message}
                  htmlFor='author-name'
                  label='Author Name'
                  optionalText='Author Name'
                >
                  <input
                    className="inputfields"
                    id="author-name"
                    {...field}
                    placeholder="Enter author name"
                  />
                </Field>}
            />


            <Controller
              control={control}
              name='description'
              render={({ field, fieldState: { error } }) =>
                <Field
                  htmlFor='author-description'
                  label='About the Author'
                  error={error?.message}
                  optionalText='About the Author'
                >
                  <textarea
                    className="textareafield min-h-32"
                    id="author-description"
                    {...field}
                    placeholder="Share a short biography or introduction"
                  />
                </Field>
              }
            />
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