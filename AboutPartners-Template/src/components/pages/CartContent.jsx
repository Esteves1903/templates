'use client';

import Link from 'next/link';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, Tag, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const categoryBg = {
  motor:'from-blue-100 to-blue-50',travoes:'from-red-100 to-red-50',suspensao:'from-green-100 to-green-50',
  filtros:'from-yellow-100 to-yellow-50',eletrico:'from-purple-100 to-purple-50',iluminacao:'from-amber-100 to-amber-50',
  pneus:'from-slate-100 to-slate-50',oleos:'from-orange-100 to-orange-50',escape:'from-gray-100 to-gray-50',
  carrocaria:'from-teal-100 to-teal-50',interior:'from-rose-100 to-rose-50',acessorios:'from-indigo-100 to-indigo-50',
};

export default function CartContent() {
  const { items, removeItem, updateQty, totalItems, totalPrice, clearCart } = useCart();

  if (items.length === 0) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-5">
        <ShoppingCart className="w-9 h-9 text-slate-400" />
      </div>
      <h2 className="text-xl font-bold text-slate-700 mb-2">O carrinho está vazio</h2>
      <p className="text-slate-500 text-sm mb-6">Ainda não adicionaste nenhum produto ao carrinho.</p>
      <Link href="/catalogo" className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white font-semibold px-6 py-3 rounded-xl transition inline-flex items-center gap-2">
        Ir para o catálogo <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );

  const shipping = totalPrice >= 75 ? 0 : 5.90;
  const total    = totalPrice + shipping;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-2">
        <ShoppingCart className="w-6 h-6 text-[var(--color-accent)]" />
        Carrinho
        <span className="text-base font-normal text-slate-500 ml-1">({totalItems} {totalItems === 1 ? 'artigo' : 'artigos'})</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex gap-4">
              <Link href={`/produto/${item.id}`} className="flex-shrink-0">
                <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${categoryBg[item.category] ?? 'from-slate-100 to-slate-50'} flex items-center justify-center`}>
                  <span className="text-[9px] font-black text-slate-400 text-center leading-tight px-1">{item.reference}</span>
                </div>
              </Link>
              <div className="flex-1 min-w-0">
                <Link href={`/produto/${item.id}`} className="font-semibold text-slate-800 text-sm hover:text-[var(--color-accent)] transition line-clamp-2">{item.name}</Link>
                <p className="text-xs text-slate-500 mt-0.5">{item.brand} · <span className="font-mono">{item.reference}</span></p>
                <p className="text-sm font-bold text-slate-900 mt-2">{item.price.toFixed(2)} € <span className="font-normal text-slate-500 text-xs">/ un.</span></p>
              </div>
              <div className="flex flex-col items-end justify-between flex-shrink-0">
                <button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-red-500 transition p-1"><Trash2 className="w-4 h-4" /></button>
                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                  <button onClick={() => updateQty(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition"><Minus className="w-3.5 h-3.5" /></button>
                  <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                  <button onClick={() => updateQty(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition"><Plus className="w-3.5 h-3.5" /></button>
                </div>
                <p className="text-sm font-bold text-slate-900">{(item.price * item.quantity).toFixed(2)} €</p>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between pt-2">
            <Link href="/catalogo" className="text-sm text-slate-500 hover:text-[var(--color-accent)] transition">← Continuar a comprar</Link>
            <button onClick={clearCart} className="text-sm text-red-400 hover:text-red-600 transition flex items-center gap-1"><Trash2 className="w-4 h-4" /> Limpar carrinho</button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 sticky top-28">
            <h2 className="font-bold text-slate-800 mb-5">Resumo da encomenda</h2>
            <div className="flex gap-2 mb-5">
              <input type="text" placeholder="Código de desconto" className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
              <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium px-3 rounded-lg transition flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" /> Aplicar
              </button>
            </div>
            <div className="space-y-3 text-sm border-t border-slate-100 pt-4">
              <div className="flex justify-between text-slate-600"><span>Subtotal</span><span className="font-medium">{totalPrice.toFixed(2)} €</span></div>
              <div className="flex justify-between text-slate-600">
                <span>Envio</span>
                <span className={shipping === 0 ? 'text-green-600 font-medium' : 'font-medium'}>{shipping === 0 ? 'Gratuito' : `${shipping.toFixed(2)} €`}</span>
              </div>
              {shipping > 0 && <p className="text-xs text-slate-400 bg-slate-50 rounded-lg p-2.5">Adiciona {(75 - totalPrice).toFixed(2)} € para teres envio gratuito.</p>}
              <div className="flex justify-between font-bold text-slate-900 text-base pt-2 border-t border-slate-200"><span>Total</span><span>{total.toFixed(2)} €</span></div>
              <p className="text-xs text-slate-400">IVA incluído</p>
            </div>
            <button className="w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2 mt-5 text-base">
              Finalizar encomenda <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex items-center justify-center gap-4 mt-4 text-xs text-slate-400">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-green-500" /> Pagamento seguro</span>
              <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5 text-[var(--color-accent)]" /> Envio rápido</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
