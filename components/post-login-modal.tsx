"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Music, ShoppingBag } from "lucide-react"

export default function PostLoginModal({ forceOpen = false }: { forceOpen?: boolean }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [showModal, setShowModal] = useState<boolean>(forceOpen)
  const [isSelecting, setIsSelecting] = useState<boolean>(false)

  useEffect(() => {
    // If `forceOpen` is set (e.g. on home page), always open the modal on mount.
    if (forceOpen) {
      setShowModal(true)
      return
    }

    // Show modal only once after login (check sessionStorage to avoid repeated displays)
    if (status === "authenticated" && !sessionStorage.getItem("loginModalShown")) {
      setShowModal(true)
      sessionStorage.setItem("loginModalShown", "true")
    }
  }, [status, forceOpen])

  const handleNavigation = async (path: string) => {
    // Prevent multiple clicks
    if (isSelecting) return
    setIsSelecting(true)

    // Close modal then navigate. The Dialog is controlled so this will update UI
    setShowModal(false)

    // Use router.push and await it if possible
    try {
      await router.push(path)
    } catch (err) {
      // If navigation fails, re-enable selection so user can try again
      console.error(err)
      setIsSelecting(false)
    }
  }

  // If not showing, return null. If `forceOpen` is false, require authentication.
  if (!showModal) return null
  if (!forceOpen && status !== "authenticated") return null

  return (
    <Dialog
      open={showModal}
      // Ignore any attempts to close the dialog from overlay clicks or ESC.
      // We only change `showModal` programmatically (e.g. on navigation).
      onOpenChange={(open) => {
        if (open) setShowModal(true)
      }}
    >
      <DialogContent showCloseButton={false} className="sm:max-w-md">
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
            disabled={isSelecting}
            className="w-full h-16 bg-[#9AD92B] text-black hover:bg-[#7fb51e] flex items-center justify-center gap-3 text-lg font-semibold"
          >
            <Music className="h-6 w-6" />
            Go to Favorite Songs
          </Button>

          {/* Product Page Button */}
          <Button
            onClick={() => handleNavigation("/product")}
            variant="outline"
            disabled={isSelecting}
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
