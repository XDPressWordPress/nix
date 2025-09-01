import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Verificar credenciais no banco de dados
    const admin = await prisma.admin.findUnique({
      where: { username }
    })

    if (!admin || admin.password !== password) {
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      )
    }

    // Em uma aplicação real, você criaria um JWT token aqui
    // Por simplicidade, apenas retornamos sucesso
    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Erro no login:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}