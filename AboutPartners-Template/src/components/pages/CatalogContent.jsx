'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Grid3X3, List, ChevronRight, ArrowUpDown } from 'lucide-react';
import { products, getCategoryBySlug } from '@/data/mockData';
import ProductCard from '@/components/product/ProductCard';
import ProductFilters from '@/components/product/ProductFilters';

const SORT_OPTIONS = [
  { value: 'relevancia', label: 'Relevância' },
  { value: 'preco-asc',  label: 'Preço: mais baixo' },
  { value: 'preco-desc', label: 'Preço: mais alto' },
  { value: 'novidade',   label: 'Novidades' },
  { value: 'avaliacao',  label: 'Melhor avaliação' },
];

const PAGE_SIZE = 12;

export default function CatalogContent() {
  const searchParams = useSearchParams();
  const [sort,    setSort]    = useState('relevancia');
  const [page,    setPage]    = useState(1);
  const [view,    setView]    = useState('grid');
  const [filters, setFilters] = useState({
    categories: searchParams.get('categoria') ? [searchParams.get('categoria')] : [],
    brands: [],
    onlyInStock: false,
    onlyOnSale: false,
    priceMin: '',
    priceMax: '',
  });

  const q    = searchParams.get('q')?.toLowerCase() ?? '';
  const sale = searchParams.get('sale') === 'true';
  const catFromUrl = searchParams.get('categoria');
  const activeCat  = getCategoryBySlug(catFromUrl ?? filters.categories[0]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (q)    list = list.filter(p => p.name.toLowerCase().includes(q) || p.reference.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    if (sale) list = list.filter(p => p.isOnSale);
    if (filters.categories.length) list = list.filter(p => filters.categories.includes(p.category));
    if (filters.brands.length)     list = list.filter(p => filters.brands.includes(p.brandId));
    if (filters.onlyInStock)       list = list.filter(p => p.inStock);
    if (filters.onlyOnSale)        list = list.filter(p => p.isOnSale);
    if (filters.priceMin)          list = list.filter(p => p.price >= Number(filters.priceMin));
    if (filters.priceMax)          list = list.filter(p => p.price <= Number(filters.priceMax));
    if (sort === 'preco-asc')  list.sort((a, b) => a.price - b.price);
    if (sort === 'preco-desc') list.sort((a, b) => b.price - a.price);
    if (sort === 'novidade')   list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    if (sort === 'avaliacao')  list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [q, sale, filters, sort]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFiltersChange = (f) => { setFilters(f); setPage(1); };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6 flex-wrap">
        <Link href="/" className="hover:text-[var(--color-accent)]">Início</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-700 font-medium">Catálogo</span>
        {activeCat && <><ChevronRight className="w-3.5 h-3.5" /><span className="text-slate-700 font-medium">{activeCat.name}</span></>}
        {q && <><ChevronRight className="w-3.5 h-3.5" /><span className="text-slate-700 font-medium">"{q}"</span></>}
      </nav>

      <div className="flex gap-8">
        <ProductFilters filters={filters} onChange={handleFiltersChange} />

        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <p className="text-sm text-slate-600">
              <span className="font-semibold text-slate-800">{filtered.length}</span> resultado{filtered.length !== 1 && 's'}
            </p>
            <div className="flex items-center gap-2">
              <div className="relative">
                <select value={sort} onChange={e => { setSort(e.target.value); setPage(1); }}
                  className="appearance-none bg-white border border-slate-200 text-slate-700 text-sm rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] cursor-pointer">
                  {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <ArrowUpDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
              <div className="flex bg-white border border-slate-200 rounded-lg overflow-hidden">
                {['grid', 'list'].map(v => (
                  <button key={v} onClick={() => setView(v)}
                    className={`p-2 transition ${view === v ? 'bg-[var(--color-accent)] text-white' : 'text-slate-500 hover:bg-slate-50'}`}>
                    {v === 'grid' ? <Grid3X3 className="w-4 h-4" /> : <List className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {paginated.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-slate-600 font-medium mb-1">Nenhum produto encontrado</p>
              <p className="text-slate-400 text-sm">Tenta ajustar os filtros ou a pesquisa.</p>
            </div>
          ) : (
            <div className={view === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4' : 'flex flex-col gap-4'}>
              {paginated.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="px-3 py-2 text-sm border border-slate-200 rounded-lg disabled:opacity-40 hover:bg-slate-50 transition">← Anterior</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button key={n} onClick={() => setPage(n)}
                  className={`w-9 h-9 text-sm rounded-lg transition ${n === page ? 'bg-[var(--color-accent)] text-white font-bold' : 'border border-slate-200 hover:bg-slate-50'}`}>
                  {n}
                </button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="px-3 py-2 text-sm border border-slate-200 rounded-lg disabled:opacity-40 hover:bg-slate-50 transition">Seguinte →</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
