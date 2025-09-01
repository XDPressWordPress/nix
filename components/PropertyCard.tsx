import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Bed, Bath, Square } from 'lucide-react'
import { Property } from '@/types'

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price)
  }

  const primaryImage = property.images[0] || 'https://via.placeholder.com/400x300'

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      <Link href={`/imoveis/${property.id}`}>
        <div className="relative h-48 overflow-hidden">
          <Image
            src={primaryImage}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {property.type === 'apartment' ? 'Apartamento' : 
               property.type === 'house' ? 'Casa' : 'Comercial'}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
            {property.title}
          </h3>
          
          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.address}</span>
          </div>

          <p className="text-gray-700 mb-4 line-clamp-2">
            {property.description}
          </p>

          {/* Property Details */}
          <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
            {property.bedrooms && (
              <div className="flex items-center">
                <Bed className="h-4 w-4 mr-1" />
                <span>{property.bedrooms} quartos</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1" />
                <span>{property.bathrooms} banheiros</span>
              </div>
            )}
            {property.area && (
              <div className="flex items-center">
                <Square className="h-4 w-4 mr-1" />
                <span>{property.area}m²</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary-600">
              {formatPrice(property.price)}
            </span>
            <span className="text-primary-600 font-medium group-hover:underline">
              Ver Detalhes →
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}