'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import type { LogEntry } from './AppContent'

type Props = {
  entries: LogEntry[]
  onRemove: (id: string) => void
  onClearAll: () => void
}

function toDateKey(ts: number): string {
  // YYYY-MM-DD in local time — stable grouping key
  const d = new Date(ts)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

type DayGroup = { dateKey: string; label: string; entries: LogEntry[] }

function groupByDay(entries: LogEntry[], todayLabel: string, yesterdayLabel: string, locale: string): DayGroup[] {
  const today = toDateKey(Date.now())
  const yesterday = toDateKey(Date.now() - 86400000)

  const map: Record<string, LogEntry[]> = {}
  for (const entry of entries) {
    const key = toDateKey(entry.savedAt)
    if (!map[key]) map[key] = []
    map[key].push(entry)
  }

  return Object.entries(map)
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([dateKey, groupEntries]) => {
      let label: string
      if (dateKey === today) label = todayLabel
      else if (dateKey === yesterday) label = yesterdayLabel
      else label = new Date(dateKey).toLocaleDateString(locale, { day: 'numeric', month: 'short' })
      return { dateKey, label, entries: groupEntries }
    })
}

export default function FoodLog({ entries, onRemove, onClearAll }: Props) {
  const t = useTranslations('log')
  const tProducts = useTranslations('products')
  const tMethods = useTranslations('methods')
  const locale = useLocale()

  const groups = groupByDay(entries, t('today'), t('yesterday'), locale)

  return (
    <div className="w-full max-w-lg px-4 pb-8">
      <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col gap-4">

        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase">
            {t('title')}
          </span>
          <button
            onClick={onClearAll}
            className="text-xs text-gray-400 hover:text-red-400 transition-colors duration-200"
          >
            {t('clearAll')}
          </button>
        </div>

        {groups.map((group) => (
          <div key={group.dateKey} className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-gray-400 px-1">
              {group.label}
            </span>
            <AnimatePresence initial={false}>
              {group.entries.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-3 bg-[#F2F2F7] rounded-2xl px-4 py-3">
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-sm font-semibold text-gray-800 truncate">
                        {tProducts(entry.productKey)}
                        {entry.methodKey && (
                          <span className="font-normal text-gray-400"> · {tMethods(entry.methodKey)}</span>
                        )}
                      </span>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500">{Math.round(entry.cookedPortion)}{t('gCooked')}</span>
                        <span className="text-gray-300">→</span>
                        <span className="font-bold text-gray-800">{Math.round(entry.rawToLog)}{t('gRaw')}</span>
                      </div>
                      <span className="text-xs text-gray-400">{formatTime(entry.savedAt)}</span>
                    </div>
                    <button
                      onClick={() => onRemove(entry.id)}
                      className="text-gray-300 hover:text-red-400 transition-colors duration-200 mt-0.5 shrink-0"
                      aria-label="Remove"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ))}

      </div>
    </div>
  )
}
