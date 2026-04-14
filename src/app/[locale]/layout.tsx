import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import '../globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

const metaByLocale: Record<string, Metadata> = {
  uk: {
    title: 'Rawify — рахуй сире, їж готове',
    description: 'Калькулятор для перерахунку ваги готового продукту в сирий.',
  },
  en: {
    title: 'Rawify — track raw, eat cooked',
    description: 'Calculator to convert cooked food weight back to raw for accurate calorie tracking.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return metaByLocale[locale] ?? metaByLocale.uk
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const messages = await getMessages({ locale })

  return (
    <html lang={locale}>
      <body className={`${inter.className} bg-[#F2F2F7] min-h-screen`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}