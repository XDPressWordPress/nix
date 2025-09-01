export interface Property {
  id: string
  title: string
  description: string
  price: number
  address: string
  images: string[]
  bedrooms?: number | null
  bathrooms?: number | null
  area?: number | null
  type: string
  status: string
  createdAt: Date
  updatedAt: Date
}

export interface Post {
  id: string
  title: string
  content: string
  excerpt?: string | null
  image?: string | null
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Admin {
  id: string
  username: string
  password: string
}