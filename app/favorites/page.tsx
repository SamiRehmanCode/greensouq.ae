"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Music, Trash2, Plus, Loader2, ArrowRight } from "lucide-react"

interface Favorite {
  id: string
  songName: string
  createdAt: string
}

export default function FavoritesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [newSong, setNewSong] = useState("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    } else if (status === "authenticated") {
      fetchFavorites()
    }
  }, [status, router])

  const fetchFavorites = async () => {
    try {
      setIsLoading(true)
      const res = await fetch("/api/favorites")
      const data = await res.json()

      if (res.ok) {
        setFavorites(data.favorites)
      } else {
        setError(data.error || "Failed to load favorites")
      }
    } catch (err) {
      setError("An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const addFavorite = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newSong.trim()) return

    try {
      setIsAdding(true)
      setError(null)

      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ songName: newSong.trim() }),
      })

      const data = await res.json()

      if (res.ok) {
        setFavorites([data.favorite, ...favorites])
        setNewSong("")
      } else {
        setError(data.error || "Failed to add favorite")
      }
    } catch (err) {
      setError("An error occurred")
    } finally {
      setIsAdding(false)
    }
  }

  const deleteFavorite = async (id: string) => {
    try {
      const res = await fetch(`/api/favorites?id=${id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        setFavorites(favorites.filter((f) => f.id !== id))
      } else {
        const data = await res.json()
        setError(data.error || "Failed to delete favorite")
      }
    } catch (err) {
      setError("An error occurred")
    }
  }

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f5f5f5] to-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#9AD92B]" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f5f5] to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-8">
            <div className="text-4xl font-bold text-[#9AD92B]">GreenSouq</div>
          </Link>
          <h1 className="text-3xl font-bold text-black mb-2">My Favorite Songs</h1>
          <p className="text-gray-600">Save and manage your favorite plant-themed songs</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm" role="alert">
            {error}
          </div>
        )}

        {/* Add Song Form */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-6">
          <form onSubmit={addFavorite} className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter song name..."
                value={newSong}
                onChange={(e) => setNewSong(e.target.value)}
                className="h-12"
                disabled={isAdding}
              />
            </div>
            <Button
              type="submit"
              disabled={isAdding || !newSong.trim()}
              className="bg-[#9AD92B] text-black hover:bg-[#7fb51e] h-12 px-6"
            >
              {isAdding ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Plus className="h-5 w-5 mr-2" />
                  Add
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Favorites List */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          {favorites.length === 0 ? (
            <div className="p-12 text-center">
              <Music className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 mb-2">No favorites yet</p>
              <p className="text-sm text-gray-400">Add your first favorite song above</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {favorites.map((favorite) => (
                <li key={favorite.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Music className="h-5 w-5 text-[#9AD92B]" />
                    <span className="font-medium text-gray-900">{favorite.songName}</span>
                  </div>
                  <button
                    onClick={() => deleteFavorite(favorite.id)}
                    className="text-red-500 hover:text-red-700 transition-colors p-2"
                    aria-label="Delete favorite"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Navigation Links */}
        <div className="mt-8 flex gap-4 justify-center">
          <Link href="/" className="inline-flex items-center gap-2 text-[#9AD92B] hover:text-[#7fb51e] font-semibold">
            <ArrowRight size={18} className="rotate-180" />
            Back to Home
          </Link>
          <Link href="/product" className="inline-flex items-center gap-2 text-[#9AD92B] hover:text-[#7fb51e] font-semibold">
            Products
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  )
}
