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