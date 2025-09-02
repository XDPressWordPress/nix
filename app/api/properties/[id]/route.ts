import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Buscar propriedade por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const property = await prisma.property.findUnique({
      where: { id }
    })
    if (!property) {
      return NextResponse.json(
        { error: 'Propriedade não encontrada' },
        { status: 404 }
      )
    }
    return NextResponse.json(property)
  } catch (error) {
    console.error('Erro ao buscar propriedade:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// PUT - Atualizar propriedade
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const data = await request.json()
    const { id } = await params
    const property = await prisma.property.update({
      where: { id },
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
        status: data.status
      }
    })
    return NextResponse.json(property)
  } catch (error) {
    console.error('Erro ao atualizar propriedade:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// DELETE - Excluir propriedade
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.property.delete({
      where: { id }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao excluir propriedade:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}