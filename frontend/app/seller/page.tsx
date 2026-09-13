import { redirect } from 'next/navigation'
import React from 'react'

const page = () => {
    redirect("/seller/dashboard")
}

export default page