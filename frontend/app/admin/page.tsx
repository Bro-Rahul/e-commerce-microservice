import ROUTES from "@/constants/data/routes"
import { redirect } from "next/navigation"

const page = () => {

    redirect(ROUTES.ADMIN.DASHBOARD)
}

export default page