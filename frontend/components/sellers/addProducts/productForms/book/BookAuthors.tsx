"use client"

import { Button } from '@/components/ui/button'
import useDexie from '@/hooks/seller/useDexie'
import { BookAuthorTableType } from '@/types/dexie/bookAuthorTableType'
import { BookAuthorType, BookAuthorValidator } from '@/validators/products/bookValidator'
import { zodResolver } from '@hookform/resolvers/zod'
import { ImagePlus, Save } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const defaultBookAuthor: BookAuthorType = {
  name: '',
  description: '',
  profilePicture: '',
}

const BookAuthors = () => {
  const { addAuthorProfile, getAuthorProfile } = useDexie()
  const [profileFile, setProfileFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState('')
  const { handleSubmit, register, reset, setValue, formState: { errors } } = useForm<BookAuthorType>({
    resolver: zodResolver(BookAuthorValidator),
    defaultValues: defaultBookAuthor,
  })

  useEffect(() => {
    const loadAuthorProfile = async () => {
      const author = await getAuthorProfile()

      if (!author) return

      setProfileFile(author.profile)
      setImagePreview(URL.createObjectURL(author.profile))
      reset({
        name: author.name,
        description: author.description,
        profilePicture: author.profile.name,
      })
    }

    loadAuthorProfile()
  }, [reset])

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) return

    setProfileFile(file)
    setValue('profilePicture', file.name, { shouldDirty: true, shouldValidate: true })
    setImagePreview(URL.createObjectURL(file))
  }

  const onSubmit = async (data: BookAuthorType) => {
    if (!profileFile) return

    const profile: BookAuthorTableType = {
      profile: profileFile,
      name: data.name,
      description: data.description,
    }

    await addAuthorProfile(profile)
    toast.success('Author profile saved!', {
      position: 'bottom-right',
      duration: 5000,
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="border-t border-outline-variant py-5 flex flex-col">
        <div className="border-b border-outline-variant bg-surface-container-low px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined rounded-lg bg-secondary p-2 text-xl text-on-secondary">
              person
            </span>
            <div>
              <h2 className="headline-sm">Author profile</h2>
              <p className="mt-1 text-sm text-on-surface-variant">Add the author information shown on the book page.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-7 p-5 sm:p-8 md:grid-cols-[180px_1fr]">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-on-surface" htmlFor="author-profile-picture">
              Profile picture
            </label>
            <label
              className="group relative flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-outline-variant bg-surface-container-low transition hover:border-secondary"
              htmlFor="author-profile-picture"
            >
              {imagePreview ? (
                <img alt="Author profile preview" className="h-full w-full object-cover" src={imagePreview} />
              ) : (
                <div className="flex flex-col items-center gap-2 p-4 text-center">
                  <ImagePlus className="text-on-surface-variant" />
                  <span className="text-xs font-bold text-on-surface-variant">Upload photo</span>
                </div>
              )}
              <input
                accept="image/png,image/jpeg,image/webp"
                className="sr-only"
                id="author-profile-picture"
                onChange={handleImageChange}
                type="file"
              />
            </label>
            {errors.profilePicture?.message && <p className="error">{errors.profilePicture.message}</p>}
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
      </section>
    </form>
  )
}

export default BookAuthors