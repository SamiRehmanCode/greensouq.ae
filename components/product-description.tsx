interface ProductDescriptionProps {
  name: string
  description: string
  careInstructions: string[]
}

export function ProductDescription({ name, description, careInstructions }: ProductDescriptionProps) {
  return (
    <div className="flex flex-col gap-6 py-8 border-t">
      <div>
        <h2 className="text-2xl font-bold text-black mb-3">{name}</h2>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>

      <div>
        <h3 className="text-xl font-bold text-black mb-4">Care Instructions</h3>
        <ul className="space-y-3">
          {careInstructions.map((instruction, index) => (
            <li key={index} className="flex gap-3">
              <span className="text-[#9AD92B] font-bold flex-shrink-0">•</span>
              <span className="text-gray-700">{instruction}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
