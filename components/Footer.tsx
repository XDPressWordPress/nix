import Link from 'next/link'
import { Building2, Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Building2 className="h-6 w-6 text-primary-400" />
              <span className="text-xl font-bold">Nix Imóveis</span>
            </div>
            <p className="text-gray-300 mb-4">
              Há mais de 15 anos realizando sonhos e conectando pessoas aos seus imóveis ideais.
            </p>
            <p className="text-sm text-gray-400">
              CRECI: 12345-SP
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary-400" />
                <span className="text-gray-300">(11) 9 8765-4321</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary-400" />
                <span className="text-gray-300">contato@niximoveis.com.br</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-primary-400 mt-1" />
                <span className="text-gray-300">
                  Rua dos Negócios, 123<br />
                  Centro - São Paulo/SP
                </span>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Horário de Atendimento</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-primary-400" />
                <span className="text-gray-300">Segunda a Sexta</span>
              </div>
              <p className="text-gray-300 ml-6">08:00 às 18:00</p>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-primary-400" />
                <span className="text-gray-300">Sábados</span>
              </div>
              <p className="text-gray-300 ml-6">09:00 às 15:00</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <div className="space-y-2">
              <Link href="/imoveis" className="block text-gray-300 hover:text-primary-400 transition-colors">
                Imóveis Disponíveis
              </Link>
              <Link href="/posts" className="block text-gray-300 hover:text-primary-400 transition-colors">
                Blog e Notícias
              </Link>
              <Link href="/contato" className="block text-gray-300 hover:text-primary-400 transition-colors">
                Entre em Contato
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Nix Imóveis. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}