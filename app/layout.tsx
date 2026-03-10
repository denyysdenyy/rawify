import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Rawify — рахуй сире, їж готове',
  description: 'Калькулятор для перерахунку ваги готового продукту в сирий. Для коректного запису БЖУ у FatSecret.',
  keywords: ['БЖУ', 'калории', 'FatSecret', 'коефіцієнт ужарки', 'сира вага'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk">
      <body className={`${inter.className} bg-[#F2F2F7] min-h-screen`}>
        {children}
      </body>
    </html>
  )
}