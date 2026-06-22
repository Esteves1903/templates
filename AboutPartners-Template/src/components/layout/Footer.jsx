'use client';

import Link from 'next/link';
import { Car, MapPin, Phone, Mail, Facebook, Instagram, Youtube } from 'lucide-react';

const cols = [
  { title: 'Categorias', links: [['Motor','/catalogo?categoria=motor'],['Travões','/catalogo?categoria=travoes'],['Suspensão','/catalogo?categoria=suspensao'],['Filtros','/catalogo?categoria=filtros'],['Sistema Elétrico','/catalogo?categoria=eletrico'],['Iluminação','/catalogo?categoria=iluminacao'],['Óleos e Fluidos','/catalogo?categoria=oleos']] },
  { title: 'Ajuda',      links: [['Como encomendar','/ajuda'],['Envios e prazos','/envios'],['Devoluções','/devolucoes'],['Garantias','/garantias'],['Perguntas frequentes','/faq']] },
  { title: 'Empresa',    links: [['Sobre nós','/sobre'],['Contactos','/contactos'],['Trabalhá connosco','/carreiras'],['Política de privacidade','/privacidade'],['Termos e condições','/termos']] },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--color-header)] text-slate-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 bg-[var(--color-accent)] rounded-lg flex items-center justify-center flex-shrink-0">
              <Car className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-white text-lg">AUTO<span className="text-[var(--color-accent)]">PEÇAS</span></span>
          </div>
          <p className="text-sm leading-relaxed mb-5 text-slate-500">A sua loja de referência para peças automóveis. Vasta seleção, entrega rápida e qualidade garantida.</p>
          <div className="space-y-2 text-sm">
            <p className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[var(--color-accent)]" /> Rua Exemplo, 123 · 1000-001 Lisboa</p>
            <p className="flex items-center gap-2"><Phone className="w-4 h-4 flex-shrink-0 text-[var(--color-accent)]" /> 210 000 000</p>
            <p className="flex items-center gap-2"><Mail  className="w-4 h-4 flex-shrink-0 text-[var(--color-accent)]" /> geral@autopeças.pt</p>
          </div>
        </div>
        {cols.map(col => (
          <div key={col.title}>
            <h3 className="text-white font-semibold text-sm mb-4">{col.title}</h3>
            <ul className="space-y-2">
              {col.links.map(([label, to]) => (
                <li key={label}><Link href={to} className="text-sm hover:text-[var(--color-accent)] transition">{label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-700/60 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-semibold text-sm">Subscreva a nossa newsletter</p>
            <p className="text-slate-500 text-xs mt-0.5">Promoções exclusivas e novidades todas as semanas.</p>
          </div>
          <form className="flex gap-2 w-full md:w-auto" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="O seu e-mail"
              className="flex-1 md:w-64 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
            <button type="submit" className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white text-sm font-semibold px-4 py-2 rounded-lg transition whitespace-nowrap">Subscrever</button>
          </form>
        </div>
      </div>

      <div className="border-t border-slate-700/60 px-4 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600">© {new Date().getFullYear()} AutoPeças. Todos os direitos reservados.</p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600 mr-1">Aceitamos:</span>
            {['VISA','MC','MB','MBWAY','PP'].map(m => (
              <span key={m} className="bg-slate-800 text-slate-400 text-[10px] font-bold px-2 py-1 rounded border border-slate-700">{m}</span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {[Facebook, Instagram, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="w-8 h-8 bg-slate-800 hover:bg-[var(--color-accent)] rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
