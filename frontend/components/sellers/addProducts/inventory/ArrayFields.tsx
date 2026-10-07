"use client"

import { Button } from "@/components/ui/button"
import { ArrayFieldsForm, arrayFieldsValidator } from "@/validators/arrayFieldValidator"
import { zodResolver } from "@hookform/resolvers/zod"
import { List, Plus, Save, Trash2 } from "lucide-react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import FormCard from "../productForms/FormCard"
import JsonUploadBtn from "../JsonUploadBtn"
import { useEffect } from "react"

export interface ArrayDataType {
  value: string
}


interface ArrayFieldsProps {
  title: string
  description: string,
  searchKey: string,
  values?: ArrayDataType[],
  onSave?: (arrayData: ArrayDataType[]) => void
}

const ArrayFields = ({ description, title, searchKey, values, onSave }: ArrayFieldsProps) => {
  const resolver = arrayFieldsValidator.shape.arrayData
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors }

  } = useForm<ArrayFieldsForm>({
    defaultValues: {
      arrayData: values ?? [],
    },
    resolver: zodResolver(arrayFieldsValidator),
  })

  useEffect(() => {
    reset({ arrayData: values })
  }, [values])

  const { fields, append, remove } = useFieldArray({
    control,
    name: "arrayData",
  })


  const onSubmit = (data: ArrayFieldsForm) => {
    toast.success(`${searchKey} has been Saved!`, {
      position: "bottom-right",
      duration: 5000
    })
    if (onSave) onSave(data.arrayData);
  }


  return (
    <FormCard
      Icon={List}
      heading={title}
      description={description}
      headerActions={
        <>
          <Button
            type="button"
            className="bg-secondary text-on-secondary hover:bg-secondary/90"
            onClick={() => append({ value: "" })}
          >
            <Plus />
            Add Item
          </Button>
          <JsonUploadBtn
            schema={resolver}
            onSuccess={data => {
              onSubmit({ arrayData: data })
              reset({ arrayData: data })
            }}
          />
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
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
            <div className="flex w-full justify-end border-t border-outline-variant bg-surface-container-low px-3 py-4 sm:px-4">
              <Button
                className="w-full max-w-xs bg-card font-bold text-on-secondary hover:bg-secondary/90 sm:w-fit"
                variant={'outline'}
                type='submit'
              >
                <Save />
                Save Data
              </Button>
            </div>
          )}
        </div>
      </form>
    </FormCard>
  )
}

export default ArrayFields

