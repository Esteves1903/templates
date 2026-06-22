'use client';

import Link from 'next/link';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Badge from '@/components/ui/Badge';
import StarRating from '@/components/ui/StarRating';

const categoryBg = {
  motor:'from-blue-100 to-blue-50',travoes:'from-red-100 to-red-50',suspensao:'from-green-100 to-green-50',
  filtros:'from-yellow-100 to-yellow-50',eletrico:'from-purple-100 to-purple-50',iluminacao:'from-amber-100 to-amber-50',
  pneus:'from-slate-100 to-slate-50',oleos:'from-orange-100 to-orange-50',escape:'from-gray-100 to-gray-50',
  carrocaria:'from-teal-100 to-teal-50',interior:'from-rose-100 to-rose-50',acessorios:'from-indigo-100 to-indigo-50',
};

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : null;

  return (
    <div className="group bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col">
      <Link href={`/produto/${product.id}`} className="relative overflow-hidden">
        <div className={`h-48 bg-gradient-to-br ${categoryBg[product.category] ?? 'from-slate-100 to-slate-50'} flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}>
          <span className="text-4xl opacity-30 select-none font-black tracking-widest text-slate-600">
            {product.reference.split('-').slice(0,2).join('-')}
          </span>
        </div>
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {discount && <Badge variant="accent">-{discount}%</Badge>}
          {product.isNew && <Badge variant="green">Novo</Badge>}
          {!product.inStock && <Badge variant="red">Esgotado</Badge>}
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
          <span className="bg-white text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full shadow flex items-center gap-1.5 translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
            <Eye className="w-3.5 h-3.5" /> Ver detalhes
          </span>
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-slate-400 font-mono mb-1">{product.reference}</p>
        <Link href={`/produto/${product.id}`} className="font-semibold text-slate-800 text-sm leading-snug hover:text-[var(--color-accent)] transition line-clamp-2 mb-1">{product.name}</Link>
        <p className="text-xs text-slate-500 mb-2">{product.brand}</p>
        <StarRating rating={product.rating} count={product.reviewCount} className="mb-3" />
        <div className="flex items-end justify-between mt-auto">
          <div>
            <p className="text-lg font-bold text-slate-900">{product.price.toFixed(2)} €</p>
            {product.originalPrice && <p className="text-xs text-slate-400 line-through">{product.originalPrice.toFixed(2)} €</p>}
          </div>
          <div className="text-right">
            {product.inStock ? <p className="text-xs text-green-600 font-medium mb-1.5">Em stock</p> : <p className="text-xs text-red-500 font-medium mb-1.5">Esgotado</p>}
            <button onClick={() => addItem(product)} disabled={!product.inStock}
              className="flex items-center gap-1.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-semibold px-3 py-2 rounded-lg transition">
              <ShoppingCart className="w-3.5 h-3.5" /> Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
