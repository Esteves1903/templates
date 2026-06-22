'use client';

import { brands } from '@/data/mockData';

export default function BrandsCarousel() {
  const doubled = [...brands, ...brands];
  return (
    <section className="py-12 px-4 border-t border-b border-slate-100 bg-slate-50/60 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-8">Marcas que distribuímos</p>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="flex gap-4" style={{ width: 'max-content', animation: 'scroll 20s linear infinite' }}>
            {doubled.map((brand, i) => (
              <div key={`${brand.id}-${i}`}
                className="flex-shrink-0 h-16 w-40 bg-white rounded-xl border border-slate-100 shadow-sm flex items-center justify-center gap-3 px-4 hover:border-[var(--color-accent)] hover:shadow-md transition">
                <div className={`w-8 h-8 rounded-lg ${brand.color} flex items-center justify-center text-white text-xs font-black flex-shrink-0`}>
                  {brand.initials}
                </div>
                <span className="text-xs font-semibold text-slate-700 leading-tight">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
    </section>
  );
}
