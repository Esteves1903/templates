'use client';

import { Navbar } from "@/components/layout/Navbar";
import { StatsBar } from "@/components/sections/StatsBar";
import { motion } from "framer-motion";
import { Star, ArrowRight, MapPin, Clock, Phone } from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full min-h-screen selection:bg-brand-500 selection:text-white relative">
      <Navbar />
      
      <main className="flex-1">
        <section id="inicio" className="h-[90svh] flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <span className="inline-block font-sans text-xs uppercase tracking-[0.4em] text-brand-500 font-bold drop-shadow-md">
              Desde 2009 — Rio Tinto
            </span>
            <h1 className="font-serif text-[clamp(2.5rem,8vw,5.5rem)] text-white leading-[1.1] tracking-tight drop-shadow-2xl">
              O Sabor da <span className="text-brand-500 italic">Tradição</span>
              <br />
              <span className="text-white/90 font-light">Elevado ao Topo</span>
            </h1>
            <p className="max-w-xl mx-auto font-sans text-lg text-white/80 font-light leading-relaxed drop-shadow-md">
              A autêntica experiência do churrasco a fogo e as melhores francesinhas da região, num ambiente exclusivo e acolhedor.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 pt-8">
              <motion.a
                href="/reservar"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="bg-brand-600 text-white font-sans text-xs uppercase tracking-widest py-5 px-12 rounded-full shadow-[0_10px_30px_rgba(234,88,12,0.3)] hover:shadow-[0_20px_50px_rgba(249,115,22,0.5)] transition-shadow"
              >
                Reservar Mesa
              </motion.a>
              <motion.a
                href="/#especialidades"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.08)' }}
                whileTap={{ scale: 0.97 }}
                className="border border-white/30 text-white font-sans text-xs uppercase tracking-widest py-5 px-12 rounded-full backdrop-blur-md hover:bg-white/[0.03] transition-colors"
              >
                Ver Ementa
              </motion.a>
            </div>
          </motion.div>
        </section>

        <StatsBar />
        <AboutSection />
        <MenuGallery />
        <Testimonials />
        <InfoSection />
      </main>

      <Footer/>
    </div>
  );
}

function AboutSection() {
  return (
    <section id="sobre-nos" className="py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} className="lg:w-1/2 space-y-8">
          <span className="text-brand-500 uppercase tracking-[0.4em] text-[10px] font-bold">— A Nossa História</span>
          <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] text-white leading-[1.1] drop-shadow-xl">O Coração da <br/><span className="text-white/40 italic">Churrascaria em Rio Tinto</span></h2>
          <p className="text-white/80 text-lg leading-relaxed font-light drop-shadow-md">Desde 2009, O Brasinhas 3 tem sido o ponto de encontro para quem procura a alma da gastronomia portuguesa. Onde o fogo encontra a mestria e cada ingrediente é selecionado com o máximo rigor.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="lg:w-1/2 relative h-[500px] w-full rounded-[3rem] overflow-hidden shadow-2xl">
          <Image src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200" alt="Ambiente" fill className="object-cover brightness-75" />
        </motion.div>
      </div>
    </section>
  );
}

function MenuGallery() {
  const items = [
    { title: "Francesinha Especial", desc: "Com o molho secreto da casa e batata frita caseira.", price: "12.50€", img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=1200" },
    { title: "Costeletão de Novilho", desc: "Grelhado na brasa com flor de sal e acompanhamentos premium.", price: "28.00€", img: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?q=80&w=1200" },
    { title: "Picanha à Brasinhas", desc: "Cortes selecionados servidos com arroz, feijão e farofa.", price: "18.50€", img: "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=1200" },
  ];
  return (
    <section id="especialidades" className="py-32 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <span className="text-brand-500 uppercase tracking-[0.4em] text-[10px] font-bold">— Especialidades</span>
          <h2 className="font-serif text-5xl text-white drop-shadow-lg">Nossa Ementa</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <motion.div key={i} whileHover={{ y: -10 }} className="group relative h-[500px] rounded-[2.5rem] overflow-hidden">
              <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-50" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 p-8 flex flex-col justify-end gap-3">
                <h3 className="text-white font-serif text-3xl drop-shadow-md">{item.title}</h3>
                <p className="text-white/70 text-sm font-light line-clamp-2">{item.desc}</p>
                <div className="flex items-center justify-between pt-4">
                  <span className="text-brand-500 font-serif text-2xl">{item.price}</span>
                  <motion.a href="/reservar" className="text-white text-[10px] uppercase tracking-widest flex items-center gap-2 group/btn">Reservar <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform"/></motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-32 px-6 text-center space-y-12">
      <Star className="w-12 h-12 text-brand-500 mx-auto opacity-50" />
      <h2 className="font-serif text-4xl text-white max-w-4xl mx-auto leading-relaxed italic drop-shadow-xl">&ldquo;A melhor francesinha de Rio Tinto. O serviço é rápido e a carne é de qualidade superior. Um espaço a visitar obrigatoriamente.&rdquo;</h2>
      <div className="text-white font-bold uppercase tracking-widest text-xs">Ricardo Santos · Local Guide</div>
    </section>
  );
}

function InfoSection() {
  const cards = [
    { icon: MapPin, title: "Localização", lines: ["R. Fernão de Magalhães 89", "4435-481 Rio Tinto"] },
    { icon: Clock, title: "Horário", lines: ["Todos os dias", "12:00 – 22:30"] },
    { icon: Phone, title: "Contacto", lines: ["916 233 375", "reservas@obrasinhas.pt"] },
  ];
  return (
    <section id="contactos" className="py-32 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      {cards.map((card, i) => (
        <div key={i} className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.06] backdrop-blur-md flex flex-col items-center text-center gap-6 group hover:border-brand-500/20 transition-all">
          <div className="w-16 h-16 rounded-2xl bg-brand-500/10 flex items-center justify-center text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-all duration-500"><card.icon className="w-6 h-6" /></div>
          <div className="space-y-3">
            <h4 className="text-white font-serif text-2xl drop-shadow-md">{card.title}</h4>
            {card.lines.map((line, idx) => <p key={idx} className="text-white/60 text-base font-light">{line}</p>)}
          </div>
        </div>
      ))}
    </section>
  );
}