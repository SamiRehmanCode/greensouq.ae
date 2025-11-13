"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import PostLoginModal from "@/components/post-login-modal"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, Truck, Award } from "lucide-react"

export default function HomePage() {
  const categories = [
    { name: "Indoor Plants", href: "#", icon: "🌿" },
    { name: "Outdoor Plants", href: "#", icon: "🌳" },
    { name: "Seeds", href: "#", icon: "🌱" },
    { name: "Pots & Planters", href: "#", icon: "🪴" },
  ]

  const features = [
    {
      icon: Leaf,
      title: "Premium Plants",
      description: "Handpicked plants sourced from trusted growers",
    },
    {
      icon: Truck,
      title: "Free Delivery",
      description: "Free shipping on orders over AED 100",
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description: "7-day return guarantee on all products",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PostLoginModal forceOpen />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#9AD92B] to-[#7fb51e] px-4 md:px-8 py-16">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h1 className="text-5xl md:text-6xl font-bold text-black mb-4">Green Your Space</h1>
              <p className="text-lg text-black mb-6 opacity-90">
                Discover our collection of premium indoor and outdoor plants. Transform your home into a green paradise.
              </p>
              <div className="flex gap-4">
                <Link href="/product">
                  <Button className="bg-black text-white hover:bg-gray-800 px-8 py-6 text-lg flex items-center gap-2">
                    Shop Now
                    <ArrowRight size={20} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 md:px-8 py-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-black text-center mb-12">Why Choose GreenSouq?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <div key={feature.title} className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#9AD92B] rounded-full mb-4">
                      <Icon className="text-black" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-black mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="px-4 md:px-8 py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-black mb-12">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <Link key={category.name} href={category.href}>
                  <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold text-black text-sm">{category.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
