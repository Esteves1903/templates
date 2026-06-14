'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Serviços', href: '/#servicos' },
  { label: 'Equipa',   href: '/#equipa' },
  { label: 'Galeria',  href: '/#galeria' },
  { label: 'Reviews',  href: '/#reviews' },
  { label: 'Contacto', href: '/#contacto' },
]

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-brand-black/95 backdrop-blur-md border-b border-brand-border py-4">
      <nav
        className="container-wide flex items-center justify-between"
        aria-label="Navegação principal"
      >
        {/* Logo */}
        <Link href="/" className="group flex flex-col leading-none">
          <span className="font-display text-base sm:text-xl font-bold italic tracking-[0.12em] uppercase text-brand-gold group-hover:text-brand-gold-light transition-colors duration-200">
            Exemplo
          </span>
          <span className="text-[8px] tracking-[0.28em] uppercase text-brand-stone/50 font-sans font-medium mt-0.5">
            Barbearia e Imagem Pessoal
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-10" role="list">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-xs tracking-[0.2em] uppercase font-medium text-brand-muted hover:text-brand-gold transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-4">
          <Button href="/book" variant="gold" size="sm" className="hidden md:inline-flex">
            Agendar
          </Button>

          <button
            className="md:hidden flex flex-col gap-[5px] p-2 -mr-2"
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
          >
            <span className={cn('block h-px w-6 bg-brand-stone transition-all duration-300 origin-center', menuOpen && 'rotate-45 translate-y-[7px]')} />
            <span className={cn('block h-px w-6 bg-brand-stone transition-all duration-300', menuOpen && 'opacity-0 scale-x-0')} />
            <span className={cn('block h-px w-6 bg-brand-stone transition-all duration-300 origin-center', menuOpen && '-rotate-45 -translate-y-[7px]')} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
          menuOpen ? 'max-h-96' : 'max-h-0'
        )}
        aria-hidden={!menuOpen}
      >
        <div className="bg-brand-dark border-t border-brand-border px-4 sm:px-6 py-8 flex flex-col gap-6">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm tracking-[0.2em] uppercase font-medium text-brand-muted hover:text-brand-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Button href="/book" variant="gold" size="md" className="mt-2" onClick={() => setMenuOpen(false)}>
            Agendar Agora
          </Button>
        </div>
      </div>
    </header>
  )
}
