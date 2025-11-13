"use client"

import { useState } from "react"
import Image from "next/image"
import { ZoomIn } from "lucide-react"

interface ProductGalleryProps {
  productName: string
  images: string[]
}

// Main Image Component
function MainImage({ productName }: { productName: string }) {
  return (
    <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
      <Image src="/white-orchids-potted-plant-on-wooden-table.jpg" alt={productName} fill className="object-cover w-full h-full" />
      {/* Click to expand overlay */}
      <div className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded flex items-center gap-2 text-sm font-medium text-black">
        <ZoomIn size={16} />
        Click to expand
      </div>
    </div>
  )
}

// Thumbnail Gallery Component
function Thumbnails({ images }: { images: string[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div className="flex flex-col gap-3">
      {images.map((image, index) => (
        <button
          key={index}
          onClick={() => setSelectedIndex(index)}
          className={`w-20 h-20 rounded-md border-2 overflow-hidden transition-colors flex-shrink-0 ${
            index === selectedIndex ? "border-primary-lime" : "border-gray-300 hover:border-gray-400"
          }`}
        >
          <Image
            src={image || "/placeholder.svg"}
            alt={`Thumbnail ${index + 1}`}
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        </button>
      ))}
    </div>
  )
}

// Export as namespace
export const ProductGallery = {
  MainImage,
  Thumbnails,
}
