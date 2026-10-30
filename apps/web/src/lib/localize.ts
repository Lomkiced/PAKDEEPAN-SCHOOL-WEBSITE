import { extractPlainText, type SupportedLocale } from "./richText"

export type Locale = "en" | "th"
export { extractPlainText }

/**
 * Extracts a localized string or value from a record.
 * Handles:
 * 1. Dedicated bilingual suffix fields: fieldName_th / fieldNameTh / fieldName_en / fieldNameEn
 * 2. Nested localization objects: record[fieldName] = { en: "...", th: "..." }
 * 3. Payload CMS Lexical RichText AST objects: { root: { children: [...] } }
 * 4. Base field fallback: record[fieldName]
 */
export function localizeData<T = any>(
  record: any,
  fieldName: string,
  lang: Locale = 'en',
  fallback?: T
): T {
  if (!record || typeof record !== 'object') return (fallback ?? '') as unknown as T

  const directVal = record[fieldName]

  // If the direct value is a Lexical RichText node
  if (directVal && typeof directVal === 'object' && directVal.root) {
    const extracted = extractPlainText(directVal, lang as SupportedLocale)
    if (extracted) return extracted as unknown as T
    if (fallback !== undefined && fallback !== null) return fallback
    return '' as unknown as T
  }

  // If the field is an object with { en: '...', th: '...' }
  if (directVal && typeof directVal === 'object' && !Array.isArray(directVal)) {
    if (lang === 'th') {
      if (directVal.th) {
        return (typeof directVal.th === 'object' ? extractPlainText(directVal.th, 'th') : directVal.th) as T
      }
      if (fallback) return fallback
      return '' as unknown as T
    }
    if (directVal.en) {
      return (typeof directVal.en === 'object' ? extractPlainText(directVal.en, 'en') : directVal.en) as T
    }
    if (fallback) return fallback
    return (directVal.th ? (typeof directVal.th === 'object' ? extractPlainText(directVal.th, 'th') : directVal.th) : '') as T
  }

  // Check specific locale keys
  if (lang === 'th') {
    const valTh =
      record[`${fieldName}_th`] ??
      record[`${fieldName}Th`] ??
      record[`${fieldName}_TH`]
    if (valTh !== undefined && valTh !== null && valTh !== '') {
      return (typeof valTh === 'object' ? extractPlainText(valTh, 'th') : valTh) as T
    }
    if (fallback !== undefined && fallback !== null && fallback !== ('' as unknown as T)) {
      return fallback
    }
    return '' as unknown as T
  }

  // lang === 'en'
  const valEn =
    record[`${fieldName}_en`] ??
    record[`${fieldName}En`] ??
    record[`${fieldName}_EN`]
  if (valEn !== undefined && valEn !== null && valEn !== '') {
    return (typeof valEn === 'object' ? extractPlainText(valEn, 'en') : valEn) as T
  }
  if (directVal !== undefined && directVal !== null && directVal !== '') {
    return (typeof directVal === 'object' ? extractPlainText(directVal, 'en') : directVal) as T
  }
  if (fallback !== undefined && fallback !== null && fallback !== ('' as unknown as T)) {
    return fallback
  }
  return '' as unknown as T
}

/**
 * Helper to localize a value that might be a string, a { en, th } object, or Lexical RichText.
 */
export function localizeValue<T = any>(
  value: any,
  lang: Locale = 'en',
  fallback: T = '' as unknown as T
): T {
  if (value === undefined || value === null) return fallback
  if (typeof value === 'object') {
    if (value.root) {
      return (extractPlainText(value, lang as SupportedLocale) || fallback) as unknown as T
    }
    if (!Array.isArray(value)) {
      if (lang === 'th') {
        const val = value.th || value.en || fallback
        return (typeof val === 'object' ? extractPlainText(val, 'th') : val) as T
      }
      const val = value.en || value.th || fallback
      return (typeof val === 'object' ? extractPlainText(val, 'en') : val) as T
    }
  }
  return value as T
}

