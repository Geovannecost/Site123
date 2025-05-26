import Link from "next/link"
import { Leaf, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-green-50 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg">
                <Leaf className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-xl font-bold text-green-800">Planta Fácil</span>
            </div>
            <p className="text-gray-600 text-sm">
              Conectando pessoas apaixonadas por plantas e jardinagem em todo o Brasil.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-green-600">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/anuncios" className="text-gray-600 hover:text-green-600">
                  Anúncios
                </Link>
              </li>
              <li>
                <Link href="/como-funciona" className="text-gray-600 hover:text-green-600">
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link href="/planos" className="text-gray-600 hover:text-green-600">
                  Planos
                </Link>
              </li>
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Suporte</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/ajuda" className="text-gray-600 hover:text-green-600">
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link href="/termos" className="text-gray-600 hover:text-green-600">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="text-gray-600 hover:text-green-600">
                  Privacidade
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-600 hover:text-green-600">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-green-600" />
                <span className="text-gray-600">contato@plantafacil.com.br</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-green-600" />
                <span className="text-gray-600">(11) 9999-9999</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-green-600" />
                <span className="text-gray-600">São Paulo, SP</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-200 mt-8 pt-8 text-center">
          <p className="text-gray-600 text-sm">© 2024 Planta Fácil. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
