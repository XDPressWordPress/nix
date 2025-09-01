import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

interface PostPageProps {
  params: {
    id: string
  }
}

// Função para buscar post por ID
async function getPost(id: string) {
  return await prisma.post.findUnique({
    where: { id, published: true }
  })
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPost(params.id)

  if (!post) {
    notFound()
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(new Date(date))
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          href="/posts"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium mb-6 group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Voltar aos Posts
        </Link>

        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {post.image && (
            <div className="relative h-64 md:h-96">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          <div className="p-8">
            <div className="flex items-center space-x-4 text-gray-500 mb-6">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{formatDate(post.createdAt)}</span>
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>Equipe Nix Imóveis</span>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            <div className="prose max-w-none">
              <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                {post.content}
              </div>
            </div>
          </div>
        </article>

        {/* Call to Action */}
        <div className="mt-12 text-center bg-primary-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Interessado em nossos serviços?
          </h3>
          <p className="text-gray-700 mb-6">
            Entre em contato conosco e descubra como podemos ajudá-lo a encontrar o imóvel ideal.
          </p>
          <Link 
            href="/contato"
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Fale Conosco
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}