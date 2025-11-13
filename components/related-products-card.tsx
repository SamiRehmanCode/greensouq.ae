import Image from "next/image"
import Link from "next/link"

interface RelatedProductCardProps {
  id: string
  name: string
  image: string
  price: number
  originalPrice?: number
  category: string
}

export function RelatedProductCard({ id, name, image, price, originalPrice, category }: RelatedProductCardProps) {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

  return (
    <Link href={`/product/${id}`}>
      <div className="flex flex-col bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer h-full">
        {/* Product Image */}
        <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover w-full h-full hover:scale-105 transition-transform"
          />
          {discount > 0 && (
            <div className="absolute top-2 right-2 bg-black text-[#9AD92B] text-xs font-bold px-2 py-1 rounded">
              -{discount}%
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-2 p-3">
          <p className="text-xs text-gray-500 font-medium">{category}</p>
          <h3 className="text-sm font-semibold text-black line-clamp-2 hover:text-[#9AD92B]">{name}</h3>
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-black">Dhs. {price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-xs line-through text-gray-500">Dhs. {originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
