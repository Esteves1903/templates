import Link from 'next/link';
import * as Icons from 'lucide-react';
import { categories } from '@/data/mockData';

export default function CategoryGrid() {
  return (
    <section className="py-14 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Categorias" subtitle="Navega por família de peça ou usa a pesquisa para encontrar exatamente o que precisas." />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {categories.map(cat => {
            const Icon = Icons[cat.icon] ?? Icons.Package;
            return (
              <Link key={cat.id} href={`/catalogo?categoria=${cat.slug}`}
                className={`group flex flex-col items-center text-center p-4 rounded-xl border ${cat.color} hover:shadow-md transition-all duration-200 hover:-translate-y-0.5`}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 bg-white/60 group-hover:bg-white transition">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold leading-tight">{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
        {subtitle && <p className="text-slate-500 text-sm mt-1 max-w-xl">{subtitle}</p>}
      </div>
      {action && action}
    </div>
  );
}
