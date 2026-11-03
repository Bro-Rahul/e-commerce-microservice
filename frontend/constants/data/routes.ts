
const ROUTES = {
    SELLER: {
        ROOT: "/seller",
        DASHBOARD: "/seller/dashboard",

        PRODUCTS: {
            ADD_PRODUCT: {
                SELECT_CATEGEORY: "/seller/add-product",
                PRODUCT_FORM: (category: string) => `/seller/add-product/${category}/product-form`,
                VIEW_PRODUCT: (category: string) => `/seller/add-product/${category}/product-display`,
            },
            LIST: "/seller/products?page=0&pageSize=5",
            EDIT: {
                base: (id: string) => `/seller/products/${id}/base`,
                inventory: (id: string) => `/seller/products/${id}/inventory`,
                assets: (id: string) => `/seller/products/${id}/assets`,
                otherDetails: (id: string) => `/seller/products/${id}/other-details`,
                productStatus: (id: string) => `/seller/products/${id}/product-status`,
            },
        },
    },

    ADMIN: {
        ROOT: "/admin",
        DASHBOARD: "/admin/dashboard",
        PRODUCTS: "/admin/products?page=0&pageSize=5",
        CATEGORY: {
            ROOT: "/admin/category",
            CREATE: "/admin/category/create"
        }
    },
} as const;


export default ROUTES;