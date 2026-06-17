'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

/* ─── EYEBROW ───────────────────────────────────────────── */
function Eyebrow({ label, center = false }: { label: string; center?: boolean }) {
  return (
    <div className={`flex items-center ${center ? 'justify-center' : ''}`}>
      <span className="text-brand-500 text-[10px] uppercase tracking-[0.42em] font-medium">{label}</span>
    </div>
  );
}

/* ─── PAGE ──────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen selection:bg-brand-500 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <QuemSomosSection />
        <DiferenciadoresSection />
        <EspecialidadesSection />
        <RestauranteSection />
        <ReservarSection />
      </main>
      <Footer />
    </div>
  );
}

/* ─── HERO ──────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section id="inicio" className="min-h-[100svh] flex items-center px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] gap-12 xl:gap-20 items-center py-40">

        {/* Copy */}
        <div className="space-y-9">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <Eyebrow label="Tipo de negócio · Localização · Desde [ano]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="font-serif text-[clamp(3rem,8vw,6.5rem)] text-white leading-[1.05] tracking-tight"
          >
            Slogan<br />
            Principal do<br />
            <span className="text-brand-500 italic">Restaurante</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.38 }}
            className="text-white/50 text-lg font-light leading-relaxed max-w-md"
          >
            Descrição breve do conceito e proposta de valor do restaurante. O que o torna único e porque vale a pena visitar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.52 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <motion.a
              href="/reservar"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="bg-brand-600 text-white text-[11px] uppercase tracking-widest font-sans py-5 px-12 rounded-full shadow-[0_8px_32px_rgba(234,88,12,0.35)] hover:shadow-[0_16px_48px_rgba(249,115,22,0.45)] transition-shadow"
            >
              Reservar Mesa
            </motion.a>
            <motion.a
              href="/ementa"
              whileHover={{ scale: 1.04 }}
              className="border border-white/18 text-white/75 text-[11px] uppercase tracking-widest font-sans py-5 px-12 rounded-full hover:border-white/35 hover:text-white transition-all"
            >
              Ver Ementa
            </motion.a>
          </motion.div>
        </div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="hidden lg:block relative h-[580px] rounded-[2.5rem] overflow-hidden"
        >
          <div className="absolute inset-[-20px] bg-brand-600/12 blur-3xl rounded-[3rem] pointer-events-none" />
          <Image
            src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=900"
            alt="Imagem principal do restaurante"
            fill
            sizes="480px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/65 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

/* ─── QUEM SOMOS ────────────────────────────────────────── */
function QuemSomosSection() {
  return (
    <section id="sobre-nos" className="py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 xl:gap-28 items-center">

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[580px] rounded-[2.5rem] overflow-hidden"
        >
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=900"
            alt="Fotografia do interior do restaurante"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover brightness-[0.65]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/55 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 border-l-2 border-brand-500 pl-5 py-1">
            <p className="text-white/80 font-serif italic text-lg leading-relaxed">
              &ldquo;Citação ou frase de impacto que representa os valores do restaurante.&rdquo;
            </p>
            <span className="text-brand-500 text-[10px] uppercase tracking-widest font-medium mt-2 block">
              — Assinatura da citação
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="space-y-8"
        >
          <Eyebrow label="A Nossa História" />
          <h2 className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] text-white leading-[1.1]">
            Título sobre a origem<br />e identidade
          </h2>
          <div className="space-y-4 text-white/55 text-base font-light leading-relaxed">
            <p>
              Parágrafo sobre a origem e história do restaurante — quando foi fundado, onde fica e o que o distingue da concorrência. Transmitir autenticidade e paixão pelo negócio.
            </p>
            <p>
              Parágrafo sobre os valores do restaurante: compromisso com a qualidade dos ingredientes, forma de trabalhar com fornecedores e a filosofia que guia cada prato servido.
            </p>
          </div>

          <div className="flex items-center gap-8 pt-4 border-t border-white/[0.06]">
            {[
              { val: '[Nº]+', label: 'Anos' },
              { val: '[Nº]★', label: 'Google' },
              { val: '[Nº]+', label: 'Clientes' },
            ].map((s, i) => (
              <div key={s.label} className={`space-y-1 ${i > 0 ? 'pl-8 border-l border-white/[0.06]' : ''}`}>
                <p className="font-serif text-2xl text-white">{s.val}</p>
                <p className="text-white/30 text-[10px] uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── DIFERENCIADOES ────────────────────────────────────── */
function DiferenciadoresSection() {
  const pilares = [
    {
      num: '01',
      title: 'Nome do 1.º diferenciador',
      desc: 'Descrição do primeiro ponto que distingue o restaurante — qualidade dos ingredientes, origem, processo de produção ou certificação.',
    },
    {
      num: '02',
      title: 'Nome do 2.º diferenciador',
      desc: 'Descrição do segundo ponto diferenciador — técnica de confeção, tempo de preparação, método exclusivo ou tradição da casa.',
    },
    {
      num: '03',
      title: 'Nome do 3.º diferenciador',
      desc: 'Descrição do terceiro ponto diferenciador — experiência de serviço, ambiente, personalização ou qualquer outro elemento de valor.',
    },
  ];

  return (
    <section id="carne" className="py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-20">

        <div className="grid lg:grid-cols-2 gap-16 xl:gap-28 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-7 lg:sticky lg:top-36"
          >
            <Eyebrow label="Categoria principal do menu" />
            <h2 className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] text-white leading-[1.1]">
              Título sobre o produto<br />
              <span className="text-white/28 italic">ou especialidade</span>
            </h2>
            <p className="text-white/50 text-base font-light leading-relaxed">
              Parágrafo introdutório sobre o que torna o produto principal do restaurante especial. Explicar a filosofia por detrás da escolha dos ingredientes e da forma como são trabalhados.
            </p>
          </motion.div>

          <div className="divide-y divide-white/[0.06]">
            {pilares.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="py-8 flex gap-6 group cursor-default"
              >
                <span className="font-serif text-sm text-brand-500/35 mt-0.5 shrink-0 w-6 group-hover:text-brand-500 transition-colors duration-300">
                  {p.num}
                </span>
                <div className="space-y-2">
                  <h3 className="font-serif text-xl text-white group-hover:text-brand-500 transition-colors duration-300">
                    {p.title}
                  </h3>
                  <p className="text-white/42 text-sm font-light leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Full-width image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative h-[440px] rounded-[2.5rem] overflow-hidden"
        >
          <Image
            src="https://images.unsplash.com/photo-1603048297172-c92544798d5a?q=80&w=1400"
            alt="Fotografia do produto ou prato principal"
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover brightness-[0.6]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-stone-950/30 to-transparent" />
          <div className="absolute inset-0 flex items-end p-10 md:p-14">
            <p className="font-serif text-white/75 italic text-xl md:text-2xl max-w-sm leading-relaxed">
              &ldquo;Citação de impacto sobre a qualidade ou filosofia do restaurante.&rdquo;
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── ESPECIALIDADES ────────────────────────────────────── */
function EspecialidadesSection() {
  const pratos = [
    {
      title: 'Nome do prato 1',
      desc: 'Descrição breve dos ingredientes, modo de confeção e acompanhamentos do primeiro prato de destaque.',
      price: '00.00€',
      img: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=900',
    },
    {
      title: 'Nome do prato 2',
      desc: 'Descrição breve dos ingredientes, modo de confeção e acompanhamentos do segundo prato de destaque.',
      price: '00.00€',
      img: 'https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=900',
    },
    {
      title: 'Nome do prato 3',
      desc: 'Descrição breve dos ingredientes, modo de confeção e acompanhamentos do terceiro prato de destaque.',
      price: '00.00€',
      img: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=900',
    },
  ];

  return (
    <section id="especialidades" className="py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-14">

        <div className="flex items-end justify-between flex-wrap gap-6">
          <div className="space-y-4">
            <Eyebrow label="Especialidades" />
            <h2 className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] text-white">
              Destaques da Ementa
            </h2>
          </div>
          <a
            href="/ementa"
            className="text-brand-500 text-[11px] uppercase tracking-widest flex items-center gap-2 group mb-1"
          >
            Ver Ementa Completa
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pratos.map((prato, i) => (
            <motion.article
              key={prato.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className="group"
            >
              <div className="relative h-64 rounded-2xl overflow-hidden mb-5">
                <Image
                  src={prato.img}
                  alt={prato.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover brightness-75 group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="space-y-2 px-1">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-serif text-xl text-white leading-tight">{prato.title}</h3>
                  <span className="text-brand-500 font-serif text-lg shrink-0 pt-0.5">{prato.price}</span>
                </div>
                <p className="text-white/40 text-sm font-light">{prato.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── O RESTAURANTE ─────────────────────────────────────── */
function RestauranteSection() {
  return (
    <section id="restaurante" className="py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative h-[580px] rounded-[2.5rem] overflow-hidden"
        >
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1400"
            alt="Fotografia do espaço do restaurante"
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover brightness-[0.5]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/50 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-16 space-y-6 max-w-2xl">
            <Eyebrow label="O Restaurante" />
            <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] text-white leading-[1.1]">
              Título sobre o espaço<br />e a experiência
            </h2>
            <p className="text-white/55 font-light leading-relaxed text-base max-w-md">
              Descrição do ambiente do restaurante — decoração, capacidade, tipo de serviço e o que torna cada visita numa experiência memorável para o cliente.
            </p>
            <motion.a
              href="/reservar"
              whileHover={{ scale: 1.03 }}
              className="inline-flex items-center gap-2 text-brand-500 text-[11px] uppercase tracking-widest font-medium group w-fit"
            >
              Reservar Mesa
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── RESERVAR ──────────────────────────────────────────── */
function ReservarSection() {
  return (
    <section className="py-28 px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto text-center space-y-8"
      >
        <Eyebrow label="Reservas" center />
        <h2 className="font-serif text-[clamp(2.2rem,5vw,4rem)] text-white">
          Título call-to-action<br />de reserva
        </h2>
        <p className="text-white/42 font-light leading-relaxed">
          Texto motivacional para o utilizador fazer a reserva. Horário de funcionamento e disponibilidade. Ex: todos os dias, das 00:00 às 00:00.
        </p>
        <p className="font-serif text-white text-4xl tracking-wide">[Número de telefone]</p>
        <div className="flex flex-wrap gap-4 justify-center pt-2">
          <motion.a
            href="/reservar"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="bg-brand-600 text-white text-[11px] uppercase tracking-widest font-sans py-5 px-12 rounded-full shadow-[0_8px_32px_rgba(234,88,12,0.3)] hover:shadow-[0_16px_48px_rgba(249,115,22,0.4)] transition-shadow"
          >
            Reservar Online
          </motion.a>
          <a
            href="tel:000000000"
            className="border border-white/18 text-white/65 hover:text-white text-[11px] uppercase tracking-widest font-sans py-5 px-12 rounded-full transition-colors hover:border-white/35"
          >
            Ligar Agora
          </a>
        </div>
      </motion.div>
    </section>
  );
}
