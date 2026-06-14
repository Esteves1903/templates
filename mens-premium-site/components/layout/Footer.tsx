import Link from 'next/link'

const LINKS = {
  servicos: [
    { label: 'Corte Clássico',       href: '/#servicos' },
    { label: 'Fade & Degradé',       href: '/#servicos' },
    { label: 'Barba Completa',       href: '/#servicos' },
    { label: 'Corte + Barba',        href: '/#servicos' },
    { label: 'Sobrancelhas',         href: '/#servicos' },
    { label: 'Shampoo & Tratamento', href: '/#servicos' },
  ],
  navegacao: [
    { label: 'Galeria',   href: '/#galeria' },
    { label: 'Reviews',   href: '/#reviews' },
    { label: 'Localização', href: '/#contacto' },
    { label: 'Agendar',   href: '/book' },
  ],
}

export function Footer() {
  return (
    <footer
      className="bg-brand-dark border-t border-brand-border"
      aria-label="Rodapé"
      id="contacto"
    >
      <div className="container-wide py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="group inline-block mb-6">
              <span className="font-display text-xl font-bold italic tracking-[0.12em] uppercase text-brand-gold group-hover:text-brand-gold-light transition-colors">
                Exemplo
              </span>
              <br />
              <span className="text-[8px] tracking-[0.28em] uppercase text-brand-stone/50 font-sans mt-0.5 block">
                Barbearia e Imagem Pessoal
              </span>
            </Link>
            <p className="text-brand-muted text-sm leading-relaxed max-w-xs mb-6">
              Barbearia premium só por marcação. Porque o seu tempo vale tanto quanto o nosso serviço.
            </p>
            <a
              href="https://exemplo.pt/localizacoes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-gold text-xs tracking-widest hover:text-brand-gold-light transition-colors underline underline-offset-4"
            >
              Ver todas as localizações
            </a>
          </div>

          {/* Serviços */}
          <nav aria-label="Serviços">
            <h3 className="text-xs tracking-[0.3em] uppercase text-brand-gold font-sans font-medium mb-6">
              Serviços
            </h3>
            <ul className="space-y-3">
              {LINKS.servicos.map(l => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-brand-muted hover:text-brand-stone transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Navegação + Horários */}
          <div>
            <nav aria-label="Navegação do rodapé" className="mb-8">
              <h3 className="text-xs tracking-[0.3em] uppercase text-brand-gold font-sans font-medium mb-6">
                Navegação
              </h3>
              <ul className="space-y-3">
                {LINKS.navegacao.map(l => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-brand-muted hover:text-brand-stone transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h3 className="text-xs tracking-[0.3em] uppercase text-brand-gold font-sans font-medium mb-4">
                Horário
              </h3>
              <div className="space-y-1 text-sm text-brand-muted">
                <p>Seg a Sex: 09h-19h</p>
                <p>Sábado: 09h às 18h</p>
                <p className="text-brand-border">Domingo: Fechado</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-brand-muted text-xs tracking-wider">
            © {new Date().getFullYear()} Exemplo. Todos os direitos reservados.
          </p>
          <p className="text-brand-border text-xs">
            Só por marcação, sem esperas
          </p>
        </div>
      </div>
    </footer>
  )
}
