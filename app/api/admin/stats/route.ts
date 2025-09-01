import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const [totalProperties, totalPosts, availableProperties, soldProperties] = await Promise.all([
      prisma.property.count(),
      prisma.post.count({ where: { published: true } }),
      prisma.property.count({ where: { status: 'available' } }),
      prisma.property.count({ where: { status: { in: ['sold', 'rented'] } } })
    ])

    return NextResponse.json({
      totalProperties,
      totalPosts,
      availableProperties,
      soldProperties
    })

  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}