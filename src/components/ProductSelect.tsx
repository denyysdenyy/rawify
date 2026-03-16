'use client'

import { useTranslations } from 'next-intl'

export type ProductCategory = 'meat' | 'fish' | 'eggs' | 'grains'

export type Product = {
  value: string
  label: string
  category: ProductCategory
  methods: {
    value: string
    label: string
    coefficient: number
  }[]
}

export const products: Product[] = [
  {
    value: 'chicken_breast',
    label: 'chicken_breast',
    category: 'meat',
    methods: [
      { value: 'grill', label: 'grill', coefficient: 0.60 },
      { value: 'oven', label: 'oven', coefficient: 0.75 },
      { value: 'boil', label: 'boil', coefficient: 0.80 },
      { value: 'foil', label: 'foil', coefficient: 0.85 },
    ],
  },
  {
    value: 'chicken_thigh',
    label: 'chicken_thigh',
    category: 'meat',
    methods: [
      { value: 'grill', label: 'grill', coefficient: 0.60 },
      { value: 'oven', label: 'oven', coefficient: 0.70 },
      { value: 'boil', label: 'boil', coefficient: 0.75 },
    ],
  },
  {
    value: 'beef',
    label: 'beef',
    category: 'meat',
    methods: [
      { value: 'grill', label: 'grill', coefficient: 0.60 },
      { value: 'oven', label: 'oven', coefficient: 0.65 },
      { value: 'boil', label: 'boil', coefficient: 0.70 },
    ],
  },
  {
    value: 'pork',
    label: 'pork',
    category: 'meat',
    methods: [
      { value: 'grill', label: 'grill', coefficient: 0.62 },
      { value: 'oven', label: 'oven', coefficient: 0.68 },
      { value: 'boil', label: 'boil', coefficient: 0.72 },
    ],
  },
  {
    value: 'salmon',
    label: 'salmon',
    category: 'fish',
    methods: [
      { value: 'grill', label: 'grill', coefficient: 0.75 },
      { value: 'oven', label: 'oven', coefficient: 0.80 },
      { value: 'steam', label: 'steam', coefficient: 0.85 },
    ],
  },
  {
    value: 'tuna',
    label: 'tuna',
    category: 'fish',
    methods: [
      { value: 'grill', label: 'grill', coefficient: 0.70 },
      { value: 'oven', label: 'oven', coefficient: 0.75 },
    ],
  },
  {
    value: 'eggs',
    label: 'eggs',
    category: 'eggs',
    methods: [
      { value: 'boil', label: 'boil', coefficient: 0.90 },
      { value: 'fry', label: 'fry', coefficient: 0.85 },
    ],
  },
  {
    value: 'rice',
    label: 'rice',
    category: 'grains',
    methods: [
      { value: 'boil', label: 'boil', coefficient: 2.50 },
      { value: 'boil_soft', label: 'boil_soft', coefficient: 3.00 },
    ],
  },
  {
    value: 'buckwheat',
    label: 'buckwheat',
    category: 'grains',
    methods: [
      { value: 'boil', label: 'boil', coefficient: 2.70 },
      { value: 'steam', label: 'steam', coefficient: 2.00 },
    ],
  },
  {
    value: 'oats',
    label: 'oats',
    category: 'grains',
    methods: [
      { value: 'water', label: 'water', coefficient: 2.50 },
      { value: 'milk', label: 'milk', coefficient: 2.20 },
    ],
  },
]

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

      {/* Продукт */}
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

      {/* Спосіб приготування */}
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