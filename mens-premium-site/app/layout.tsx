import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://exemplo.pt'),
  title: {
    default: "Exemplo | Barbearia e Imagem Pessoal",
    template: "%s | Exemplo",
  },
  description:
    'Men\'s Premium — barbearia premium com várias localizações em Portugal. Cortes de cabelo, barba e tratamentos masculinos exclusivos, só por marcação.',
  keywords: ['barbearia', 'barbearia porto', "men's premium", 'barbeiro', 'barba', 'corte cabelo', 'barbearia imagem pessoal'],
  openGraph: {
    title: "Exemplo",
    description: 'Barbearia e Imagem Pessoal. Só por marcação.',
    locale: 'pt_PT',
    type: 'website',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  )
}
