import Link from 'next/link'
import Image from 'next/image'
import { Calendar } from 'lucide-react'
import { Post } from '@/types'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(new Date(date))
  }

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      <Link href={`/posts/${post.id}`}>
        {post.image && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-center text-gray-500 mb-3">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="text-sm">{formatDate(post.createdAt)}</span>
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
            {post.title}
          </h2>

          {post.excerpt && (
            <p className="text-gray-700 mb-4">
              {post.excerpt}
            </p>
          )}

          <span className="text-primary-600 font-medium group-hover:underline">
            Ler mais →
          </span>
        </div>
      </Link>
    </article>
  )
}