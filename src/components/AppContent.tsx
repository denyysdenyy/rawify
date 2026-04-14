'use client'

import { useState, useEffect } from 'react'
import Calculator from './Calculator'
import FoodLog from './FoodLog'

export type LogEntry = {
  id: string
  productKey: string
  methodKey: string
  cookedPortion: number
  rawToLog: number
  savedAt: number
}

const STORAGE_KEY = 'rawify_log'

export default function AppContent() {
  const [entries, setEntries] = useState<LogEntry[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setEntries(JSON.parse(stored))
    } catch {}
  }, [])

  const persist = (next: LogEntry[]) => {
    setEntries(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {}
  }

  const addEntry = (data: Omit<LogEntry, 'id' | 'savedAt'>) => {
    persist([
      { ...data, id: crypto.randomUUID(), savedAt: Date.now() },
      ...entries,
    ])
  }

  const removeEntry = (id: string) => {
    persist(entries.filter((e) => e.id !== id))
  }

  const clearAll = () => persist([])

  return (
    <>
      <Calculator onSave={addEntry} />
      {entries.length > 0 && (
        <FoodLog entries={entries} onRemove={removeEntry} onClearAll={clearAll} />
      )}
    </>
  )
}
