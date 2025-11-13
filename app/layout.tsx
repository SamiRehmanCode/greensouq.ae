import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Providers from "../components/providers"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Full-Stack Developer | Abdul Rehman Asghar",
  description:
    "Professional portfolio of a MERN developer with expertise in WordPress plugins, PHP, Laravel, and RAG-based chatbot development.",
  generator: "",
  icons: {

    icon: [
      {
        url: "/blank-favicon.svg",
        type: "image/svg+xml",
      },
    ],
    // keep apple icon if you still want it available
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
