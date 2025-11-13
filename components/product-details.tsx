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
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2">
          <div className="flex items-center md:items-stretch gap-0 md:gap-0">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-full md:w-12 px-4 py-3 border border-gray-400 text-black hover:bg-gray-100 font-medium"
            >
              −
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
              className="w-full md:w-16 text-center border-t border-b border-gray-400 py-3 text-black font-medium"
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-full md:w-12 px-4 py-3 border border-gray-400 text-black hover:bg-gray-100 font-medium"
            >
              +
            </button>
          </div>

          <button className="w-full md:flex-1 md:ml-3 px-4 py-3 border border-gray-400 text-black font-medium hover:bg-gray-50">
            Add to cart
          </button>
        </div>
      </div>

      {/* Buy It Now Button */}
      <button className="w-full px-4 py-3 bg-black text-white font-semibold hover:bg-gray-900">Buy it now</button>

      {/* Wishlist Button */}
      {/* <button
        onClick={() => setIsFavorite(!isFavorite)}
        className="flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-black"
      >
        <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
        <span className="text-sm font-medium">{isFavorite ? "Saved to Wishlist" : "Save to Wishlist"}</span>
      </button> */}

      {/* Delivery Info / Live banner (from devtools) */}
      <div
        className="key-details flex gap-4 items-start rounded-md p-4 md:p-5 w-full"
        style={{
          // set the original CSS variables and apply background color
          // using React style object; cast to satisfy TypeScript for CSS vars
          ...( {
            "--key-details-text-color": "#1d1d1d",
            "--key-details-icon-color": "#1d1d1d",
            "--key-details-background-color": "#f5f3ed",
            backgroundColor: "var(--key-details-background-color)",
          } as React.CSSProperties ),
        }}
      >
        <div className="shrink-0 flex items-center justify-center w-9 h-9" style={{ color: "var(--key-details-icon-color)" }}>
          <svg
            className="icon-transfer key-details__icon"
            aria-hidden="true"
            focusable="false"
            role="presentation"
            xmlns="http://www.w3.org/2000/svg"
            width={28}
            height={28}
            viewBox="0 0 44 44"
            fill="none"
          >
            <path
              d="M1.375 22C1.375 27.4701 3.54798 32.7161 7.41592 36.5841C11.2839 40.452 16.5299 42.625 22 42.625C27.4701 42.625 32.7161 40.452 36.5841 36.5841C40.452 32.7161 42.625 27.4701 42.625 22C42.625 16.5299 40.452 11.2839 36.5841 7.41592C32.7161 3.54798 27.4701 1.375 22 1.375C16.5299 1.375 11.2839 3.54798 7.41592 7.41592C3.54798 11.2839 1.375 16.5299 1.375 22V22Z"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M16.5 15.125H31.625" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M26.125 9.625L31.625 15.125L26.125 20.625" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M27.5 28.875H12.375" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17.875 34.375L12.375 28.875L17.875 23.375" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="key-details__wrapper text-sm" style={{ color: "var(--key-details-text-color)" }}>
          <p className="key-details__heading font-semibold mb-1">Free returns on all eligible orders</p>
          <p className="text-gray-600 text-xs">You have 7 days to request a return. All sale items are final sale.</p>
        </div>
      </div>
    </div>
  )
}
