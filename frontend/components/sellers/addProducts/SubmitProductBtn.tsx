
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'
interface SubmitProductBtnProps {
    handleClick: () => void
}

const SubmitProductBtn = ({ handleClick }: SubmitProductBtnProps) => {
    return (
        <div className="flex w-full justify-end pb-6 md:px-6 my-5">
            <Button className='w-full' type="button" onClick={handleClick} >
                <Upload aria-hidden="true" /> Submit Product
            </Button>
        </div>
    )
}

export default SubmitProductBtn