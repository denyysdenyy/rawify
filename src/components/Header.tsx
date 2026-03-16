'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const languages = [
  { code: 'uk', label: 'Українська', flag: '🇺🇦' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
]

export default function Header() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const current = languages.find((l) => l.code === locale) ?? languages[0]

  const switchLocale = (code: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${code}`)
    router.push(newPath)
    setIsOpen(false)
  }

  return (
    <header className="w-full px-4 py-4 flex items-center justify-between max-w-lg mx-auto">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold tracking-tight text-gray-900">
          Rawify
        </span>
        <span className="text-xs text-gray-400 font-medium mt-0.5">beta</span>
      </div>

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex cursor-pointer items-center gap-2 bg-white rounded-full px-3 py-1.5 shadow-sm border border-gray-100 hover:border-gray-200 transition-all duration-200"
        >
          <span className="text-base">{current.flag}</span>
          <span className="text-sm font-medium text-gray-700">{current.label}</span>
          <motion.svg
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="w-4 h-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden z-50 min-w-[160px]"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => switchLocale(lang.code)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors duration-150 hover:bg-[#F2F2F7] ${
                    lang.code === locale ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                  {lang.code === locale && (
                    <span className="ml-auto text-blue-400">✓</span>
                  )}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}