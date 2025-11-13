"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { RelatedProductCard } from "./related-products-card"
import { Button } from "@/components/ui/button"

interface Product {
  id: string
  name: string
  image: string
  price: number
  originalPrice?: number
  category: string
}

interface RelatedProductsSectionProps {
  products: Product[]
}

export function RelatedProductsSection({ products }: RelatedProductsSectionProps) {
  const [scrollPosition, setScrollPosition] = useState(0)

  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById("products-carousel")
    if (container) {
      const scrollAmount = 300
      const newPosition = direction === "left" ? scrollPosition - scrollAmount : scrollPosition + scrollAmount
      container.scrollTo({ left: newPosition, behavior: "smooth" })
      setScrollPosition(newPosition)
    }
  }

  return (
    <section className="py-8 border-t">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-black">You may also like</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => scroll("left")} className="border-gray-300">
            <ChevronLeft size={20} />
          </Button>
          <Button variant="outline" size="icon" onClick={() => scroll("right")} className="border-gray-300">
            <ChevronRight size={20} />
          </Button>
        </div>
      </div>

      {/* Carousel */}
      <div
        id="products-carousel"
        className="flex gap-4 overflow-x-auto pb-4 scroll-smooth"
        style={{ scrollBehavior: "smooth" }}
      >
        {products.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-48">
            <RelatedProductCard {...product} />
          </div>
        ))}
      </div>
    </section>
  )
}
