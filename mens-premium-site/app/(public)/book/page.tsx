import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { BookingFlow } from '@/components/booking/BookingFlow'

export const metadata: Metadata = {
  title: 'Agendar',
  description:
    'Agende o seu serviço na Men\'s Premium em menos de 2 minutos. Escolha o serviço, data e hora.',
  robots: { index: false },
}

export default function BookPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <BookingFlow />
      </main>
    </>
  )
}
