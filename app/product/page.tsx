"use client"

import { Header } from "@/components/header"
import { ProductGallery } from "@/components/product-gallery"
import { ProductDetails } from "@/components/product-details"
import { ProductDescription } from "@/components/product-description"
import { RelatedProductsSection } from "@/components/related-products-section"
import { Footer } from "@/components/footer"

export default function ProductPage() {
  // Sample product data
  const product = {
    id: 1,
    name: "White Orchids 50-70cm",
    price: 95.0,
    originalPrice: undefined,
    category: "Indoor Plants",
    inStock: true,
    images: [
      "/white-orchids-plant-in-pot-thumbnail-1.jpg",
      "/white-orchids-plant-in-pot-thumbnail-2.jpg",
      "/white-orchids-plant-in-pot-thumbnail-3.jpg",
      "/white-orchids-plant-in-pot-thumbnail-4.jpg",
      "/white-orchids-plant-in-pot-thumbnail-5.jpg",
    ],
    description:
      "Known as moth orchids or phals, are a popular house plant native to Australia and southeastern Asia. Moth orchids are easy to grow and take care of.",
    careInstructions: [
      "Phalaenopsis will flourish indoors under normal lighting conditions, with indirect sunlight being the most advantageous.",
      "Water often enough to keep continuous moisture just below the surface of the medium, but be cautious of over watering. Watering once a week is normally sufficient to keep your plant healthy and happy.",
      "When the last flower drops, cut your flower spike halfway down the stem. Continue caring for it and wait for a possible reblooom.",
    ],
  }

  const relatedProducts = [
    {
      id: "1",
      name: "3 Bougainvillea Spectabilis Bundle 80 - 100cm in Ceramic",
      image: "/bougainvillea-flowers-plant.jpg",
      price: 420.0,
      originalPrice: 495.0,
      category: "Outdoor Plants",
    },
    {
      id: "2",
      name: "Mini succulents Haworthia & Echeveria per piece",
      image: "/mini-succulent-plants.jpg",
      price: 25.0,
      originalPrice: 35.0,
      category: "Succulents",
    },
    {
      id: "3",
      name: "Artificial White Orchids 50cm",
      image: "/artificial-white-orchids.jpg",
      price: 110.0,
      category: "Artificial Plants",
    },
    {
      id: "4",
      name: "Faux Ylang - Boncel 50 - 70cm",
      image: "/faux-plant-ylang-boncel.jpg",
      price: 155.0,
      originalPrice: 210.0,
      category: "Artificial Plants",
    },
    {
      id: "5",
      name: "Calaathea orbifolia 30-40cm in Ceramic Pot",
      image: "/calaathea-orbifolia-plant-ceramic-pot.jpg",
      price: 115.0,
      originalPrice: 120.0,
      category: "Indoor Plants",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-12 py-3">
        <div className="text-sm text-gray-600">
          <span>Home</span>
          <span className="mx-2">/</span>
          <span>{product.name}</span>
        </div>
      </div>

      {/* Main Content - 3 Column Layout */}
      <main className="bg-white px-4 md:px-12 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left: Thumbnail Gallery - 1 column */}
          <div className="md:col-span-1">
            <ProductGallery.Thumbnails images={product.images} />
          </div>

          {/* Center: Main Product Image - 6 columns */}
          <div className="md:col-span-6">
            <ProductGallery.MainImage productName={product.name} />
          </div>

          {/* Right: Product Details - 5 columns */}
          <div className="md:col-span-5">
            <ProductDetails
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              category={product.category}
              inStock={product.inStock}
            />
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-16 border-t pt-12">
          <ProductDescription
            name="Moth Orchids"
            description={product.description}
            careInstructions={product.careInstructions}
          />
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <RelatedProductsSection products={relatedProducts} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
