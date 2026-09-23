"use client"

import { Button } from "@/components/ui/button"
import useArrayFieldStore from "@/store/useArrayFieldContext"
import { ArrayFieldsForm, arrayFieldsValidator } from "@/validators/arrayFieldValidator"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Save, Trash2 } from "lucide-react"
import { useEffect } from "react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import toast from "react-hot-toast"

export interface ArrayDataType {
  value: string
}


interface ArrayFieldsProps {
  title: string
  description: string,
  searchKey: string,
  onSave?: (arrayData: ArrayDataType[]) => void
}

const ArrayFields = ({ description, title, searchKey, onSave }: ArrayFieldsProps) => {
  const { setArrayField } = useArrayFieldStore();
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors }

  } = useForm<ArrayFieldsForm>({
    defaultValues: {
      arrayData: [],
    },
    resolver: zodResolver(arrayFieldsValidator),
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "arrayData",
  })

  useEffect(() => {
    const setState = () => {
      const arrayData = useArrayFieldStore.getState().data[searchKey] ?? []
      reset({ arrayData: arrayData });
    }
    if (useArrayFieldStore.persist.hasHydrated()) {
      setState();
      return;
    }

    const unsubscribe = useArrayFieldStore.persist.onFinishHydration(() => setState())

    return unsubscribe;

  }, []);

  const onSubmit = (data: ArrayFieldsForm) => {
    setArrayField(searchKey, data.arrayData);
    toast.success(`${searchKey} has been Saved!`, {
      position: "bottom-right",
      duration: 5000
    })
    if (onSave) onSave(data.arrayData);
  }

  const onRemove = (index: number) => {
    remove(index);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="flex flex-col border-t border-outline-variant py-5">
        <div className="border-b border-outline-variant bg-surface-container-low px-5 py-4 sm:px-8">
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <span className="material-symbols-outlined w-fit rounded-lg bg-secondary p-2 text-xl text-on-secondary">
                data_array
              </span>

              <div>
                <h2 className="headline-sm">{title}</h2>

                <p className="mt-1 text-sm text-on-surface-variant">
                  {description}
                </p>
              </div>
            </div>

            <Button
              type="button"
              className="bg-secondary text-on-secondary hover:bg-secondary/90"
              onClick={() => append({ value: "" })}
            >
              <Plus />
              Add Item
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4 p-5 sm:px-8">
          {fields.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-outline-variant bg-surface-container-low px-6 py-10 text-center">
              <span className="material-symbols-outlined mb-3 text-3xl text-on-surface-variant">
                data_array
              </span>

              <p className="text-sm font-medium text-on-surface">
                No items added yet
              </p>

              <p className="mt-1 text-sm text-on-surface-variant">
                Click "Add Item" above to add your first item.
              </p>
            </div>
          ) : (
            fields.map((field, index) => (
              <Controller
                key={field.id}
                name={`arrayData.${index}.value`}
                control={control}
                render={({ fieldState: { error } }) =>
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <input
                        className="inputfields"
                        {...register(`arrayData.${index}.value`)}
                        placeholder={`Item ${index + 1}`}
                      />

                      {error?.message && (
                        <p className="error">
                          {error.message}
                        </p>
                      )}
                    </div>

                    {fields.length > 1 && <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>}
                  </div>}
              />
            ))
          )}

          {errors.arrayData?.message && (
            <p className="text-sm text-destructive">
              {errors.arrayData.message}
            </p>
          )}

          {fields.length > 0 && (
            <Button
              className="self-end mr-10  bg-card font-bold text-on-secondary hover:bg-secondary/90"
              variant={'outline'}
              type='submit'
            >
              <Save />
              Save Data
            </Button>
          )}
        </div>
      </section>
    </form>
  )
}

export default ArrayFields

