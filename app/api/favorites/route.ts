import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { db, getUserWithFavorites } from "@/lib/prisma"

// GET - Fetch user's favorites
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const userWithFavorites = await getUserWithFavorites(user.id)

    return NextResponse.json({ favorites: userWithFavorites?.favorites || [] })
  } catch (error) {
    console.error("Get favorites error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST - Add a favorite
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { songName } = await req.json()

    if (!songName || typeof songName !== "string") {
      return NextResponse.json({ error: "Song name required" }, { status: 400 })
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const favorite = await db.favorite.create({
      data: {
        songName: songName.trim(),
        userId: user.id,
      },
    })

    return NextResponse.json({ favorite }, { status: 201 })
  } catch (error: any) {
    // Handle unique constraint violation
    if (error.message === "P2002") {
      return NextResponse.json({ error: "Song already in favorites" }, { status: 400 })
    }
    console.error("Add favorite error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// DELETE - Remove a favorite
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Favorite ID required" }, { status: 400 })
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Ensure the favorite belongs to the user
    const favorite = await db.favorite.findFirst({
      where: {
        id,
        userId: user.id,
      },
    })

    if (!favorite) {
      return NextResponse.json({ error: "Favorite not found" }, { status: 404 })
    }

    await db.favorite.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete favorite error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
