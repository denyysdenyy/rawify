'use client'

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
    label: '🍗 Куряча грудка',
    category: 'meat',
    methods: [
      { value: 'grill', label: 'Гриль / Сковорода', coefficient: 0.60 },
      { value: 'oven', label: 'Духовка', coefficient: 0.75 },
      { value: 'boil', label: 'Варка', coefficient: 0.80 },
      { value: 'foil', label: 'У фользі', coefficient: 0.85 },
    ],
  },
  {
    value: 'chicken_thigh',
    label: '🍗 Куряче стегно',
    category: 'meat',
    methods: [
      { value: 'grill', label: 'Гриль / Сковорода', coefficient: 0.60 },
      { value: 'oven', label: 'Духовка', coefficient: 0.70 },
      { value: 'boil', label: 'Варка', coefficient: 0.75 },
    ],
  },
  {
    value: 'beef',
    label: '🥩 Яловичина',
    category: 'meat',
    methods: [
      { value: 'grill', label: 'Гриль / Сковорода', coefficient: 0.60 },
      { value: 'oven', label: 'Духовка', coefficient: 0.65 },
      { value: 'boil', label: 'Варка', coefficient: 0.70 },
    ],
  },
  {
    value: 'pork',
    label: '🥩 Свинина',
    category: 'meat',
    methods: [
      { value: 'grill', label: 'Гриль / Сковорода', coefficient: 0.62 },
      { value: 'oven', label: 'Духовка', coefficient: 0.68 },
      { value: 'boil', label: 'Варка', coefficient: 0.72 },
    ],
  },
  {
    value: 'salmon',
    label: '🐟 Лосось',
    category: 'fish',
    methods: [
      { value: 'grill', label: 'Гриль / Сковорода', coefficient: 0.75 },
      { value: 'oven', label: 'Духовка', coefficient: 0.80 },
      { value: 'steam', label: 'Пара', coefficient: 0.85 },
    ],
  },
  {
    value: 'rice',
    label: '🍚 Рис',
    category: 'grains',
    methods: [
      { value: 'boil', label: 'Варка (розсипчастий)', coefficient: 2.50 },
      { value: 'boil_soft', label: 'Варка (розварений)', coefficient: 3.00 },
    ],
  },
  {
    value: 'buckwheat',
    label: '🌾 Гречка',
    category: 'grains',
    methods: [
      { value: 'boil', label: 'Варка', coefficient: 2.70 },
      { value: 'steam', label: 'Запарена', coefficient: 2.00 },
    ],
  },
  {
    value: 'oats',
    label: '🌾 Вівсянка',
    category: 'grains',
    methods: [
      { value: 'water', label: 'На воді', coefficient: 2.50 },
      { value: 'milk', label: 'На молоці', coefficient: 2.20 },
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
          Продукт
        </label>
        <div className="relative">
          <select
            value={productValue}
            onChange={(e) => handleProductChange(e.target.value)}
            className="w-full bg-[#F2F2F7] rounded-2xl px-4 py-3.5 text-gray-800 text-base font-medium border border-transparent focus:outline-none focus:border-blue-400 focus:bg-white transition-all duration-200 appearance-none cursor-pointer"
          >
            {products.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
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
          Спосіб приготування
        </label>
        <div className="relative">
          <select
            value={methodValue}
            onChange={(e) => onMethodChange(e.target.value)}
            className="w-full bg-[#F2F2F7] rounded-2xl px-4 py-3.5 text-base font-medium border border-transparent focus:outline-none focus:border-blue-400 focus:bg-white transition-all duration-200 appearance-none cursor-pointer text-gray-800"
          >
            <option value="" disabled>Оберіть спосіб приготування</option>
            {selectedProduct?.methods.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
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