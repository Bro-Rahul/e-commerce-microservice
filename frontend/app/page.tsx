
const page = () => {
  return (
    <div className='h-screen w-full flex flex-col justify-center items-center bg-background'>
      <ProductList />
    </div>
  )
}

export default page

const products = [
  {
    id: 1,
    title: "Apple iPhone 16 Pro",
    category: "Smartphones",
    price: "₹1,19,900",
    stock: "In Stock",
    rating: "4.8",
  },
  {
    id: 2,
    title: "Samsung Galaxy S25",
    category: "Smartphones",
    price: "₹80,999",
    stock: "Low Stock",
    rating: "4.6",
  },
  {
    id: 3,
    title: "Sony WH-1000XM6",
    category: "Headphones",
    price: "₹34,990",
    stock: "In Stock",
    rating: "4.7",
  },
  {
    id: 4,
    title: "MacBook Air M4",
    category: "Laptops",
    price: "₹99,900",
    stock: "In Stock",
    rating: "4.9",
  },
]

function ProductList() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="retail-container">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="headline-lg text-foreground">
              Products
            </h1>

            <p className="body-md text-muted-foreground">
              Browse and manage your product catalog
            </p>
          </div>

          <button className="action-button px-5 py-2">
            Add Product
          </button>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="
                group
                flex
                items-center
                gap-5
                rounded-lg
                border
                border-border
                bg-card
                p-4
                transition-all
                duration-200
                hover:border-outline
                hover:shadow-md
              "
            >
              {/* Image Placeholder */}
              <div className="
                flex
                h-20
                w-20
                shrink-0
                items-center
                justify-center
                rounded-md
                bg-surface-container
                text-2xl
              ">
                📦
              </div>

              {/* Product Information */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="headline-sm text-foreground">
                    {product.title}
                  </h2>

                  {product.stock === "Low Stock" && (
                    <span className="label-badge rounded-sm bg-destructive px-2 py-1 text-destructive-foreground">
                      Low Stock
                    </span>
                  )}
                </div>

                <p className="body-sm text-muted-foreground">
                  {product.category}
                </p>
              </div>

              {/* Rating */}
              <div className="hidden text-center sm:block">
                <p className="body-sm text-muted-foreground">
                  Rating
                </p>

                <p className="body-md font-bold text-foreground">
                  ⭐ {product.rating}
                </p>
              </div>

              {/* Stock */}
              <div className="hidden min-w-24 text-center md:block">
                <p className="body-sm text-muted-foreground">
                  Availability
                </p>

                <p className="body-md text-foreground">
                  {product.stock}
                </p>
              </div>

              {/* Price */}
              <div className="min-w-28 text-right">
                <p className="body-sm text-muted-foreground">
                  Price
                </p>

                <p className="price">
                  {product.price}
                </p>
              </div>

              {/* Action */}
              <button className="
                rounded-md
                border
                border-border
                px-4
                py-2
                body-md
                hover:bg-muted
              ">
                View
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}