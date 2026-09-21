import { AvailableCategoryType } from "@/types/inventoryTypes"
import { BookOpen, House, LayoutDashboard, LucideIcon, PackagePlus, PackageSearch, Shirt, Smartphone, Sparkles, ToyBrick, Tv } from "lucide-react"
import { bookInventoryFields } from "./formFields/bookFields"
import { phoneInventoryFields } from "./formFields/phoneFields"
import { InventoryFieldType } from "./formFields/inventoryFields"
import { AvailableInventoryType, PhoneInventoryType } from "@/validators/inventoryValidator"
import { ProductType } from "@/store/useAddProduct"

// Sidebar Navigations Links 
export const SideBarNavigations = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/seller/dashboard" },
    { name: "Products", icon: PackageSearch, href: "/seller/products" },
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




// export const ProductsInventoryFields: {
//     [k in AvailableCategoryType]: InventoryFieldType<>[]
// } = {
//     book: bookInventoryFields,
//     phone: phoneInventoryFields
// }

export const phoneInventoryFieldsDefaults: PhoneInventoryType = {
    sku: '',
    price: 0,
    quantity: 0,
    stockDescription: '',
    additionalFields: [],
    brand: '',
    installedRam: '',
    operatingSystem: '',
    cpuSpeed: '',
    memoryStorage: '',
}

export const productsDefaults: ProductType = {
    book: {
        baseDetail: {
            about: "",
            category: "book",
            description: "",
            title: "",
        },
        inventory: [],
        specifications: []
    },

    phone: {
        baseDetail: {
            about: "",
            category: "phone",
            description: "",
            title: "",
        },
        inventory: [],
        specifications: [],
    },
}