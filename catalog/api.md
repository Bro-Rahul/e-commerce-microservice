# Catalog Service API Documentation

## Overview

The **Catalog Service** manages products, categories, brands, product images, product attributes, and product search.

The service exposes APIs for two main users:

* **Customer** — browse, search, filter, and view products.
* **Seller** — create and manage their own products, images, and stock.

---

# 1. Customer APIs

Customer APIs are primarily read-only.

## 1.1 Get Products

```http
GET /catalog/products
```

### Purpose

Returns a paginated list of products.

Supports pagination, filtering, and sorting.

### Query Parameters

```text
?page=0
&size=20
&category=phones
&minPrice=10000
&maxPrice=30000
&sort=price_asc
```

### Example

```http
GET /catalog/products?page=0&size=20&category=phones&minPrice=10000&maxPrice=30000
```

### Response

```json
{
  "content": [
    {
      "id": 101,
      "title": "Redmi Note 15",
      "price": 15999,
      "category": "Phones",
      "thumbnail": "/images/redmi.jpg"
    }
  ],
  "page": 0,
  "size": 20,
  "totalElements": 120,
  "totalPages": 6
}
```

---

## 1.2 Get Product Details

```http
GET /catalog/products/{id}
```

### Purpose

Returns complete information about a specific product.

Used when a customer opens the product details page.

### Response

```json
{
  "id": 101,
  "title": "Redmi Note 15",
  "description": "8GB RAM smartphone",
  "price": 15999,
  "category": {
    "id": 10,
    "name": "Phones"
  },
  "images": [
    "/images/redmi-1.jpg",
    "/images/redmi-2.jpg"
  ],
  "attributes": {
    "brand": "Redmi",
    "ram": "8GB",
    "storage": "256GB"
  }
}
```

---

## 1.3 Search Products

```http
GET /catalog/products/search?q={query}
```

### Purpose

Searches products using a text query.

This endpoint can use **Elasticsearch** for full-text search.

### Example

```http
GET /catalog/products/search?q=redmi+phone
```

### Response

```json
{
  "content": [
    {
      "id": 101,
      "title": "Redmi Note 15",
      "price": 15999
    }
  ],
  "totalElements": 1
}
```

---

## 1.4 Get Related Products

```http
GET /catalog/products/{id}/related
```

### Purpose

Returns products related to the product currently being viewed.

Useful for sections such as:

* Related Products
* Similar Products
* Customers Also Viewed

### Response

```json
[
  {
    "id": 102,
    "title": "Redmi Note 14",
    "price": 14999
  },
  {
    "id": 103,
    "title": "Samsung A56",
    "price": 28999
  }
]
```

---

# 2. Category APIs

## 2.1 Get All Categories

```http
GET /catalog/categories
```

### Purpose

Returns all available product categories.

Used for:

* Navigation menus
* Category pages
* Product filters
* Product creation forms

### Response

```json
[
  {
    "id": 1,
    "name": "Electronics",
    "parentCategory": null
  },
  {
    "id": 2,
    "name": "Phones",
    "parentCategory": 1
  }
]
```

---

## 2.2 Get Category

```http
GET /catalog/categories/{id}
```

### Purpose

Returns information about a specific category.

### Response

```json
{
  "id": 2,
  "name": "Phones",
  "parentCategory": {
    "id": 1,
    "name": "Electronics"
  }
}
```

---

## 2.3 Get Products by Category

```http
GET /catalog/categories/{id}/products
```

### Purpose

Returns products belonging to a specific category.

### Example

```http
GET /catalog/categories/2/products
```

---

# 3. Brand APIs

## 3.1 Get Brands

```http
GET /catalog/brands
```

### Purpose

Returns available brands.

Useful for:

* Brand filters
* Product creation forms
* Brand navigation

### Response

```json
[
  {
    "id": 1,
    "name": "Samsung"
  },
  {
    "id": 2,
    "name": "Redmi"
  },
  {
    "id": 3,
    "name": "Apple"
  }
]
```

---

## 3.2 Get Products by Brand

```http
GET /catalog/brands/{id}/products
```

### Purpose

Returns products belonging to a specific brand.

### Example

```http
GET /catalog/brands/2/products
```

---

# 4. Seller APIs

Seller APIs require authentication.

```http
Authorization: Bearer <JWT>
```

The seller ID should be obtained from the authenticated JWT instead of being provided by the client.

---

## 4.1 Create Product

```http
POST /catalog/seller/products
```

### Purpose

Creates a new product owned by the authenticated seller.

### Payload

```json
{
  "title": "Redmi Note 15",
  "description": "8GB RAM smartphone",
  "price": 15999,
  "categoryId": 2,
  "aboutItem": [
    "8GB RAM",
    "256GB Storage",
    "5000mAh Battery"
  ],
  "metaDetail": {
    "brand": "Redmi",
    "ram": "8GB",
    "storage": "256GB",
    "color": "Black"
  }
}
```

The client should **not** send:

```json
{
  "sellerId": 25
}
```

The backend obtains the seller ID from the JWT.

---

## 4.2 Get Seller Products

```http
GET /catalog/seller/products
```

### Purpose

Returns products belonging to the currently authenticated seller.

Used by the seller dashboard.

### Example Response

```json
{
  "content": [
    {
      "id": 101,
      "title": "Redmi Note 15",
      "price": 15999,
      "status": "ACTIVE"
    }
  ],
  "page": 0,
  "size": 20,
  "totalElements": 1
}
```

---

## 4.3 Get Seller Product

```http
GET /catalog/seller/products/{id}
```

### Purpose

Returns complete information about one product owned by the authenticated seller.

The backend must verify that the product belongs to the authenticated seller.

---

## 4.4 Update Product

```http
PUT /catalog/seller/products/{id}
```

### Purpose

Completely updates an existing product.

### Payload

```json
{
  "title": "Redmi Note 15 Pro",
  "description": "Updated description",
  "price": 17999,
  "categoryId": 2,
  "aboutItem": [
    "12GB RAM",
    "256GB Storage"
  ],
  "metaDetail": {
    "brand": "Redmi",
    "ram": "12GB",
    "storage": "256GB"
  }
}
```

---

## 4.5 Partially Update Product

```http
PATCH /catalog/seller/products/{id}
```

### Purpose

Updates only selected fields of a product.

For example, changing only the price.

### Payload

```json
{
  "price": 16999
}
```

---

## 4.6 Delete Product

```http
DELETE /catalog/seller/products/{id}
```

### Purpose

Removes or deactivates a seller's product.

For an e-commerce system, soft deletion is generally useful:

```text
status = INACTIVE
```

instead of physically deleting the product.

---

# 5. Product Image APIs

## 5.1 Upload Product Images

```http
POST /catalog/seller/products/{id}/images
```

### Purpose

Uploads one or more images associated with a product.

### Content Type

```http
Content-Type: multipart/form-data
```

### Example Form Data

```text
images = redmi-front.jpg
images = redmi-back.jpg
images = redmi-side.jpg
```

The server stores the images and associates their URLs with the product.

---

## 5.2 Delete Product Image

```http
DELETE /catalog/seller/products/{id}/images/{imageId}
```

### Purpose

Deletes a specific image associated with a seller's product.

---

# 6. Seller Category APIs

> **Note:** In a marketplace, category management is usually handled by an Admin rather than individual sellers. These APIs are included only if your application allows sellers to manage categories.

---

## 6.1 Create Category

```http
POST /catalog/seller/categories
```

### Purpose

Creates a new category.

### Payload

```json
{
  "name": "Gaming Phones",
  "parentCategoryId": 2
}
```

---

## 6.2 Get Seller Categories

```http
GET /catalog/seller/categories
```

### Purpose

Returns categories available to the seller.

---

## 6.3 Update Category

```http
PUT /catalog/seller/categories/{id}
```

### Purpose

Updates an existing category.

### Payload

```json
{
  "name": "Gaming Smartphones",
  "parentCategoryId": 2
}
```

---

## 6.4 Delete Category

```http
DELETE /catalog/seller/categories/{id}
```

### Purpose

Deletes or deactivates a category.

---

# 7. Stock APIs

These APIs are applicable if stock/inventory is managed inside the Catalog Service.

If you later create a dedicated **Inventory Service**, these APIs should move there.

---

## 7.1 Get Product Stock

```http
GET /catalog/seller/products/{id}/stock
```

### Purpose

Returns the current stock information for a seller's product.

### Response

```json
{
  "productId": 101,
  "quantity": 50,
  "reserved": 5,
  "available": 45
}
```

---

## 7.2 Update Product Stock

```http
PUT /catalog/seller/products/{id}/stock
```

### Purpose

Replaces the current stock quantity.

### Payload

```json
{
  "quantity": 100
}
```

---

## 7.3 Partially Update Product Stock

```http
PATCH /catalog/seller/products/{id}/stock
```

### Purpose

Partially updates stock information.

### Payload

```json
{
  "quantity": 75
}
```

---

# API Summary

## Customer

| Method | Endpoint                            | Purpose                      |
| ------ | ----------------------------------- | ---------------------------- |
| GET    | `/catalog/products`                 | List/search/filter products  |
| GET    | `/catalog/products/{id}`            | Product details              |
| GET    | `/catalog/products/search`          | Elasticsearch product search |
| GET    | `/catalog/products/{id}/related`    | Related products             |
| GET    | `/catalog/categories`               | List categories              |
| GET    | `/catalog/categories/{id}`          | Category details             |
| GET    | `/catalog/categories/{id}/products` | Products in category         |
| GET    | `/catalog/brands`                   | List brands                  |
| GET    | `/catalog/brands/{id}/products`     | Products by brand            |

## Seller

| Method | Endpoint                                         | Purpose                   |
| ------ | ------------------------------------------------ | ------------------------- |
| POST   | `/catalog/seller/products`                       | Create product            |
| GET    | `/catalog/seller/products`                       | Seller's products         |
| GET    | `/catalog/seller/products/{id}`                  | Seller product details    |
| PUT    | `/catalog/seller/products/{id}`                  | Replace product           |
| PATCH  | `/catalog/seller/products/{id}`                  | Partially update product  |
| DELETE | `/catalog/seller/products/{id}`                  | Delete/deactivate product |
| POST   | `/catalog/seller/products/{id}/images`           | Upload images             |
| DELETE | `/catalog/seller/products/{id}/images/{imageId}` | Delete image              |
| POST   | `/catalog/seller/categories`                     | Create category           |
| GET    | `/catalog/seller/categories`                     | List seller categories    |
| PUT    | `/catalog/seller/categories/{id}`                | Update category           |
| DELETE | `/catalog/seller/categories/{id}`                | Delete category           |
| GET    | `/catalog/seller/products/{id}/stock`            | Get stock                 |
| PUT    | `/catalog/seller/products/{id}/stock`            | Update stock              |
| PATCH  | `/catalog/seller/products/{id}/stock`            | Partially update stock    |

# Authentication

Seller endpoints require:

```http
Authorization: Bearer <JWT>
```

The backend should obtain the seller ID from the authenticated JWT:

```text
JWT
 │
 ├── subject → sellerId
 └── role    → SELLER
                  │
                  ▼
             Catalog Service
                  │
                  ▼
        Product belongs to seller
```

This prevents a seller from modifying another seller's products by simply changing a `sellerId` in the request.
