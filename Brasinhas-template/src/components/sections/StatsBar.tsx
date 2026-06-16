'use client';

import { motion } from "framer-motion";
import { Star, Flame, Award, Users } from "lucide-react";

export function StatsBar() {
  const stats = [
    { icon: Star, value: "4.1", suffix: "", label: "Google Rating" },
    { icon: Users, value: "1800", suffix: "+", label: "Clientes Felizes" },
    { icon: Flame, value: "15", suffix: "y", label: "Anos de Brasa" },
    { icon: Award, value: "100", suffix: "%", label: "Qualidade" },
  ];

  return (
    <section className="py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 100, damping: 20 }}
            className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm text-center group hover:bg-white/[0.05] transition-all"
          >
            <stat.icon className="w-5 h-5 text-brand-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <div className="font-serif text-3xl text-white mb-1 drop-shadow-md">
              {stat.value}<span className="text-brand-500">{stat.suffix}</span>
            </div>
            <div className="text-[10px] uppercase tracking-widest text-white/80 font-bold drop-shadow-sm">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
