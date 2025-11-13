"use client"

import { useState } from "react"
import { Heart, Truck } from "lucide-react"

interface ProductDetailsProps {
  name: string
  price: number
  originalPrice?: number
  category: string
  inStock: boolean
}

export function ProductDetails({ name, price, originalPrice, category, inStock }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedStems, setSelectedStems] = useState("Single")
  const [selectedPot, setSelectedPot] = useState("Default Plastic Pot")
  const [isFavorite, setIsFavorite] = useState(false)

  const planterOptions = ["Default Plastic Pot", "Ceramic Pot", "Wooden Pot", "Decorative Planter"]

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600">
        <span>Home</span>
        <span className="mx-2">/</span>
        <span>{category}</span>
      </div>

      {/* Title and Price */}
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold text-black">{name}</h1>
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-black">Dhs. {price.toFixed(2)}</span>
          {originalPrice && <span className="text-lg line-through text-gray-500">Dhs. {originalPrice.toFixed(2)}</span>}
        </div>
      </div>

      {/* Dropdowns */}
      <div className="flex flex-col gap-4">
        {/* Select Stems */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-black">Select Stems</label>
          <select
            value={selectedStems}
            onChange={(e) => setSelectedStems(e.target.value)}
            className="w-full px-4 py-3 border border-gray-400 rounded text-black bg-white focus:outline-none focus:ring-2 focus:ring-primary-lime"
          >
            <option>Single</option>
            <option>Double</option>
            <option>Triple</option>
          </select>
        </div>

        {/* Select Pot */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-black">Select Pot</label>
          <select
            value={selectedPot}
            onChange={(e) => setSelectedPot(e.target.value)}
            className="w-full px-4 py-3 border border-gray-400 rounded text-black bg-white focus:outline-none focus:ring-2 focus:ring-primary-lime"
          >
            {planterOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-black">Quantity</label>
        <div className="flex items-center gap-0">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-3 border border-gray-400 text-black hover:bg-gray-100 font-medium"
          >
            −
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
            className="w-16 text-center border-t border-b border-gray-400 py-3 text-black font-medium"
          />
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-3 border border-gray-400 text-black hover:bg-gray-100 font-medium"
          >
            +
          </button>
          <button className="flex-1 ml-3 px-4 py-3 border border-gray-400 text-black font-medium hover:bg-gray-50">
            Add to cart
          </button>
        </div>
      </div>

      {/* Buy It Now Button */}
      <button className="w-full px-4 py-3 bg-black text-white font-semibold hover:bg-gray-900">Buy it now</button>

      {/* Wishlist Button */}
      <button
        onClick={() => setIsFavorite(!isFavorite)}
        className="flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-black"
      >
        <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
        <span className="text-sm font-medium">{isFavorite ? "Saved to Wishlist" : "Save to Wishlist"}</span>
      </button>

      {/* Delivery Info */}
      <div className="flex gap-3 pt-4 pb-4 border-b border-gray-200">
        <Truck size={24} className="text-black flex-shrink-0 mt-1" />
        <div className="text-sm">
          <p className="font-semibold text-black">Free returns on all eligible orders</p>
          <p className="text-gray-600 text-xs">You have 7 days to request a return. All sale items are final sale.</p>
        </div>
      </div>
    </div>
  )
}
