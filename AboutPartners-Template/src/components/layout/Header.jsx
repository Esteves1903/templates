'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Search, ShoppingCart, User, Menu, X, Car, Truck, Phone } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useVehicle } from '@/context/VehicleContext';

const navLinks = [
  { label: 'Catálogo',  href: '/catalogo' },
  { label: 'Promoções', href: '/catalogo?sale=true' },
  { label: 'Sobre nós', href: '/sobre' },
  { label: 'Contactos', href: '/contactos' },
];

export default function Header() {
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems } = useCart();
  const { selectedVehicle, clearVehicle } = useVehicle();
  const router   = useRouter();
  const pathname = usePathname();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/catalogo?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMenuOpen(false);
    }
  };

  const isActive = (href) => pathname === href.split('?')[0];

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* Top bar */}
      <div className="bg-[var(--color-accent)] text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5" /> Envio gratuito acima de 75 €</span>
            <span className="hidden sm:flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> 210 000 000</span>
          </div>
          <span className="hidden md:block">Segunda a Sexta · 09h – 18h</span>
        </div>
      </div>

      {/* Main */}
      <div className="bg-[var(--color-header)] px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-3 lg:gap-4">
          <Link href="/" className="flex-shrink-0 flex items-center gap-2.5" onClick={() => setMenuOpen(false)}>
            <div className="w-9 h-9 bg-[var(--color-accent)] rounded-lg flex items-center justify-center">
              <Car className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block leading-tight">
              <span className="font-black text-white text-lg tracking-tight">AUTO<span className="text-[var(--color-accent)]">PEÇAS</span></span>
              <p className="text-slate-500 text-[10px]">Peças para todas as marcas</p>
            </div>
          </Link>

          <form onSubmit={handleSearch} className="flex-1 min-w-0">
            <div className="relative">
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder="Nome da peça, referência, marca..."
                className="w-full bg-slate-800 text-white placeholder-slate-500 rounded-lg px-4 py-2.5 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:bg-slate-700 transition" />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[var(--color-accent)] transition p-1.5 rounded-md">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="flex items-center gap-1 flex-shrink-0">
            {selectedVehicle && (
              <div className="hidden md:flex items-center gap-1.5 bg-slate-800 text-slate-300 text-xs px-3 py-2 rounded-lg">
                <Car className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                <span className="max-w-[120px] truncate">{selectedVehicle.makeName} {selectedVehicle.modelName} {selectedVehicle.year}</span>
                <button onClick={clearVehicle} className="text-slate-500 hover:text-white transition ml-0.5 font-bold">×</button>
              </div>
            )}
            <Link href="/conta" className="hidden md:flex items-center justify-center w-9 h-9 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition">
              <User className="w-5 h-5" />
            </Link>
            <Link href="/carrinho" className="relative flex items-center justify-center w-9 h-9 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[var(--color-accent)] text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>
            <button onClick={() => setMenuOpen(o => !o)}
              className="lg:hidden flex items-center justify-center w-9 h-9 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition">
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Nav — desktop */}
        <nav className="hidden lg:flex items-center gap-1 max-w-7xl mx-auto mt-2.5 pt-2.5 border-t border-slate-700/60">
          {navLinks.map(l => (
            <Link key={l.href} href={l.href}
              className={`text-sm px-3 py-1.5 rounded-md transition ${isActive(l.href) ? 'text-[var(--color-accent)] bg-slate-800' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-slate-800 border-t border-slate-700 px-4 py-3 space-y-1">
          {navLinks.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              className={`block text-sm px-3 py-2.5 rounded-md transition ${isActive(l.href) ? 'text-[var(--color-accent)] bg-slate-700' : 'text-slate-300 hover:text-white hover:bg-slate-700'}`}>
              {l.label}
            </Link>
          ))}
          <Link href="/conta" onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700 px-3 py-2.5 rounded-md transition">
            <User className="w-4 h-4" /> Conta
          </Link>
        </div>
      )}
    </header>
  );
}
