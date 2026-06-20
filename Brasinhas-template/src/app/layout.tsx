import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { FireBackground } from "@/components/ui/FireBackground";
import { BackToTop } from "@/components/ui/BackToTop";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Churrasqueira O Brasinhas 3 - Rio Tinto",
  description: "O melhor churrasco e francesinhas em Rio Tinto. Visite-nos na R. Fernão de Magalhães 89.",
  keywords: ["churrasqueira", "francesinha", "rio tinto", "restaurante", "brasinhas"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-PT"
      className={`${inter.variable} ${playfair.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col relative text-foreground">
        <FireBackground />
        <main id="main-content" className="flex-1 z-10 flex flex-col">
          {children}
        </main>
        <BackToTop />
      </body>
    </html>
  );
}
