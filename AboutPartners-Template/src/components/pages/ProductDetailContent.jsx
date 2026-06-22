'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, ChevronRight, Minus, Plus, Check, Car, Info, Wrench } from 'lucide-react';
import { getProductById, getRelatedProducts, getCategoryBySlug } from '@/data/mockData';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/product/ProductCard';
import StarRating from '@/components/ui/StarRating';
import Badge from '@/components/ui/Badge';

const categoryBg = {
  motor:'from-blue-100 to-blue-50',travoes:'from-red-100 to-red-50',suspensao:'from-green-100 to-green-50',
  filtros:'from-yellow-100 to-yellow-50',eletrico:'from-purple-100 to-purple-50',iluminacao:'from-amber-100 to-amber-50',
  pneus:'from-slate-100 to-slate-50',oleos:'from-orange-100 to-orange-50',escape:'from-gray-100 to-gray-50',
  carrocaria:'from-teal-100 to-teal-50',interior:'from-rose-100 to-rose-50',acessorios:'from-indigo-100 to-indigo-50',
};

const TABS = ['Descrição', 'Especificações', 'Compatibilidade'];

export default function ProductDetailContent({ id }) {
  const { addItem } = useCart();
  const [qty,   setQty]   = useState(1);
  const [tab,   setTab]   = useState('Descrição');
  const [added, setAdded] = useState(false);

  const product  = getProductById(id);
  if (!product) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <p className="text-5xl mb-4">🔧</p>
      <p className="text-slate-700 font-semibold text-lg mb-2">Produto não encontrado</p>
      <Link href="/catalogo" className="text-[var(--color-accent)] hover:underline text-sm">← Voltar ao catálogo</Link>
    </div>
  );

  const related   = getRelatedProducts(product);
  const category  = getCategoryBySlug(product.category);
  const discount  = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : null;

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-8 flex-wrap">
        <Link href="/" className="hover:text-[var(--color-accent)]">Início</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/catalogo" className="hover:text-[var(--color-accent)]">Catálogo</Link>
        {category && <><ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/catalogo?categoria=${category.slug}`} className="hover:text-[var(--color-accent)]">{category.name}</Link></>}
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-700 truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {/* Image */}
        <div>
          <div className={`aspect-square rounded-2xl bg-gradient-to-br ${categoryBg[product.category] ?? 'from-slate-100 to-slate-50'} flex items-center justify-center`}>
            <span className="text-5xl font-black text-slate-300 opacity-60 tracking-widest text-center px-4">{product.reference}</span>
          </div>
          <div className="flex gap-3 mt-3">
            {[1,2,3].map(n => (
              <div key={n} className={`w-20 h-20 rounded-xl bg-gradient-to-br ${categoryBg[product.category] ?? 'from-slate-100 to-slate-50'} border-2 ${n===1 ? 'border-[var(--color-accent)]' : 'border-transparent'} cursor-pointer`} />
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            {discount && <Badge variant="accent">-{discount}%</Badge>}
            {product.isNew && <Badge variant="green">Novo</Badge>}
            {product.inStock ? <Badge variant="green">Em stock ({product.stock} un.)</Badge> : <Badge variant="red">Esgotado</Badge>}
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-800 leading-tight mb-1">{product.name}</h1>
          <p className="text-slate-500 text-sm mb-1">Referência: <span className="font-mono text-slate-700">{product.reference}</span></p>
          <p className="text-slate-500 text-sm mb-4">Marca: <span className="font-semibold text-slate-700">{product.brand}</span></p>
          <StarRating rating={product.rating} count={product.reviewCount} className="mb-5" />
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-4xl font-black text-slate-900">{product.price.toFixed(2)} €</span>
            {product.originalPrice && <span className="text-lg text-slate-400 line-through">{product.originalPrice.toFixed(2)} €</span>}
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-11 h-11 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition"><Minus className="w-4 h-4" /></button>
              <span className="w-10 text-center font-semibold text-slate-800">{qty}</span>
              <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="w-11 h-11 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition"><Plus className="w-4 h-4" /></button>
            </div>
            <button onClick={handleAdd} disabled={!product.inStock}
              className={`flex-1 flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-xl transition ${added ? 'bg-green-500 text-white' : 'bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] disabled:bg-slate-200 disabled:text-slate-400 text-white'}`}>
              {added ? <><Check className="w-4 h-4" /> Adicionado!</> : <><ShoppingCart className="w-4 h-4" /> Adicionar ao carrinho</>}
            </button>
          </div>
          <div className="text-xs text-slate-500 bg-slate-50 rounded-xl p-4 flex items-start gap-2">
            <Info className="w-4 h-4 mt-0.5 flex-shrink-0 text-[var(--color-accent)]" />
            Encomendas até às 15h00 enviadas no próprio dia útil. Entrega em 24–48h úteis.
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-16">
        <div className="flex border-b border-slate-200 mb-6 gap-2">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-3 text-sm font-medium transition border-b-2 -mb-px ${tab === t ? 'border-[var(--color-accent)] text-[var(--color-accent)]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
              {t}
            </button>
          ))}
        </div>
        {tab === 'Descrição' && <p className="text-slate-600 text-sm leading-relaxed">{product.description}</p>}
        {tab === 'Especificações' && (
          <div className="max-w-xl">
            <table className="w-full text-sm">
              <tbody>
                {Object.entries(product.specifications).map(([k, v], i) => (
                  <tr key={k} className={i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                    <td className="px-4 py-2.5 font-medium text-slate-600 w-1/2">{k}</td>
                    <td className="px-4 py-2.5 text-slate-800">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {tab === 'Compatibilidade' && (
          <div>
            {product.compatibleVehicles.length === 0
              ? <p className="text-slate-500 text-sm flex items-center gap-2"><Car className="w-4 h-4" /> Compatível com a maioria dos veículos. Confirme com o vendedor.</p>
              : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {product.compatibleVehicles.map((v, i) => (
                    <div key={i} className="flex items-center gap-3 bg-slate-50 rounded-xl p-3 border border-slate-100">
                      <Car className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-slate-700">{v.make} {v.model}</p>
                        <p className="text-xs text-slate-500">{v.years}</p>
                      </div>
                    </div>
                  ))}
                </div>
            }
          </div>
        )}
      </div>

      {related.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-[var(--color-accent)]" /> Peças relacionadas
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}
