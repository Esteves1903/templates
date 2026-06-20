'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

function Eyebrow({ label, center = false }: { label: string; center?: boolean }) {
  return (
    <div className={`flex items-center ${center ? 'justify-center' : ''}`}>
      <span className="text-brand-500 text-[10px] uppercase tracking-[0.42em] font-medium">{label}</span>
    </div>
  );
}

const categorias = [
  { id: 'categoria1', label: 'Nome da Categoria 1' },
  { id: 'categoria2', label: 'Nome da Categoria 2' },
  { id: 'categoria3', label: 'Nome da Categoria 3' },
  { id: 'categoria4', label: 'Nome da Categoria 4' },
  { id: 'categoria5', label: 'Nome da Categoria 5' },
];

const ementa: Record<string, { title: string; desc: string; price: string; img: string }[]> = {
  categoria1: [
    {
      title: 'Nome do prato 1',
      desc: 'Descrição dos ingredientes e modo de confeção do prato.',
      price: '00.00€',
      img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=900',
    },
    {
      title: 'Nome do prato 2',
      desc: 'Descrição dos ingredientes e modo de confeção do prato.',
      price: '00.00€',
      img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=900',
    },
    {
      title: 'Nome do prato 3',
      desc: 'Descrição dos ingredientes e modo de confeção do prato.',
      price: '00.00€',
      img: 'https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?q=80&w=900',
    },
    {
      title: 'Nome do prato 4',
      desc: 'Descrição dos ingredientes e modo de confeção do prato.',
      price: '00.00€',
      img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=900',
    },
  ],
  categoria2: [
    {
      title: 'Nome do prato 1',
      desc: 'Descrição dos ingredientes e modo de confeção do prato.',
      price: '00.00€',
      img: 'https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=900',
    },
    {
      title: 'Nome do prato 2',
      desc: 'Descrição dos ingredientes e modo de confeção do prato.',
      price: '00.00€',
      img: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=900',
    },
    {
      title: 'Nome do prato 3',
      desc: 'Descrição dos ingredientes e modo de confeção do prato.',
      price: '00.00€',
      img: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?q=80&w=900',
    },
    {
      title: 'Nome do prato 4',
      desc: 'Descrição dos ingredientes e modo de confeção do prato.',
      price: '00.00€',
      img: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=900',
    },
    {
      title: 'Nome do prato 5',
      desc: 'Descrição dos ingredientes e modo de confeção do prato.',
      price: '00.00€',
      img: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=900',
    },
    {
      title: 'Nome do prato 6',
      desc: 'Descrição dos ingredientes e modo de confeção do prato.',
      price: '00.00€',
      img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=900',
    },
  ],
  categoria3: [
    {
      title: 'Nome do prato 1',
      desc: 'Descrição dos ingredientes e modo de confeção do prato.',
      price: '00.00€',
      img: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=900',
    },
    {
      title: 'Nome do prato 2',
      desc: 'Descrição dos ingredientes e modo de confeção do prato.',
      price: '00.00€',
      img: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=900',
    },
    {
      title: 'Nome do prato 3',
      desc: 'Descrição dos ingredientes e modo de confeção do prato.',
      price: '00.00€',
      img: 'https://images.unsplash.com/photo-1608039858788-31f7b7b75bb1?q=80&w=900',
    },
  ],
  categoria4: [
    {
      title: 'Nome do prato 1',
      desc: 'Descrição dos ingredientes e modo de confeção do prato.',
      price: '00.00€',
      img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=900',
    },
    {
      title: 'Nome do prato 2',
      desc: 'Descrição dos ingredientes e modo de confeção do prato.',
      price: '00.00€',
      img: 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?q=80&w=900',
    },
    {
      title: 'Nome do prato 3',
      desc: 'Descrição dos ingredientes e modo de confeção do prato.',
      price: '00.00€',
      img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=900',
    },
    {
      title: 'Nome do prato 4',
      desc: 'Descrição dos ingredientes e modo de confeção do prato.',
      price: '00.00€',
      img: 'https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?q=80&w=900',
    },
  ],
  categoria5: [
    {
      title: 'Nome do prato 1',
      desc: 'Descrição dos ingredientes e modo de confeção do prato.',
      price: '00.00€',
      img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=900',
    },
    {
      title: 'Nome do prato 2',
      desc: 'Descrição dos ingredientes e modo de confeção do prato.',
      price: '00.00€',
      img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=900',
    },
    {
      title: 'Nome do prato 3',
      desc: 'Descrição dos ingredientes e modo de confeção do prato.',
      price: '00.00€',
      img: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=900',
    },
  ],
};

export default function EmentaPage() {
  const [activeCategoria, setActiveCategoria] = useState('categoria1');
  const pratos = ementa[activeCategoria] ?? [];

  return (
    <div className="flex flex-col min-h-screen selection:bg-brand-500 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* ── HERO ── */}
        <section className="relative min-h-[52vh] flex items-end px-6 md:px-12 pb-20 pt-40 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1400"
              alt="Ementa O Brasinhas 3"
              fill
              sizes="100vw"
              className="object-cover brightness-[0.35]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto w-full space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Eyebrow label="Tipo de negócio · Localização" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="font-serif text-[clamp(3rem,7vw,5.5rem)] text-white leading-[1.05] tracking-tight"
            >
              Título da <span className="text-brand-500 italic">Página</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-white/50 text-lg font-light max-w-lg leading-relaxed"
            >
              Descrição breve da ementa: o que a torna especial, a filosofia por detrás dos pratos ou a origem dos ingredientes.
            </motion.p>
          </div>
        </section>

        {/* ── CATEGORIAS ── */}
        <section className="py-20 px-6 md:px-12">
          <div className="max-w-7xl mx-auto space-y-14">

            {/* Tab bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-2"
            >
              {categorias.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoria(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-[11px] uppercase tracking-[0.25em] font-medium transition-all ${
                    activeCategoria === cat.id
                      ? 'bg-brand-600 text-white shadow-[0_6px_20px_rgba(234,88,12,0.35)]'
                      : 'border border-white/[0.08] text-white/50 hover:border-white/20 hover:text-white/80'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </motion.div>

            {/* Pratos grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategoria}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {pratos.map((prato, i) => (
                  <motion.article
                    key={prato.title}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.55 }}
                    className="group"
                  >
                    <div className="relative h-56 rounded-2xl overflow-hidden mb-5">
                      <Image
                        src={prato.img}
                        alt={prato.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover brightness-75 group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 to-transparent" />
                      <span className="absolute bottom-4 right-4 font-serif text-xl text-brand-400">
                        {prato.price}
                      </span>
                    </div>
                    <div className="space-y-1.5 px-1">
                      <h3 className="font-serif text-xl text-white leading-tight group-hover:text-brand-400 transition-colors duration-300">
                        {prato.title}
                      </h3>
                      <p className="text-white/40 text-sm font-light leading-relaxed">{prato.desc}</p>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Nota de alergénios */}
            <p className="text-white/20 text-xs font-light pt-6">
              Informe-nos sobre alergias ou intolerâncias alimentares. Preços com IVA incluído. Imagens meramente ilustrativas.
            </p>
          </div>
        </section>

        {/* ── CTA RESERVAR ── */}
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
              Texto motivacional para o utilizador fazer a reserva. Horário de funcionamento e disponibilidade.
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
      </main>

      <Footer />
    </div>
  );
}
