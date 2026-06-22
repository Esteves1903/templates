import Link from 'next/link';
import { Users, Award, Truck, Headphones, Package, Star } from 'lucide-react';

const stats  = [
  { label: 'Referências em stock', value: '50 000+' },
  { label: 'Clientes satisfeitos',  value: '25 000+' },
  { label: 'Anos de experiência',   value: '15+' },
  { label: 'Encomendas por dia',    value: '500+' },
];
const values = [
  { icon: Award,      title: 'Qualidade garantida',   desc: 'Todos os produtos são verificados e cumprem as normas da indústria automóvel.' },
  { icon: Truck,      title: 'Entrega rápida',        desc: 'Envio no próprio dia para encomendas feitas até às 15h00. Entrega em 24–48h.' },
  { icon: Headphones, title: 'Suporte especializado', desc: 'Equipa técnica disponível para ajudar a identificar a peça certa para o teu veículo.' },
  { icon: Package,    title: 'Vasta seleção',         desc: 'Mais de 50 000 referências de peças para todas as marcas e modelos.' },
];
const team   = [
  { name: 'João Silva',      role: 'Fundador & CEO',       initials: 'JS', color: 'bg-blue-600' },
  { name: 'Maria Santos',    role: 'Diretora Comercial',   initials: 'MS', color: 'bg-rose-600' },
  { name: 'Carlos Ferreira', role: 'Responsável Técnico',  initials: 'CF', color: 'bg-green-600' },
  { name: 'Ana Rodrigues',   role: 'Gestão de Clientes',   initials: 'AR', color: 'bg-purple-600' },
];

export default function AboutContent() {
  return (
    <div>
      <section className="bg-[var(--color-header)] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-black text-white mb-4">Sobre a <span className="text-[var(--color-accent)]">AutoPeças</span></h1>
          <p className="text-slate-400 text-lg leading-relaxed">Há mais de 15 anos a ser a referência em peças automóveis em Portugal.</p>
        </div>
      </section>

      <section className="py-12 px-4 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-black text-[var(--color-accent)] mb-1">{s.value}</p>
              <p className="text-sm text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">A nossa história</h2>
            <div className="space-y-3 text-slate-600 text-sm leading-relaxed">
              <p>A AutoPeças nasceu em 2009 com uma visão clara: tornar as peças automóveis de qualidade acessíveis a todos os portugueses, com um atendimento especializado que faz a diferença.</p>
              <p>Começámos com uma loja física em Lisboa e, ao longo dos anos, expandimos para o digital, permitindo chegar a clientes em todo o país com a mesma dedicação e qualidade de sempre.</p>
              <p>Hoje contamos com uma equipa de mais de 30 especialistas e um catálogo de mais de 50 000 referências, cobrindo todas as marcas e modelos mais comuns no mercado português.</p>
            </div>
          </div>
          <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center">
            <div className="text-center text-slate-400">
              <Package className="w-16 h-16 mx-auto mb-2 opacity-40" />
              <p className="text-sm">Imagem da empresa</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-800 text-center mb-10">Os nossos valores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm text-center">
                <div className="w-12 h-12 bg-[var(--color-accent-light)] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-[var(--color-accent)]" />
                </div>
                <h3 className="font-semibold text-slate-800 text-sm mb-2">{title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-800 text-center mb-10">A nossa equipa</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {team.map(m => (
              <div key={m.name} className="text-center">
                <div className={`w-20 h-20 rounded-full ${m.color} flex items-center justify-center mx-auto mb-3`}>
                  <span className="text-white font-black text-lg">{m.initials}</span>
                </div>
                <p className="font-semibold text-slate-800 text-sm">{m.name}</p>
                <p className="text-xs text-slate-500">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-[var(--color-header)]">
        <div className="max-w-2xl mx-auto text-center">
          <Star className="w-10 h-10 text-[var(--color-accent)] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3">Pronto para encontrar as tuas peças?</h2>
          <p className="text-slate-400 text-sm mb-6">Explora o nosso catálogo ou entra em contacto connosco.</p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link href="/catalogo" className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white font-semibold px-6 py-3 rounded-xl transition">Ver catálogo</Link>
            <Link href="/contactos" className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-xl transition">Falar connosco</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
