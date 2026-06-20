'use client';

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navItems = [
  { name: 'A Nossa História', href: '/#sobre-nos' },
  { name: 'A Nossa Carne', href: '/#carne' },
  { name: 'O Restaurante', href: '/#restaurante' },
  { name: 'Ementa', href: '/ementa' },
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 overflow-visible",
        scrolled
          ? "bg-stone-950/92 backdrop-blur-xl border-b border-white/[0.05] py-1 shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
          : "bg-transparent py-1"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <motion.a href="/" whileHover={{ scale: 1.03 }} className="cursor-pointer shrink-0">
          <Image
            src="/logo.png"
            alt="O Brasinhas 3"
            width={140}
            height={84}
            className="object-contain object-contain"
            priority
          />
        </motion.a>

        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onMouseEnter={() => setActiveItem(item.name)}
              onMouseLeave={() => setActiveItem('')}
              className="text-[11px] font-sans uppercase tracking-[0.22em] text-white/70 hover:text-white transition-colors relative py-2 cursor-pointer"
            >
              {item.name}
              <motion.span
                initial={false}
                animate={{ width: activeItem === item.name ? '100%' : '0%' }}
                className="absolute bottom-0 left-0 h-px bg-brand-500"
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <motion.a
            href="/reservar"
            whileHover={{ scale: 1.05 }}
            className="hidden sm:flex bg-brand-600 text-white font-sans text-[11px] uppercase tracking-widest py-3 px-7 rounded-full shadow-[0_6px_20px_rgba(234,88,12,0.3)] cursor-pointer"
          >
            Reservar
          </motion.a>
          <button className="md:hidden text-white p-2 cursor-pointer" onClick={toggleMobileMenu} aria-label="Abrir menu">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-stone-950 flex flex-col p-8"
          >
            <div className="flex items-center justify-between mb-14">
              <Image src="/logo.png" alt="O Brasinhas 3" width={80} height={48} className="object-contain" />
              <button onClick={toggleMobileMenu} className="text-white p-2 cursor-pointer">
                <X className="w-7 h-7" />
              </button>
            </div>
            <div className="flex flex-col gap-6 flex-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={toggleMobileMenu}
                  className="font-serif text-3xl text-white hover:text-brand-500 transition-colors cursor-pointer"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <a
              href="/reservar"
              onClick={toggleMobileMenu}
              className="block bg-brand-600 text-white font-sans text-xs uppercase tracking-widest py-5 rounded-full text-center cursor-pointer"
            >
              Reservar Mesa
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
