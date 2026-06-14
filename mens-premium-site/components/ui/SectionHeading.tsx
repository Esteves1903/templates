import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow:   string
  title:     string
  subtitle?: string
  centered?: boolean
  id?:       string
}

export function SectionHeading({ eyebrow, title, subtitle, centered = false, id }: SectionHeadingProps) {
  return (
    <div className={cn('mb-14 lg:mb-20', centered && 'text-center')}>
      <p className="text-brand-gold text-xs tracking-[0.4em] uppercase font-sans mb-4">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="font-display text-4xl sm:text-5xl lg:text-6xl text-brand-stone leading-tight"
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn('mt-5 text-brand-muted leading-relaxed max-w-xl', centered && 'mx-auto')}>
          {subtitle}
        </p>
      )}
      <div className={cn('mt-8', centered ? 'flex justify-center' : '')}>
        <div className="h-px w-16 bg-brand-gold" />
      </div>
    </div>
  )
}
