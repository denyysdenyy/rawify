'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import WeightInput from './WeightInput'
import ProductSelect, { products } from './ProductSelect'
import { validateCoefficient } from '../utils/validation'

export default function Calculator() {
  const t = useTranslations('calculator')

  const [product, setProduct] = useState('chicken_breast')
  const [method, setMethod] = useState('')
  const [rawWeight, setRawWeight] = useState('')
  const [cookedWeight, setCookedWeight] = useState('')
  const [mode, setMode] = useState<'containers' | 'portion'>('containers')
  const [containers, setContainers] = useState('')
  const [portion, setPortion] = useState('')

  const isBaseReady = rawWeight.trim() !== '' && cookedWeight.trim() !== ''
  const isDirty = rawWeight || cookedWeight || containers || portion

  const raw = parseFloat(rawWeight)
  const cooked = parseFloat(cookedWeight)

  const handleProductChange = (value: string) => {
    setProduct(value)
    setMethod('')
    setRawWeight('')
    setCookedWeight('')
    setContainers('')
    setPortion('')
  }

  const handleReset = () => {
    setMethod('')
    setRawWeight('')
    setCookedWeight('')
    setContainers('')
    setPortion('')
  }

  const getCoefficient = (): number => {
    if (raw > 0 && cooked > 0) return raw / cooked
    const selectedProduct = products.find((p) => p.value === product)
    const selectedMethod = selectedProduct?.methods.find((m) => m.value === method)
    return selectedMethod?.coefficient ?? 1
  }

  const coefficient = getCoefficient()

  const getValidationError = (): string | null => {
    if (!isBaseReady || raw <= 0 || cooked <= 0) return null
    const selectedProduct = products.find((p) => p.value === product)
    if (!selectedProduct) return null
    const result = validateCoefficient(selectedProduct.category, raw, cooked)
    return result.valid ? null : result.error ?? null
  }

  const validationError = getValidationError()

  const calculate = (): { cookedPortion: number; rawToLog: number } | null => {
    if (validationError) return null

    if (mode === 'containers') {
      const count = parseFloat(containers)
      if (!count || count <= 0 || !isBaseReady) return null
      const cookedPortion = cooked / count
      return { cookedPortion, rawToLog: cookedPortion * coefficient }
    }

    if (mode === 'portion') {
      const p = parseFloat(portion)
      if (!p || p <= 0) return null
      return { cookedPortion: p, rawToLog: p * coefficient }
    }

    return null
  }

  const result = calculate()

  return (
    <div className="w-full max-w-lg px-4 pb-8">
      <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col gap-6">

        {/* Результат */}
        <div className="flex flex-col items-center gap-3 pb-4 border-b border-gray-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={result ? Math.round(result.rawToLog) : 'empty'}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="flex items-baseline gap-2"
            >
              <span className="text-5xl font-bold text-gray-800">
                {result ? Math.round(result.rawToLog) : '—'}
              </span>
              <span className="text-2xl text-gray-300 font-medium">
                {result ? t('result') : t('resultEmpty')}
              </span>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 bg-[#F2F2F7] rounded-2xl px-4 py-2"
              >
                <span className="text-sm text-gray-400">{t('inContainer')}</span>
                <span className="text-sm font-bold text-gray-700">
                  {Math.round(result.cookedPortion)} г
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {isBaseReady && !validationError && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-blue-400 font-medium"
            >
              {t('coefficient')}: {coefficient.toFixed(3)}
            </motion.span>
          )}
        </div>

        {/* Ошибка валидации */}
        <AnimatePresence>
          {validationError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex gap-3 bg-red-50 border border-red-100 rounded-2xl px-4 py-3"
            >
              <span className="text-lg">⚠️</span>
              <p className="text-sm text-red-500 font-medium leading-snug">
                {validationError}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Форма */}
        <ProductSelect
          productValue={product}
          methodValue={method}
          onProductChange={handleProductChange}
          onMethodChange={setMethod}
        />

        <WeightInput
          label={t('rawWeight')}
          placeholder={t('rawPlaceholder')}
          value={rawWeight}
          onChange={setRawWeight}
        />

        <WeightInput
          label={t('cookedWeight')}
          placeholder={t('cookedPlaceholder')}
          value={cookedWeight}
          onChange={setCookedWeight}
        />

        {/* Режим порції */}
        <div className={`flex flex-col gap-3 transition-opacity duration-200 ${!isBaseReady ? 'opacity-30 pointer-events-none' : ''}`}>
          <span className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase">
            {t('portionMode')}
          </span>
          <div className="flex rounded-2xl overflow-hidden border border-gray-100">
            <button
              onClick={() => setMode('containers')}
              className={`flex-1 py-3 text-sm font-medium transition-all duration-200 ${
                mode === 'containers' ? 'bg-gray-800 text-white' : 'bg-[#F2F2F7] text-gray-400'
              }`}
            >
              {t('byContainers')}
            </button>
            <button
              onClick={() => setMode('portion')}
              className={`flex-1 py-3 text-sm font-medium transition-all duration-200 ${
                mode === 'portion' ? 'bg-gray-800 text-white' : 'bg-[#F2F2F7] text-gray-400'
              }`}
            >
              {t('byPortion')}
            </button>
          </div>

          {mode === 'containers' ? (
            <WeightInput
              label={t('containersLabel')}
              placeholder={t('containersPlaceholder')}
              value={containers}
              onChange={setContainers}
              disabled={!isBaseReady}
              suffix=""
            />
          ) : (
            <WeightInput
              label={t('portionLabel')}
              placeholder={t('portionPlaceholder')}
              value={portion}
              onChange={setPortion}
              disabled={!isBaseReady}
            />
          )}
        </div>

        {/* Reset */}
        <AnimatePresence>
          {isDirty && (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              onClick={handleReset}
              className="w-full py-3 rounded-2xl text-sm font-medium text-gray-400 bg-[#F2F2F7] hover:bg-red-50 hover:text-red-400 transition-all duration-200"
            >
              {t('reset')}
            </motion.button>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}