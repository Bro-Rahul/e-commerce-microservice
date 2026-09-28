import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import { useState } from 'react'

interface SpecificationNameDialogProps {
    handleSave: (name: string) => void
}

const SpecificationNameDialog = ({ handleSave }: SpecificationNameDialogProps) => {
    const [name, setName] = useState<string>('');
    const handleClick = () => {
        if (name.trim().length === 0) return;
        handleSave(name)
        setName('')
    }
    return (
        <Dialog>
            <DialogTrigger render={<Button className="self-end bg-secondary font-bold text-on-secondary hover:bg-secondary/90" type="button" />}>
                <Plus />
                Add new Specification
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add new specification</DialogTitle>
                    <DialogDescription>Enter a name for this specification group.</DialogDescription>
                </DialogHeader>
                <div className="space-y-2">
                    <label className="block text-sm font-bold text-on-surface" htmlFor="specification-name">
                        Specification name
                    </label>
                    <input className="inputfields"
                        id="specification-name"
                        placeholder="e.g. Display" type="text"
                        onChange={e => setName(e.target.value)}
                        value={name}
                    />
                </div>
                <DialogFooter>
                    <DialogClose render={<Button type="button" variant="outline" />}>
                        Cancel
                    </DialogClose>
                    <DialogClose
                        render={<Button
                            onClick={handleClick}
                            className="bg-secondary text-on-secondary hover:bg-secondary/90" type="button" />}
                    >
                        Add specification
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default SpecificationNameDialog