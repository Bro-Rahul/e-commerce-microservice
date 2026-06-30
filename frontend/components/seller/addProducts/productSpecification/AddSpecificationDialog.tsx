import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { Controller, useFormContext } from "react-hook-form"

interface AddSpecificationDialogProps {
    handleOnSave: (value: string) => void
}

const AddSpecificationDialog = ({ handleOnSave }: AddSpecificationDialogProps) => {

    const { control, getValues, resetField } = useFormContext();

    const handleClick = () => {
        const newSpecification = getValues("name");
        if (newSpecification.trim().length === 0) return;
        handleOnSave(newSpecification.trim());
        resetField("name")
    }
    return (
        <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange }, fieldState: { error } }) =>
                <Dialog>
                    <div>
                        <DialogTrigger asChild>
                            <Button
                                className="flex shrink-0 items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/85"
                            >
                                <Plus className="size-4" />
                                Add Specification Group
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-sm">
                            <DialogHeader>
                                <DialogTitle>Enter Specification Name</DialogTitle>
                                <DialogDescription>
                                    Specification Name will contain detail related that subject itself
                                </DialogDescription>
                            </DialogHeader>
                            <FieldGroup>
                                <Field>
                                    <Label htmlFor="specifications">Name</Label>
                                    <Input
                                        name="specifications"
                                        value={value || ''}
                                        placeholder="Enter the Name..."
                                        onChange={e => onChange(e.target.value)}
                                    />
                                </Field>
                            </FieldGroup>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <Button onClick={handleClick} type="submit">Save changes</Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </div>
                    {error?.message && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
                </Dialog >
            }
        />
    )
}


export default AddSpecificationDialog;