import Image from 'next/image'
import { SectionHeading } from '@/components/ui/SectionHeading'

// Static base64 placeholder matching the brand-dark color (#111111)
const BRAND_DARK_BLUR_DATA_URL =
  'data:image/gif;base64,R0lGODlhAQABAPAAABEREP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='

const GALLERY_ITEMS = [
  { id: 1, label: 'Interior, Cadeiras',        aspect: 'aspect-[4/3]',  size: 'md:col-span-2', src: '/gallery/interior_chairs.webp' },
  { id: 2, label: 'Fachada, Entrada',           aspect: 'aspect-square', size: '',                      src: '/gallery/front_entrance.webp' },
  { id: 3, label: 'Receção, Logo',       aspect: 'aspect-[3/4]', size: '',                      src: '/gallery/reception_logo.webp' },
  { id: 4, label: 'Exterior, Noite', aspect: 'aspect-[4/3]', size: '',                      src: '/gallery/exterior_night.webp' },
  { id: 5, label: 'Interior, Ambiente',         aspect: 'aspect-square', size: 'md:col-span-2', src: '/gallery/interior_ambience.webp' },
  { id: 6, label: 'Detalhe, Serviço',           aspect: 'aspect-[3/4]', size: '',                      src: '/gallery/detail_service.webp' },
]

export function GallerySection() {
  return (
    <section className="section-padding bg-brand-dark border-t border-brand-border" id="galeria" aria-labelledby="galeria-heading">
      <div className="container-wide">
        <SectionHeading
          eyebrow="O Espaço"
          title="Galeria"
          subtitle="Um ambiente cuidado, pensado para a sua experiência."
          id="galeria-heading"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden ${item.aspect} ${item.size}`}
            >
              {/* Responsive Next.js Image with blur placeholder */}
              <Image
                src={item.src}
                alt={item.label}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                placeholder="blur"
                blurDataURL={BRAND_DARK_BLUR_DATA_URL}
                loading="lazy"
              />

              {/* Subtle noise texture */}
              <div className="absolute inset-0 opacity-30 bg-noise mix-blend-overlay pointer-events-none" aria-hidden="true" />

              {/* Gold corner accent */}
              <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-brand-gold/40 transition-all duration-300 group-hover:w-16 group-hover:h-16 group-hover:border-brand-gold pointer-events-none" aria-hidden="true" />
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-brand-gold/40 transition-all duration-300 group-hover:w-16 group-hover:h-16 group-hover:border-brand-gold pointer-events-none" aria-hidden="true" />

              {/* Label overlay */}
              <div className="absolute inset-0 flex items-end p-5 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="text-brand-stone text-xs tracking-widest uppercase font-sans">
                  {item.label}
                </span>
              </div>

              {/* Number */}
              <div className="absolute top-4 right-5 pointer-events-none">
                <span className="font-display text-5xl font-bold text-brand-gold/10 group-hover:text-brand-gold/20 transition-colors">
                  0{item.id}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-brand-muted/60 text-xs tracking-widest uppercase mt-8">
          Fotografias do espaço Exemplo
        </p>
      </div>
    </section>
  )
}
