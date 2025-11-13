// Simple in-memory data store to replace Prisma
type User = {
  id: string
  email: string
  name: string | null
  password: string
  createdAt: Date
  updatedAt: Date
}

type Favorite = {
  id: string
  songName: string
  userId: string
  createdAt: Date
}

// In-memory stores
const users: User[] = []
const favorites: Favorite[] = []

// Helper function to generate simple IDs
const generateId = () => Math.random().toString(36).substr(2, 9)

// Simple database interface to replace Prisma
export const db = {
  user: {
    findUnique: async ({ where }: { where: { email?: string; id?: string } }) => {
      return users.find(user => 
        (where.email && user.email === where.email) ||
        (where.id && user.id === where.id)
      ) || null
    },
    create: async ({ data }: { data: Omit<User, 'id' | 'createdAt' | 'updatedAt'> }) => {
      const user: User = {
        ...data,
        id: generateId(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
      users.push(user)
      return user
    }
  },
  favorite: {
    create: async ({ data }: { data: Omit<Favorite, 'id' | 'createdAt'> }) => {
      // Check for existing favorite
      const existing = favorites.find(f => f.userId === data.userId && f.songName === data.songName)
      if (existing) {
        throw new Error('P2002') // Simulate unique constraint error
      }
      
      const favorite: Favorite = {
        ...data,
        id: generateId(),
        createdAt: new Date()
      }
      favorites.push(favorite)
      return favorite
    },
    findFirst: async ({ where }: { where: { id?: string; userId?: string } }) => {
      return favorites.find(f => 
        (where.id && f.id === where.id) ||
        (where.userId && f.userId === where.userId)
      ) || null
    },
    delete: async ({ where }: { where: { id: string } }) => {
      const index = favorites.findIndex(f => f.id === where.id)
      if (index !== -1) {
        return favorites.splice(index, 1)[0]
      }
      return null
    }
  }
}

// Helper function to get user with favorites
export const getUserWithFavorites = async (userId: string) => {
  const user = await db.user.findUnique({ where: { id: userId } })
  if (!user) return null
  
  const userFavorites = favorites
    .filter(f => f.userId === userId)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  
  return {
    ...user,
    favorites: userFavorites
  }
}
