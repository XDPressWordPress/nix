import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PropertyCard from '@/components/PropertyCard'
import { Search, Filter, Building2 } from 'lucide-react'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// Função para buscar todos os imóveis
async function getProperties() {
  // Durante o build, retorna array vazio
  if (process.env.BUILD_MODE === 'true') {
    return []
  }
  
  try {
    return await prisma.property.findMany({
      orderBy: { createdAt: 'desc' }
    })
  } catch (error) {
    console.error('Erro ao buscar imóveis:', error)
    return []
  }
}

export default async function ImoveisPage() {
  const properties = await getProperties()

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nossos Imóveis
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore nossa seleção completa de imóveis disponíveis para compra e locação
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar por localização, tipo de imóvel..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              <Filter className="h-5 w-5" />
              <span>Filtros</span>
            </button>
          </div>
        </div>

        {/* Properties Grid */}
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhum imóvel encontrado
            </h3>
            <p className="text-gray-600">
              Não há imóveis cadastrados no momento.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}