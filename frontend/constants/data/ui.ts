import {
    BookOpen,
    House,
    LayoutDashboard,
    LucideIcon,
    PackagePlus,
    PackageSearch,
    Shirt,
    Smartphone,
    Sparkles,
    ToyBrick,
    Tv
} from "lucide-react"


// Sidebar Navigations Links 
export const SideBarNavigations = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/seller/dashboard" },
    { name: "Products", icon: PackageSearch, href: "/seller/products/?page=0&pageSize=5" },
    { name: "Add A product", icon: PackagePlus, href: "/seller/add-product" },
]


// Available Category 
type Category = {
    name: string
    description: string
    icon: LucideIcon,
    href: string
}


export const Categories: Category[] = [
    { name: "Books", description: "Print, eBooks & audio", icon: BookOpen, href: "/seller/add-product/book" },
    { name: "Phones & tablets", description: "Mobile devices & accessories", icon: Smartphone, href: "/seller/add-product/phone" },
    { name: "Electronics", description: "TV, computing & gadgets", icon: Tv, href: "/seller/add-product/computers" },
    { name: "Home & kitchen", description: "Furniture, decor & cooking", icon: House, href: "/seller/add-product/home" },
    { name: "Clothing", description: "Fashion, footwear & bags", icon: Shirt, href: "/seller/add-product/clothe" },
    { name: "Beauty", description: "Skincare, cosmetics & care", icon: Sparkles, href: "/seller/add-product/beauty" },
    { name: "Toys & games", description: "Play, puzzles & hobbies", icon: ToyBrick, href: "/seller/add-product/games" },
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
