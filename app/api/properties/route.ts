import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Listar todas as propriedades
export async function GET() {
  try {
    const properties = await prisma.property.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(properties)
  } catch (error) {
    console.error('Erro ao buscar propriedades:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// POST - Criar nova propriedade
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const property = await prisma.property.create({
      data: {
        title: data.title,
        description: data.description,
        price: data.price,
        address: data.address,
        images: data.images || [],
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        area: data.area,
        type: data.type,
        status: data.status || 'available'
      }
    })

    return NextResponse.json(property, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar propriedade:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}