'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Building2, FileText, Users, TrendingUp, Plus, Settings, LogOut } from 'lucide-react'

interface DashboardStats {
  totalProperties: number
  totalPosts: number
  availableProperties: number
  soldProperties: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error)
    }
    setLoading(false)
  }

  const handleLogout = () => {
    router.push('/admin')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Building2 className="h-6 w-6 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">Nix Imóveis - Admin</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Painel Administrativo
          </h1>
          <p className="text-gray-600">
            Gerencie imóveis, posts e visualize estatísticas do sistema.
          </p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <Building2 className="h-8 w-8 text-primary-600" />
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{stats.totalProperties}</div>
                  <div className="text-gray-600">Total de Imóveis</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-secondary-600" />
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{stats.totalPosts}</div>
                  <div className="text-gray-600">Posts Publicados</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{stats.availableProperties}</div>
                  <div className="text-gray-600">Imóveis Disponíveis</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{stats.soldProperties}</div>
                  <div className="text-gray-600">Imóveis Vendidos</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Properties Management */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Building2 className="h-8 w-8 text-primary-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Gestão de Imóveis</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Adicione, edite e remova imóveis do seu portfólio.
            </p>
            <div className="space-y-4">
              <Link
                href="/admin/properties/new"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Adicionar Imóvel
              </Link>
              <Link
                href="/admin/properties"
                className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
              >
                <Settings className="h-5 w-5 mr-2" />
                Gerenciar Imóveis
              </Link>
            </div>
          </div>

          {/* Posts Management */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <FileText className="h-8 w-8 text-secondary-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Gestão de Posts</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Crie e gerencie o conteúdo do blog da imobiliária.
            </p>
            <div className="space-y-4">
              <Link
                href="/admin/posts/new"
                className="w-full bg-secondary-600 hover:bg-secondary-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Criar Post
              </Link>
              <Link
                href="/admin/posts"
                className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
              >
                <Settings className="h-5 w-5 mr-2" />
                Gerenciar Posts
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}