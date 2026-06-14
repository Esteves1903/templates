'use client';

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Star, MapPin, Clock, Phone, ArrowRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

// ----------------------------------------------------------------------
// 0. Navbar Section
// ----------------------------------------------------------------------
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-stone-950/80 backdrop-blur-md border-b border-white/10 py-4 shadow-2xl" : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <div className="font-serif text-2xl font-bold text-white tracking-wider flex items-center gap-2 cursor-pointer">
          O Brasinhas <span className="text-brand-500 italic">3</span>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {[ 
            { name: 'Menu', href: '#menu' }, 
            { name: 'Especialidades', href: '#especialidades' }, 
            { name: 'Sobre Nós', href: '#sobre-nos' }, 
            { name: 'Contactos', href: '#contactos' }
          ].map((item) => (
            <a key={item.name} href={item.href} className="text-xs font-sans uppercase tracking-[0.2em] text-white/70 hover:text-brand-500 transition-colors relative group">
              {item.name}
              <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-brand-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </a>
          ))}
        </nav>
        
        <a href="tel:+351916233375" className="hidden md:block bg-brand-600 hover:bg-brand-500 text-white font-sans text-xs uppercase tracking-[0.15em] py-3 px-8 rounded-full transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(234,88,12,0.6)]">
          Reservar
        </a>

        {/* Mobile Nav Toggle */}
        <button className="md:hidden text-white/80 hover:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-stone-950/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-8 gap-6">
              {[ 
                { name: 'Menu', href: '#menu' }, 
                { name: 'Especialidades', href: '#especialidades' }, 
                { name: 'Sobre Nós', href: '#sobre-nos' }, 
                { name: 'Contactos', href: '#contactos' }
              ].map((item) => (
                <a key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)} className="text-lg font-serif tracking-widest text-white/80 hover:text-brand-500">
                  {item.name}
                </a>
              ))}
              <a href="tel:+351916233375" className="text-center bg-brand-600 text-white font-sans text-sm uppercase tracking-widest py-4 rounded-full mt-4">
                Reservar Mesa
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// ----------------------------------------------------------------------
// 1. Hero Section (Parallax & Elegant Typography)
// ----------------------------------------------------------------------
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section id="sobre-nos" ref={ref} className="relative h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Video / Parallax Placeholder */}
      <motion.div 
        style={{ y: yBg }}
        className="absolute inset-0 z-[-1] bg-gradient-to-b from-black/80 via-black/40 to-[#0a0503]"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000')] bg-cover bg-center opacity-30 mix-blend-overlay" />
      </motion.div>

      <motion.div 
        style={{ opacity: opacityText }}
        className="flex flex-col items-center text-center px-6 mt-32"
      >
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-6 bg-white/5 backdrop-blur-md px-6 py-2 rounded-full border border-white/10"
        >
          <div className="flex text-yellow-500 w-4 h-4"><Star className="fill-current" /></div>
          <span className="font-sans text-sm tracking-widest uppercase font-semibold text-white/90">
            Experiência Gastronómica de Excelência
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          {/* Logo inserido pelo utilizador com máscara para disfarçar as bordas quadradas escuras */}
          <img 
            src="/logo.jpg" 
            alt="O Brasinhas 3 Logo" 
            className="w-full max-w-[500px] h-auto object-contain mix-blend-screen drop-shadow-[0_0_30px_rgba(234,88,12,0.3)]"
            style={{ 
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 75%)', 
              maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 75%)' 
            }}
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-serif text-3xl md:text-5xl text-white mb-6"
        >
          O Sabor da Tradição Elevado ao Topo
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="max-w-xl font-sans text-lg md:text-xl text-white/60 font-light leading-relaxed mb-12"
        >
          Onde a tradição do autêntico churrasco encontra a sofisticação moderna. 
          A melhor Francesinha de Rio Tinto, num ambiente premium.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <a href="#menu" className="group relative overflow-hidden bg-brand-600 text-white font-sans font-medium uppercase tracking-widest text-sm py-5 px-10 rounded-full transition-transform hover:scale-105 active:scale-95 text-center">
            <span className="relative z-10 flex items-center justify-center gap-2">
              Ver Menu <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-brand-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
          </a>
          <a href="tel:+351916233375" className="flex items-center justify-center bg-white/5 hover:bg-white/10 backdrop-blur-md text-white border border-white/10 font-sans font-medium uppercase tracking-widest text-sm py-5 px-10 rounded-full transition-all hover:scale-105 active:scale-95 text-center">
            Reservar Mesa
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ----------------------------------------------------------------------
// 2. Menu Highlight (Asymmetrical Grid & Whitespace)
// ----------------------------------------------------------------------
const dishes = [
  {
    title: "A Nossa Francesinha",
    desc: "Bife do lombo selecionado, enchidos premium artesanais e um molho secreto apurado lentamente durante 48 horas.",
    colSpan: "md:col-span-8",
    height: "h-[500px]",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=1000",
  },
  {
    title: "Entradas D'Autor",
    desc: "Seleção de queijos curados, enchidos ibéricos e pão de fermentação natural em forno de lenha.",
    colSpan: "md:col-span-4",
    height: "h-[400px] md:mt-24",
    image: "https://images.unsplash.com/photo-1606850780554-b55ea44f4ecb?q=80&w=1000",
  },
  {
    title: "Cheesecake Desconstruído",
    desc: "Texturas de frutos vermelhos silvestres sobre uma base crocante de amêndoa torrada.",
    colSpan: "md:col-span-12",
    height: "h-[600px]",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=1500",
  }
];

function MenuGallery() {
  return (
    <section id="especialidades" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div 
        id="menu"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8"
      >
        <h2 className="font-serif text-5xl md:text-7xl leading-tight">
          A Arte <br />
          <span className="text-white/40 italic">na Grelha</span>
        </h2>
        <p className="max-w-sm text-white/60 font-sans font-light">
          Cada prato é uma obra de arte pensada ao detalhe, respeitando o produto
          fresco e as técnicas ancestrais de cocção a fogo.
        </p>
      </motion.div>

      <div className="flex flex-col gap-32">
        {dishes.map((dish, i) => {
          const isEven = i % 2 !== 0;
          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className={`flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16`}
            >
              <div className="flex-1 space-y-6">
                <h3 className="font-serif text-4xl md:text-5xl text-white group-hover:text-brand-500 transition-colors">{dish.title}</h3>
                <p className="font-sans text-lg text-white/60 font-light leading-relaxed max-w-lg">
                  {dish.desc}
                </p>
              </div>
              <div className="flex-1 w-full">
                <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
                  <img 
                    src={dish.image} 
                    alt={dish.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// 3. Information & Contact (Glassmorphism & Magnet Hover)
// ----------------------------------------------------------------------
function InfoSection() {
  const infoCards = [
    { icon: MapPin, title: "Localização", lines: [{text: "R. Fernão de Magalhães 89"}, {text: "4435-481 Venda Nova, Rio Tinto"}] },
    { icon: Clock, title: "Horário", lines: [{text: "Aberto todos os dias"}, {text: "Encerra às 22:30 (Popular aos Domingos)"}] },
    { icon: Phone, title: "Contacto", lines: [{text: "916 233 375", href: "tel:+351916233375"}, {text: "reservas@obrasinhas.pt", href: "mailto:reservas@obrasinhas.pt"}] },
  ];

  return (
    <section id="contactos" className="py-32 px-6 md:px-12 relative">
      {/* 3. Cartão em Glassmorphism Escuro */}
      <div className="max-w-7xl mx-auto bg-stone-900/40 border border-stone-700/50 backdrop-blur-lg rounded-[3rem] p-8 md:p-24 overflow-hidden relative shadow-2xl">
        
        <div className="relative z-10 flex flex-col lg:flex-row gap-16 justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-lg"
          >
            <h2 className="font-serif text-5xl mb-8">Visite-nos</h2>
            <p className="font-sans text-white/60 font-light leading-relaxed mb-12">
              Com uma classificação de 4.1 estrelas e mais de 1800 críticas de clientes reais, 
              estamos sempre prontos para lhe oferecer uma refeição inesquecível.
            </p>
            <div className="flex items-center gap-4">
              <span className="font-serif text-6xl text-brand-500">4.1</span>
              <div className="flex flex-col">
                <div className="flex gap-1 text-yellow-500 mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <span className="text-white/40 text-sm font-sans tracking-wider uppercase">1814 Avaliações Google</span>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col gap-8 flex-1 max-w-md">
            {infoCards.map((info, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                className="group flex gap-6 items-start p-6 rounded-2xl hover:bg-white/[0.04] transition-colors border border-transparent hover:border-white/10"
              >
                <div className="p-4 rounded-full bg-brand-500/10 text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-all duration-500">
                  <info.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-2xl mb-2">{info.title}</h4>
                  {info.lines.map((line, idx) => (
                    line.href ? (
                      <a key={idx} href={line.href} className="block font-sans text-white/50 font-light hover:text-brand-500 transition-colors">{line.text}</a>
                    ) : (
                      <p key={idx} className="font-sans text-white/50 font-light">{line.text}</p>
                    )
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Main Page Assembly
// ----------------------------------------------------------------------
export default function Home() {
  return (
    <div className="flex flex-col w-full selection:bg-brand-500 selection:text-white relative">
      <Navbar />
      <Hero />
      <MenuGallery />
      <InfoSection />
    </div>
  );
}
