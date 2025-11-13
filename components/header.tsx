"use client"

import Link from "next/link"
import { ShoppingCart, User, Search, Menu, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { label: "Indoor Plants", href: "#" },
    { label: "Outdoor Plants", href: "#" },
    { label: "Soil & Stones", href: "#" },
    { label: "Fertilizer & Pesticides", href: "#" },
    { label: "Pots & Planters", href: "#" },
    { label: "Seeds", href: "#" },
    { label: "Hydroponics", href: "#" },
    { label: "Garden Services", href: "#" },
    { label: "Plant Talk", href: "#" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-primary-lime">
      {/* Top Bar */}
      <div className="px-4 py-3 md:px-12">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="text-2xl font-bold text-black">GreenSouq</div>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden flex-1 md:flex md:mx-6 gap-2">
            {/* Category Dropdown */}
            <select className="px-3 py-2 border border-gray-400 bg-white text-black text-sm rounded focus:outline-none">
              <option>All categories</option>
              <option>Indoor Plants</option>
              <option>Outdoor Plants</option>
              <option>Soil & Stones</option>
            </select>

            {/* Search Input */}
            <div className="relative flex-[2]">
              <Input
              type="text"
              placeholder="What are you looking for?"
              className="w-full px-4 py-3 text-lg border border-gray-400 rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <Button className="absolute right-1 top-1/2 -translate-y-1/2 px-5 py-2 h-auto bg-black hover:bg-gray-900 text-white rounded">
              <Search size={24} />
              </Button>
            </div>
          </div>

          {/* Right icons - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm text-black font-semibold">
              <Phone size={18} />
              <span>+971 58 512 1105</span>
            </div>
            <Link href="/account" className="flex items-center gap-1 text-black hover:opacity-80 text-sm">
              <User size={20} />
              <div className="flex flex-col">
                <span className="text-xs">My Account</span>
                <span className="text-xs">Logout</span>
              </div>
            </Link>
            <Button variant="ghost" size="icon" className="text-black hover:bg-primary-lime-dark">
              <ShoppingCart size={20} />
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-black" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Navigation Bar
      <nav className="hidden md:flex bg-white border-t border-gray-200 px-12 overflow-x-auto">
        <div className="flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-black hover:text-primary-lime py-3 whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav> */}

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200 p-4 flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-black hover:text-primary-lime py-2"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
