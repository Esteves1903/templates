'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getFeaturedProducts, getOnSaleProducts } from '@/data/mockData';
import ProductCard from '@/components/product/ProductCard';
import { SectionHeader } from './CategoryGrid';

export default function FeaturedProducts() {
  const featured = getFeaturedProducts().slice(0, 8);
  const onSale   = getOnSaleProducts().slice(0, 4);

  return (
    <>
      <section className="py-14 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="Produtos em destaque" subtitle="Seleção dos produtos mais procurados e melhor avaliados."
            action={<Link href="/catalogo" className="text-sm text-[var(--color-accent)] hover:underline font-medium flex items-center gap-1">Ver todos <ArrowRight className="w-4 h-4" /></Link>} />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      <section className="py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
            <div className="absolute right-0 top-0 w-64 h-64 bg-[var(--color-accent)] opacity-10 rounded-full blur-3xl" />
            <div className="relative">
              <p className="text-[var(--color-accent)] text-sm font-semibold mb-1">Promoções da semana</p>
              <h3 className="text-white text-2xl font-black mb-1">Até 30% de desconto</h3>
              <p className="text-slate-400 text-sm">Em pastilhas, filtros, óleos e muito mais. Oferta limitada.</p>
            </div>
            <Link href="/catalogo?sale=true"
              className="flex-shrink-0 bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white font-semibold px-6 py-3 rounded-xl transition flex items-center gap-2">
              Ver promoções <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="pb-14 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="Em promoção"
            action={<Link href="/catalogo?sale=true" className="text-sm text-[var(--color-accent)] hover:underline font-medium flex items-center gap-1">Ver todas <ArrowRight className="w-4 h-4" /></Link>} />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {onSale.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>
    </>
  );
}
