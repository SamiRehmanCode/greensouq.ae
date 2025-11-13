"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Music, ShoppingBag } from "lucide-react"

export default function PostLoginModal() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Show modal only once after login (check sessionStorage to avoid repeated displays)
    if (status === "authenticated" && !sessionStorage.getItem("loginModalShown")) {
      setShowModal(true)
      sessionStorage.setItem("loginModalShown", "true")
    }
  }, [status])

  const handleNavigation = (path: string) => {
    setShowModal(false)
    router.push(path)
  }

  if (!showModal || status !== "authenticated") return null

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-[#9AD92B]">
            Welcome back, {session?.user?.name || "Friend"}! 🌱
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600 mt-2">
            Where would you like to go?
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Song Page Button */}
          <Button
            onClick={() => handleNavigation("/favorites")}
            className="w-full h-16 bg-[#9AD92B] text-black hover:bg-[#7fb51e] flex items-center justify-center gap-3 text-lg font-semibold"
          >
            <Music className="h-6 w-6" />
            Go to Favorite Songs
          </Button>

          {/* Product Page Button */}
          <Button
            onClick={() => handleNavigation("/product")}
            variant="outline"
            className="w-full h-16 border-[#9AD92B] text-[#9AD92B] hover:bg-[#9AD92B] hover:text-black flex items-center justify-center gap-3 text-lg font-semibold"
          >
            <ShoppingBag className="h-6 w-6" />
            Browse Products
          </Button>
        </div>

        <p className="text-sm text-gray-500 text-center">
          You can always access both pages from the navigation menu
        </p>
      </DialogContent>
    </Dialog>
  )
}
