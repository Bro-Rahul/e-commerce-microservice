import {
    LayoutDashboard,
    LucideIcon,
    PackagePlus,
    PackageSearch,
} from "lucide-react"
import ROUTES from "./routes"



// Sidebar Navigations Links for seller
export const SellerSideBarNavigations = [
    { name: "Dashboard", icon: LayoutDashboard, href: ROUTES.SELLER.DASHBOARD },
    { name: "Products", icon: PackageSearch, href: ROUTES.SELLER.PRODUCTS.LIST },
    { name: "Add A product", icon: PackagePlus, href: ROUTES.SELLER.PRODUCTS.ADD_PRODUCT.SELECT_CATEGEORY },
]

// Sidebar Navigations Links for admin 
export const AdminSideBarNavigations = [
    { name: "Dashboard", icon: LayoutDashboard, href: ROUTES.ADMIN.DASHBOARD },
    { name: "Products", icon: PackageSearch, href: ROUTES.ADMIN.PRODUCTS },
    { name: "Category", icon: PackagePlus, href: ROUTES.ADMIN.CATEGORY.ROOT },
]


interface SelectInputsOptionsTypes {
    name: string,
    lable: string
}

export const AvailableCategory: SelectInputsOptionsTypes[] = [
    {
        name: "books",
        lable: "Books"
    },
    {
        name: "phones",
        lable: "Phones"
    }
]

export const ProductStatusList: SelectInputsOptionsTypes[] = [
    {
        name: "ACTIVE",
        lable: "Active"
    },
    {
        name: "OUT_OF_STOCK",
        lable: "Out of stock"
    },
    {
        name: "PENDING_REVIEW",
        lable: "Pending Review"
    },
    {
        name: "ARCHIVED",
        lable: "Archived"
    }
]
