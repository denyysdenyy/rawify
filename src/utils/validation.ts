import { ProductCategory } from '../data/products'

type ValidationResult = {
  valid: boolean
  error?: string
}

const ranges: Record<ProductCategory, { min: number; max: number; label: string }> = {
  meat: {
    min: 1.15,
    max: 1.75,
    label: 'М\'ясо втрачає 15–43% ваги при готовці',
  },
  fish: {
    min: 1.10,
    max: 1.50,
    label: 'Риба втрачає 10–33% ваги при готовці',
  },
  eggs: {
    min: 0.95,
    max: 1.10,
    label: 'Яйця майже не змінюють вагу (до 10%)',
  },
  grains: {
    min: 0.25,
    max: 0.55,
    label: 'Крупи набирають вагу в 2–4 рази при варці',
  },
}

export function validateCoefficient(
  category: ProductCategory,
  rawWeight: number,
  cookedWeight: number
): ValidationResult {
  const coefficient = rawWeight / cookedWeight
  const range = ranges[category]

  if (coefficient < range.min || coefficient > range.max) {
    const lossPercent = Math.round((1 - cookedWeight / rawWeight) * 100)
    const gainPercent = Math.round((cookedWeight / rawWeight - 1) * 100)

    if (category === 'grains') {
      return {
        valid: false,
        error: `Помилка: Для круп вага має збільшуватись у 2–4 рази. Ви ввели ${gainPercent > 0 ? `+${gainPercent}%` : `${lossPercent}% втрат`}. Перевірте категорію або ваги.`,
      }
    }

    return {
      valid: false,
      error: `Помилка: ${range.label}. Ви ввели ${lossPercent > 0 ? `${lossPercent}% втрат` : `+${Math.abs(lossPercent)}% приросту`}. Перевірте категорію або ваги.`,
    }
  }

  return { valid: true }
}