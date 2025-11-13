import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { db } from "@/lib/prisma"

const authOptions = {
  providers: [
    // Email/Password login
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required")
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || !user.password) {
          throw new Error("Invalid credentials")
        }

        const isValid = await compare(credentials.password, user.password)

        if (!isValid) {
          throw new Error("Invalid credentials")
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      },
    }),
    // Google OAuth login via ID token (from @react-oauth/google)
    CredentialsProvider({
      id: "google-oauth",
      name: "Google",
      credentials: {
        credential: { label: "Credential", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.credential) {
          throw new Error("No credential provided")
        }

        try {
          // Verify Google ID token
          const res = await fetch(
            `https://oauth2.googleapis.com/tokeninfo?id_token=${credentials.credential}`
          )
          
          if (!res.ok) {
            throw new Error("Invalid Google token")
          }

          const profile = await res.json()

          // Verify audience
          if (profile.aud !== process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
            throw new Error("Invalid token audience")
          }

          // Find or create user
          let user = await db.user.findUnique({
            where: { email: profile.email },
          })

          if (!user) {
            // Create new user for Google sign-in (no password needed)
            user = await db.user.create({
              data: {
                email: profile.email,
                name: profile.name,
                password: "", // Empty password for OAuth users
              },
            })
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
          }
        } catch (error) {
          console.error("Google auth error:", error)
          throw new Error("Google authentication failed")
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id
        session.user.email = token.email
        session.user.name = token.name
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export const handlers = {
  GET: handler,
  POST: handler,
}

export { authOptions }
