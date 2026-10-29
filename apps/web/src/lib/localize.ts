export type Locale = 'en' | 'th'

/**
 * Extracts a localized string or value from a record.
 * Handles:
 * 1. Dedicated bilingual suffix fields: fieldName_th / fieldNameTh / fieldName_en / fieldNameEn
 * 2. Nested localization objects: record[fieldName] = { en: "...", th: "..." }
 * 3. Base field fallback: record[fieldName]
 */
export function localizeData<T = any>(
  record: any,
  fieldName: string,
  lang: Locale = 'en',
  fallback?: T
): T {
  if (!record || typeof record !== 'object') return (fallback ?? '') as unknown as T

  const directVal = record[fieldName]

  // If the field is an object with { en: '...', th: '...' }
  if (directVal && typeof directVal === 'object' && !Array.isArray(directVal)) {
    if (lang === 'th') {
      if (directVal.th) return directVal.th as T
      if (fallback) return fallback
      return '' as unknown as T
    }
    if (directVal.en) return directVal.en as T
    if (fallback) return fallback
    return (directVal.th ?? '') as T
  }

  // Check specific locale keys
  if (lang === 'th') {
    const valTh =
      record[`${fieldName}_th`] ??
      record[`${fieldName}Th`] ??
      record[`${fieldName}_TH`]
    if (valTh !== undefined && valTh !== null && valTh !== '') {
      return valTh as T
    }
    // If fallback was explicitly provided, return it; otherwise return ''
    // so caller's `|| fallback` in JSX or JS expression executes correctly!
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
    return valEn as T
  }
  if (directVal !== undefined && directVal !== null && directVal !== '') {
    return directVal as T
  }
  if (fallback !== undefined && fallback !== null && fallback !== ('' as unknown as T)) {
    return fallback
  }
  return '' as unknown as T
}

/**
 * Helper to localize a value that might be a string or a { en, th } object.
 */
export function localizeValue<T = any>(
  value: any,
  lang: Locale = 'en',
  fallback: T = '' as unknown as T
): T {
  if (value === undefined || value === null) return fallback
  if (typeof value === 'object' && !Array.isArray(value)) {
    if (lang === 'th') {
      return (value.th || value.en || fallback) as T
    }
    return (value.en || value.th || fallback) as T
  }
  return value as T
}

