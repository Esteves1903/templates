import { SectionHeading } from '@/components/ui/SectionHeading'

const TEAM = [
  {
    initials: 'MB',
    name:     'Mestre Barbeiro',
    role:     'Fundador & Master Barber',
    spec:     'Corte clássico, navalha reta, degradé técnico',
    years:    '10+ anos',
  },
  {
    initials: 'B2',
    name:     'Barbeiro 02',
    role:     'Senior Barber',
    spec:     'Fade & Degradé, sobrancelhas, barba',
    years:    '6+ anos',
  },
  {
    initials: 'B3',
    name:     'Barbeiro 03',
    role:     'Barber',
    spec:     'Corte moderno, tratamentos capilares',
    years:    '4+ anos',
  },
]

export function TeamSection() {
  return (
    <section
      className="section-padding bg-brand-black border-t border-brand-border"
      id="equipa"
      aria-labelledby="equipa-heading"
    >
      <div className="container-wide">
        <SectionHeading
          eyebrow="A Nossa Equipa"
          title="Profissionais ao seu serviço."
          id="equipa-heading"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-border">
          {TEAM.map(member => (
            <article
              key={member.initials}
              className="bg-brand-black group hover:bg-brand-surface transition-colors duration-300 p-10 flex flex-col"
            >
              {/* Avatar */}
              <div className="mb-8">
                <div className="w-20 h-20 rounded-full bg-brand-surface border border-brand-border group-hover:border-brand-gold/40 transition-colors duration-300 flex items-center justify-center">
                  <span className="font-display text-2xl font-bold text-brand-gold/60 group-hover:text-brand-gold transition-colors duration-300">
                    {member.initials}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <p className="text-[9px] tracking-[0.35em] uppercase text-brand-gold font-sans mb-2">
                  {member.role}
                </p>
                <h3 className="font-display text-2xl text-brand-stone mb-4 leading-tight">
                  {member.name}
                </h3>
                <p className="text-brand-muted text-sm leading-relaxed">
                  {member.spec}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-brand-border flex items-center justify-between">
                <span className="text-xs text-brand-muted">Experiência</span>
                <span className="text-brand-gold font-display text-lg">{member.years}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
