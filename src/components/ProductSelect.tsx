'use client'

import { useTranslations } from 'next-intl'
import { products } from '../data/products'

type ProductSelectProps = {
  productValue: string
  methodValue: string
  onProductChange: (value: string) => void
  onMethodChange: (value: string) => void
}

export default function ProductSelect({
  productValue,
  methodValue,
  onProductChange,
  onMethodChange,
}: ProductSelectProps) {
  const tp = useTranslations('products')
  const tm = useTranslations('methods')
  const tc = useTranslations('calculator')

  const selectedProduct = products.find((p) => p.value === productValue)

  const handleProductChange = (value: string) => {
    onProductChange(value)
    onMethodChange('')
  }

  return (
    <div className="flex flex-col gap-4">

      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase">
          {tc('product')}
        </label>
        <div className="relative">
          <select
            value={productValue}
            onChange={(e) => handleProductChange(e.target.value)}
            className="w-full bg-[#F2F2F7] rounded-2xl px-4 py-3.5 text-gray-800 text-base font-medium border border-transparent focus:outline-none focus:border-blue-400 focus:bg-white transition-all duration-200 appearance-none cursor-pointer"
          >
            {products.map((p) => (
              <option key={p.value} value={p.value}>
                {tp(p.value)}
              </option>
            ))}
          </select>
          <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase">
          {tc('cookingMethod')}
        </label>
        <div className="relative">
          <select
            value={methodValue}
            onChange={(e) => onMethodChange(e.target.value)}
            className="w-full bg-[#F2F2F7] rounded-2xl px-4 py-3.5 text-base font-medium border border-transparent focus:outline-none focus:border-blue-400 focus:bg-white transition-all duration-200 appearance-none cursor-pointer text-gray-800"
          >
            <option value="" disabled>{tc('selectMethod')}</option>
            {selectedProduct?.methods.map((m) => (
              <option key={m.value} value={m.value}>
                {tm(m.value)}
              </option>
            ))}
          </select>
          <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

    </div>
  )
}