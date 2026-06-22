import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata = {
  title: 'AutoPeças — Peças Automóveis',
  description: 'Loja de peças automóveis com vasta seleção para todas as marcas e modelos.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body className={inter.variable}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
