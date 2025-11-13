"use client"

import React from "react"
import { SessionProvider } from "next-auth/react"
import { GoogleOAuthProvider } from "@react-oauth/google"
import PostLoginModal from "./post-login-modal"

export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""

  return (
    <SessionProvider>
      <GoogleOAuthProvider clientId={googleClientId}>
        {children}
        <PostLoginModal />
      </GoogleOAuthProvider>
    </SessionProvider>
  )
}
