import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-10 bg-[#0a0503] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Main info grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-20">

          {/* Logo + tagline */}
          <div className="space-y-5">
            <Image
              src="/logo.png"
              alt="O Brasinhas 3"
              width={130}
              height={130}
              className="object-contain object-contain"
            />
            <p className="text-white/35 text-sm font-light leading-relaxed max-w-[200px]">
              A churrascaria de referência em Rio Tinto, desde 2009.
            </p>
          </div>

          {/* Onde Estamos */}
          <div className="space-y-5">
            <h3 className="text-white/90 text-[10px] uppercase tracking-[0.35em] font-bold">
              Onde Estamos
            </h3>
            <div className="space-y-1.5 text-white/50 text-sm font-light">
              <p>R. Fernão de Magalhães 89</p>
              <p>4435-481 Rio Tinto</p>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=R.+Fernão+de+Magalhães+89+Rio+Tinto"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-brand-500 text-[10px] uppercase tracking-widest font-medium group"
            >
              Ver no Mapa
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Horário */}
          <div className="space-y-5">
            <h3 className="text-white/90 text-[10px] uppercase tracking-[0.35em] font-bold">
              Horário
            </h3>
            <div className="space-y-1.5 text-white/50 text-sm font-light">
              <p>Todos os dias</p>
              <p>12:00 – 22:30</p>
            </div>
          </div>

          {/* Contacto */}
          <div className="space-y-5">
            <h3 className="text-white/90 text-[10px] uppercase tracking-[0.35em] font-bold">
              Contacto
            </h3>
            <div className="space-y-1.5 text-sm font-light">
              <a
                href="tel:916233375"
                className="block text-white/50 hover:text-white transition-colors"
              >
                916 233 375
              </a>
              <a
                href="mailto:reservas@obrasinhas.pt"
                className="block text-white/50 hover:text-white transition-colors"
              >
                reservas@obrasinhas.pt
              </a>
            </div>
            <a
              href="/reservar"
              className="inline-flex items-center gap-2 text-brand-500 text-[10px] uppercase tracking-widest font-medium group"
            >
              Reservar Mesa
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-[10px] uppercase tracking-widest">
            © {new Date().getFullYear()} O Brasinhas 3 · Rio Tinto
          </p>
          <p className="text-white/15 text-[10px] uppercase tracking-widest">
            Todos os direitos reservados
          </p>
        </div>

      </div>
    </footer>
  );
}
