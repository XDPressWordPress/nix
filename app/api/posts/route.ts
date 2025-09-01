import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Listar todos os posts
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Erro ao buscar posts:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// POST - Criar novo post
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const post = await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        excerpt: data.excerpt || null,
        image: data.image || null,
        published: data.published ?? true
      }
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar post:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}