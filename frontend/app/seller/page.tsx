import ROUTES from '@/constants/data/routes'
import { redirect } from 'next/navigation'

const page = () => {
    redirect(ROUTES.SELLER.DASHBOARD)
}

export default page