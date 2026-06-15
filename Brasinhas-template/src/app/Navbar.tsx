'use client';

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: 'A Nossa História', href: '/#sobre-nos' },
  { name: 'Ementa', href: '/#especialidades' },
  { name: 'Reservas', href: '/reservar' },
  { name: 'Contactos', href: '/#contactos' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = useCallback(() => setIsMobileMenuOpen(prev => !prev), []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-stone-950/90 backdrop-blur-xl border-b border-white/[0.05] py-4 shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
          : "bg-transparent py-8"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <motion.a
          href="/"
          whileHover={{ scale: 1.05, rotate: -1 }}
          className="font-serif text-2xl font-bold text-white tracking-wider flex items-center gap-2 cursor-pointer select-none drop-shadow-lg"
        >
          <Flame className="w-6 h-6 text-brand-500 animate-pulse" aria-hidden />
          O Brasinhas <span className="text-brand-500 italic">3</span>
        </motion.a>

        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onMouseEnter={() => setActiveItem(item.name)}
              onMouseLeave={() => setActiveItem('')}
              className="text-xs font-sans uppercase tracking-[0.2em] text-white hover:text-white transition-colors relative group py-2 drop-shadow-md"
            >
              {item.name}
              <motion.span
                initial={false}
                animate={{ width: activeItem === item.name ? '100%' : '0%' }}
                className="absolute bottom-0 left-0 h-[1px] bg-brand-500 transition-all"
              />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <motion.a href="/reservar" whileHover={{ scale: 1.06 }} className="hidden sm:flex bg-brand-600 text-white font-sans text-xs uppercase tracking-widest py-3 px-7 rounded-full shadow-lg">Reservar Agora</motion.a>
          <button className="md:hidden text-white p-2" onClick={toggleMobileMenu} aria-label="Abrir menu"><Menu className="w-6 h-6" /></button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }} className="fixed inset-0 z-[60] bg-stone-950 flex flex-col p-8">
            <div className="flex justify-end mb-12"><button onClick={toggleMobileMenu} className="text-white p-2"><X className="w-8 h-8" /></button></div>
            <div className="flex flex-col gap-8">
              {navItems.map((item) => <a key={item.name} href={item.href} onClick={toggleMobileMenu} className="font-serif text-4xl text-white hover:text-brand-500 transition-colors">{item.name}</a>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}