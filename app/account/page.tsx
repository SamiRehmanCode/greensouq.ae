"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { User, Mail, Heart, Package, LogOut, Settings } from "lucide-react"
import { useEffect, useState } from "react"

export default function AccountPage() {
  const { data: session, status } = useSession()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  if (status === "unauthenticated") {
    redirect("/login")
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (status === "authenticated" && session?.user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />

        <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          {/* Account Header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Profile Section */}
            <div className="md:col-span-1 bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-[#9AD92B] rounded-full flex items-center justify-center mb-4">
                  {session.user.image ? (
                    <img
                      src={session.user.image || "/placeholder.svg"}
                      alt={session.user.name || "User"}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User size={40} className="text-black" />
                  )}
                </div>
                <h2 className="text-2xl font-bold text-black mb-1">{session.user.name}</h2>
                <p className="text-gray-600 text-sm flex items-center justify-center gap-1 mb-6">
                  <Mail size={16} />
                  {session.user.email}
                </p>
                <Button className="w-full bg-[#9AD92B] text-black hover:bg-[#7fb51e] mb-2" onClick={() => {}}>
                  <Settings size={18} className="mr-2" />
                  Edit Profile
                </Button>
                <form className="w-full">
                  <button
                    formAction={async () => {
                      await signOut({ callbackUrl: "/login" })
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <LogOut size={18} />
                    Sign Out
                  </button>
                </form>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Wishlist */}
                <Link href="/account/wishlist">
                  <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <div className="flex items-start justify-between mb-4">
                      <Heart className="text-[#9AD92B]" size={32} />
                      <span className="text-3xl font-bold text-black">0</span>
                    </div>
                    <h3 className="text-lg font-bold text-black">Wishlist</h3>
                    <p className="text-sm text-gray-600">Your saved plants</p>
                  </div>
                </Link>

                {/* Orders */}
                <Link href="/account/orders">
                  <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <div className="flex items-start justify-between mb-4">
                      <Package className="text-[#9AD92B]" size={32} />
                      <span className="text-3xl font-bold text-black">0</span>
                    </div>
                    <h3 className="text-lg font-bold text-black">Orders</h3>
                    <p className="text-sm text-gray-600">Track your purchases</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Account Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Address Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-black mb-4">Addresses</h3>
              <p className="text-gray-600 text-sm mb-4">No addresses saved yet.</p>
              <Button className="w-full bg-[#9AD92B] text-black hover:bg-[#7fb51e]">Add New Address</Button>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-black mb-4">Payment Methods</h3>
              <p className="text-gray-600 text-sm mb-4">No payment methods saved.</p>
              <Button className="w-full bg-[#9AD92B] text-black hover:bg-[#7fb51e]">Add Payment Method</Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    )
  }
}
