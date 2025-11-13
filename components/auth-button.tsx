"use client"

import { signIn, signOut } from "next-auth/react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { User, LogOut } from "lucide-react"
import Link from "next/link"

export function AuthButton() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <Button disabled>Loading...</Button>
  }

  if (status === "authenticated" && session?.user) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/account" className="flex items-center gap-2 text-black hover:text-[#9AD92B]">
          <User size={20} />
          <span className="text-sm">{session.user.name?.split(" ")[0]}</span>
        </Link>
        <form
          action={async () => {
            await signOut()
          }}
        >
          <button type="submit" className="p-2 hover:bg-gray-100 rounded-md transition-colors" title="Sign out">
            <LogOut size={20} />
          </button>
        </form>
      </div>
    )
  }

  return (
    <Button onClick={() => signIn("google")} className="bg-[#9AD92B] text-black hover:bg-[#7fb51e]">
      Sign in
    </Button>
  )
}
