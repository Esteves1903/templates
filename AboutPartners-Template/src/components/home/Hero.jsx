'use client';

import { Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import VehicleSelector from '@/components/vehicle/VehicleSelector';

const perks = [
  { icon: Truck,       text: 'Envio em 24/48 h' },
  { icon: ShieldCheck, text: 'Qualidade garantida' },
  { icon: RotateCcw,   text: '30 dias de devolução' },
];

export default function Hero() {
  return (
    <section className="relative bg-[var(--color-header)] overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      <div className="absolute right-0 top-0 w-96 h-96 bg-[var(--color-accent)] opacity-10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="relative max-w-7xl mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 bg-[var(--color-accent)]/20 text-[var(--color-accent)] text-xs font-semibold px-3 py-1 rounded-full mb-5">
            ✦ Mais de 50 000 referências em stock
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
            A peça certa<br /><span className="text-[var(--color-accent)]">para o teu carro</span>
          </h1>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">
            Seleciona o teu veículo e encontra todas as peças compatíveis com entrega rápida e garantia incluída.
          </p>
          <VehicleSelector />
          <div className="flex flex-wrap gap-5 mt-10">
            {perks.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm text-slate-400">
                <Icon className="w-4 h-4 text-[var(--color-accent)]" /> {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
