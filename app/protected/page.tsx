"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ProtectedPage() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "unauthenticated") {
    redirect("/login?callbackUrl=/protected")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <h1 className="text-3xl font-bold text-black">Protected Page</h1>
        <p className="mt-4 text-gray-600">
          Welcome {session?.user?.name}! This page is only visible to authenticated users.
        </p>
      </main>
      <Footer />
    </div>
  )
}
