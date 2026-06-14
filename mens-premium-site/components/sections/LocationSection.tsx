const HOURS = [
  { day: 'Segunda a Sexta', time: '09:00 - 19:00' },
  { day: 'Sábado',          time: '09:00 - 18:00' },
  { day: 'Domingo',         time: 'Fechado',       closed: true },
]

export function LocationSection() {
  return (
    <section
      className="section-padding bg-brand-dark border-t border-brand-border"
      aria-label="Localização e contactos"
    >
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Info */}
          <div>
            <p className="text-brand-gold text-[10px] tracking-[0.5em] uppercase font-sans mb-5">
              Encontre-nos
            </p>
            <h2 className="font-display text-4xl sm:text-5xl text-brand-stone leading-tight mb-10">
              Localização<br />& Contacto
            </h2>

            <div className="space-y-8">
              {/* Address */}
              <div>
                <h3 className="text-xs tracking-[0.3em] uppercase text-brand-muted font-sans mb-3">Morada</h3>
                <address className="not-italic text-brand-stone leading-relaxed">
                  Rua de Exemplo, 123<br />
                  0000-000 Cidade<br />
                  Portugal
                </address>
              </div>

              {/* Hours */}
              <div>
                <h3 className="text-xs tracking-[0.3em] uppercase text-brand-muted font-sans mb-4">Horário</h3>
                <table className="w-full max-w-xs" aria-label="Horário de funcionamento">
                  <tbody className="divide-y divide-brand-border">
                    {HOURS.map(row => (
                      <tr key={row.day}>
                        <td className="py-3 pr-6 text-sm text-brand-muted">{row.day}</td>
                        <td className={`py-3 text-sm font-medium text-right ${row.closed ? 'text-brand-border' : 'text-brand-stone'}`}>
                          {row.time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Note */}
              <div className="bg-brand-gold/5 border border-brand-gold/20 px-5 py-4">
                <p className="text-brand-stone/80 text-sm leading-relaxed">
                  <strong className="text-brand-gold font-medium">Apenas por marcação.</strong>{' '}
                  Agende online ou contacte-nos directamente para verificar disponibilidade.
                </p>
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="relative">
            <div className="w-full aspect-[4/3] bg-brand-surface border border-brand-border overflow-hidden relative group">
              {/*
               * Substituir pelo embed do Google Maps real:
               * <iframe
               *   src="https://maps.google.com/maps?q=NOME+DO+NEGOCIO+CIDADE&output=embed"
               *   className="w-full h-full"
               *   loading="lazy"
               *   referrerPolicy="no-referrer-when-downgrade"
               * />
               */}
              <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_39px,rgba(201,168,76,0.04)_39px,rgba(201,168,76,0.04)_40px),repeating-linear-gradient(90deg,transparent,transparent_39px,rgba(201,168,76,0.04)_39px,rgba(201,168,76,0.04)_40px)]" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-6 h-8 bg-brand-gold rounded-t-full relative">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-brand-black rounded-full" />
                </div>
                <p className="text-brand-muted text-sm tracking-widest uppercase text-center">
                  Rua de Exemplo, 123<br />
                  <span className="text-brand-gold/80">Cidade, Portugal</span>
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 text-xs tracking-[0.2em] uppercase text-brand-gold border border-brand-gold/30 px-4 py-2 hover:bg-brand-gold hover:text-brand-black transition-all duration-200"
                >
                  Abrir no Google Maps
                </a>
              </div>
            </div>
            <div className="absolute -bottom-3 -right-3 w-full h-full border border-brand-gold/15 -z-10" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  )
}
