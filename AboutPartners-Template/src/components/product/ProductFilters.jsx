'use client';

import { useState } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import { categories, brands } from '@/data/mockData';
import Button from '@/components/ui/Button';

export default function ProductFilters({ filters, onChange }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggle = (key, value) => {
    const current = filters[key] ?? [];
    onChange({ ...filters, [key]: current.includes(value) ? current.filter(v => v !== value) : [...current, value] });
  };

  const clearAll = () => onChange({ categories: [], brands: [], onlyInStock: false, onlyOnSale: false, priceMin: '', priceMax: '' });

  const activeCount = (filters.categories?.length ?? 0) + (filters.brands?.length ?? 0)
    + (filters.onlyInStock ? 1 : 0) + (filters.onlyOnSale ? 1 : 0)
    + (filters.priceMin ? 1 : 0) + (filters.priceMax ? 1 : 0);

  const panel = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-slate-800 flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4" /> Filtros
          {activeCount > 0 && <span className="bg-[var(--color-accent)] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{activeCount}</span>}
        </h2>
        {activeCount > 0 && <button onClick={clearAll} className="text-xs text-slate-500 hover:text-red-500 transition flex items-center gap-1"><X className="w-3.5 h-3.5" /> Limpar</button>}
      </div>
      <FilterSection title="Preço (€)">
        <div className="flex gap-2">
          <input type="number" placeholder="Mín" min="0" value={filters.priceMin ?? ''} onChange={e => onChange({ ...filters, priceMin: e.target.value })} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
          <input type="number" placeholder="Máx" min="0" value={filters.priceMax ?? ''} onChange={e => onChange({ ...filters, priceMax: e.target.value })} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
      </FilterSection>
      <FilterSection title="Disponibilidade">
        <CheckRow label="Em stock" checked={filters.onlyInStock ?? false} onChange={v => onChange({ ...filters, onlyInStock: v })} />
        <CheckRow label="Em promoção" checked={filters.onlyOnSale ?? false} onChange={v => onChange({ ...filters, onlyOnSale: v })} />
      </FilterSection>
      <FilterSection title="Categorias">
        <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
          {categories.map(c => <CheckRow key={c.id} label={c.name} checked={(filters.categories ?? []).includes(c.id)} onChange={() => toggle('categories', c.id)} />)}
        </div>
      </FilterSection>
      <FilterSection title="Marcas">
        <div className="space-y-1.5">
          {brands.map(b => <CheckRow key={b.id} label={b.name} checked={(filters.brands ?? []).includes(b.id)} onChange={() => toggle('brands', b.id)} />)}
        </div>
      </FilterSection>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block w-64 flex-shrink-0">{panel}</aside>
      <div className="lg:hidden mb-4">
        <Button variant="secondary" onClick={() => setMobileOpen(true)} className="w-full">
          <SlidersHorizontal className="w-4 h-4" /> Filtros {activeCount > 0 && `(${activeCount})`}
        </Button>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
            <div className="relative ml-auto w-80 max-w-full bg-white h-full p-6 overflow-y-auto shadow-2xl">
              <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 text-slate-500 hover:text-slate-800"><X className="w-5 h-5" /></button>
              {panel}
              <div className="mt-6"><Button fullWidth onClick={() => setMobileOpen(false)}>Ver resultados</Button></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function FilterSection({ title, children }) {
  return <div><h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{title}</h3>{children}</div>;
}

function CheckRow({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)}
        className="w-4 h-4 rounded border-slate-300 accent-[var(--color-accent)]" />
      <span className="text-sm text-slate-700 group-hover:text-slate-900 transition">{label}</span>
    </label>
  );
}
