/**
 * Enterprise Thai Baht Currency Formatter & Calculator
 * Official standards for Pakdeepan Kindergarten School
 */

export type CurrencyLocale = 'th' | 'en'

export interface FormatCurrencyOptions {
  locale?: CurrencyLocale
  showCode?: boolean // Display 'THB' instead of '฿'
  decimals?: number // Default 0 for clean amounts (e.g., ฿25,000), or 2 for itemized invoices
}

/**
 * Format any numerical amount into official Thai Baht (฿ / THB)
 */
export function formatTHB(
  amount: number | null | undefined,
  options: FormatCurrencyOptions = {}
): string {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return options.locale === 'th' ? '฿0' : 'THB 0'
  }

  const { locale = 'th', showCode = false, decimals = 0 } = options

  if (showCode) {
    return new Intl.NumberFormat(locale === 'th' ? 'th-TH' : 'en-US', {
      style: 'currency',
      currency: 'THB',
      currencyDisplay: 'code',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(amount)
  }

  return new Intl.NumberFormat(locale === 'th' ? 'th-TH' : 'en-US', {
    style: 'currency',
    currency: 'THB',
    currencyDisplay: 'narrowSymbol', // Resolves to '฿'
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount)
}

/**
 * Formats a fee with its billing interval in either Thai or English
 * e.g., "฿25,000 / ภาคเรียน" or "฿25,000 / term"
 */
export function formatFeeWithInterval(
  amount: number,
  interval: 'term' | 'year' | 'month' | 'one-time',
  locale: CurrencyLocale = 'th'
): string {
  const formatted = formatTHB(amount, { locale })

  const intervals: Record<string, { th: string; en: string }> = {
    term: { th: '/ ภาคเรียน', en: '/ term' },
    year: { th: '/ ปีการศึกษา', en: '/ academic year' },
    month: { th: '/ เดือน', en: '/ month' },
    'one-time': { th: ' (ชำระครั้งเดียว)', en: ' (one-time)' },
  }

  const label = intervals[interval]?.[locale] || ''
  return `${formatted} ${label}`
}

/**
 * Convert numeric Thai Baht amount to formal Thai text (e.g. 25000 -> สองหมื่นห้าพันบาทถ้วน)
 * Used on official school tuition breakdowns, invoices, and admission confirmations.
 */
export function thbToThaiText(num: number): string {
  if (isNaN(num) || num === 0) return 'ศูนย์บาทถ้วน'

  const numbers = ['', 'หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า']
  const positions = ['', 'สิบ', 'ร้อย', 'พัน', 'หมื่น', 'แสน', 'ล้าน']

  const intPart = Math.floor(Math.abs(num))
  const digits = intPart.toString().split('').map(Number)
  const len = digits.length

  let result = ''

  for (let i = 0; i < len; i++) {
    const digit = digits[i]
    const pos = len - i - 1

    if (digit === 0) continue

    if (pos % 6 === 1 && digit === 1) {
      result += 'สิบ'
    } else if (pos % 6 === 1 && digit === 2) {
      result += 'ยี่สิบ'
    } else if (pos % 6 === 0 && digit === 1 && len > 1 && digits[i - 1] !== 0) {
      result += 'เอ็ด'
    } else {
      result += numbers[digit] + positions[pos % 6]
    }

    if (pos >= 6 && pos % 6 === 0) {
      result += 'ล้าน'
    }
  }

  return `${result}บาทถ้วน`
}
