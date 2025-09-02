import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Bed, Bath, Square, ArrowLeft, Phone, Mail } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'


// Função para buscar imóvel por ID
async function getProperty(id: string) {
  try {
    return await prisma.property.findUnique({
      where: { id }
    })
  } catch (error) {
    console.error('Erro ao buscar imóvel:', error)
    return null
  }
}

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const property = await getProperty(id)

  if (!property) {
    notFound()
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price)
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          href="/imoveis"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium mb-6 group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Voltar aos Imóveis
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src={Array.isArray(property.images) && property.images.length > 0 ? (property.images[0] as string) : 'https://via.placeholder.com/600x400'}
                alt={property.title}
                fill
                className="object-cover"
              />
            </div>
            
            {Array.isArray(property.images) && property.images.length > 1 && (
              <div className="grid grid-cols-3 gap-4">
                {property.images.slice(1, 4).map((image, index) => (
                  <div key={index} className="relative h-24 rounded-lg overflow-hidden">
                    <Image
                      src={image as string}
                      alt={`${property.title} - Imagem ${index + 2}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Property Details */}
          <div>
            <div className="mb-4">
              <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                {property.type === 'apartment' ? 'Apartamento' : 
                 property.type === 'house' ? 'Casa' : 'Comercial'}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {property.title}
            </h1>

            <div className="flex items-center text-gray-600 mb-6">
              <MapPin className="h-5 w-5 mr-2" />
              <span className="text-lg">{property.address}</span>
            </div>

            <div className="text-4xl font-bold text-primary-600 mb-6">
              {formatPrice(property.price)}
            </div>

            {/* Property Features */}
            <div className="flex flex-wrap gap-6 mb-8">
              {property.bedrooms && (
                <div className="flex items-center">
                  <Bed className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="font-medium">{property.bedrooms} quartos</span>
                </div>
              )}
              {property.bathrooms && (
                <div className="flex items-center">
                  <Bath className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="font-medium">{property.bathrooms} banheiros</span>
                </div>
              )}
              {property.area && (
                <div className="flex items-center">
                  <Square className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="font-medium">{property.area}m²</span>
                </div>
              )}
            </div>

            <div className="prose max-w-none mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Descrição</h3>
              <p className="text-gray-700 leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Contact Buttons */}
            <div className="space-y-4">
              <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-4 rounded-lg font-semibold transition-colors flex items-center justify-center">
                <Phone className="h-5 w-5 mr-2" />
                Ligar Agora: (11) 9 8765-4321
              </button>
              <button className="w-full bg-secondary-600 hover:bg-secondary-700 text-white py-4 rounded-lg font-semibold transition-colors flex items-center justify-center">
                <Mail className="h-5 w-5 mr-2" />
                Enviar Email
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}