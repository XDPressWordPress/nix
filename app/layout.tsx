import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nix Imóveis - Encontre o imóvel dos seus sonhos',
  description: 'A melhor imobiliária da região. Apartamentos, casas e imóveis comerciais com o melhor atendimento.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  )
}