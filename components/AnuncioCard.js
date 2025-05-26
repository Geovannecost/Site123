"use client"

import Image from "next/image"

export default function AnuncioCard({ anuncio, showActions = false, onDestaque }) {
  const { id, titulo, preco, imagem, destaque, usuario } = anuncio

  return (
    <div className="card overflow-hidden">
      {destaque && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 absolute top-2 left-2 rounded-full z-10">
          ⭐ DESTAQUE
        </div>
      )}

      <div className="relative h-48 w-full">
        <Image src={imagem || "/placeholder.svg?height=200&width=300"} alt={titulo} fill className="object-cover" />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{titulo}</h3>

        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-primary-600">R$ {preco?.toFixed(2)}</span>
          {usuario && <span className="text-sm text-gray-500">por {usuario}</span>}
        </div>

        <div className="flex gap-2">
          <button className="btn-primary flex-1">Ver mais</button>

          {showActions && (
            <button
              onClick={() => onDestaque(id)}
              className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                destaque
                  ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {destaque ? "⭐" : "☆"}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
