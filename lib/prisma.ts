import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  // Durante o build ou desenvolvimento, use um cliente mock se não conseguir conectar
  try {
    prisma = new PrismaClient()
  } catch (error) {
    console.warn('Prisma client não pôde ser inicializado, usando mock client')
    // Mock client para build
    prisma = {
      property: {
        findMany: async () => [],
        findUnique: async () => null,
        create: async () => ({} as any),
        update: async () => ({} as any),
        delete: async () => ({} as any),
      },
      post: {
        findMany: async () => [],
        findUnique: async () => null,
        create: async () => ({} as any),
        update: async () => ({} as any),
        delete: async () => ({} as any),
      },
      $connect: async () => {},
      $disconnect: async () => {},
    } as any
  }
}

export { prisma }