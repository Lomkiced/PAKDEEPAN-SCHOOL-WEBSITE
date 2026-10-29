"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

export type Locale = "en" | "th"

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  dict: any
  t: (keyPath: string, fallback?: string) => string
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  initialLocale?: Locale
  initialDict?: any
  children: React.ReactNode
}

const getClientInitialLocale = (defaultLoc: Locale): Locale => {
  if (typeof window === "undefined") return defaultLoc
  try {
    const stored = localStorage.getItem("pakdeepan_locale") as Locale | null
    if (stored === "th" || stored === "en") return stored
    const cookieMatch = document.cookie.match(/(?:^|;\s*)NEXT_LOCALE=([^;]+)/)
    if (cookieMatch && (cookieMatch[1] === "th" || cookieMatch[1] === "en")) {
      return cookieMatch[1] as Locale
    }
  } catch {
    // Ignore storage errors in restricted contexts
  }
  return defaultLoc
}

export function LanguageProvider({
  initialLocale = "en",
  initialDict = {},
  children,
}: LanguageProviderProps) {
  const router = useRouter()
  const [locale, setLocaleState] = React.useState<Locale>(() => getClientInitialLocale(initialLocale))
  const [dict, setDict] = React.useState<any>(initialDict)

  // Fetch updated dictionary when locale changes
  React.useEffect(() => {
    let isMounted = true
    async function loadDictionary() {
      try {
        if (locale === "th") {
          const mod = await import("@/dictionaries/th.json")
          if (isMounted) setDict(mod.default)
        } else {
          const mod = await import("@/dictionaries/en.json")
          if (isMounted) setDict(mod.default)
        }
      } catch (e) {
        console.error("Failed to load locale dictionary:", e)
      }
    }
    loadDictionary()
    return () => {
      isMounted = false
    }
  }, [locale])

  // Change locale handler with persistent storage & server cookie sync
  const setLocale = React.useCallback(
    (newLocale: Locale) => {
      if (newLocale === locale) return

      try {
        // 1. Persistent storage in localStorage
        localStorage.setItem("pakdeepan_locale", newLocale)

        // 2. Persistent storage in cookie for Server Components
        document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`

        // 3. Update HTML lang attribute
        document.documentElement.lang = newLocale

        // 4. Update React state
        setLocaleState(newLocale)

        // 5. Trigger Next.js router refresh for Server Component re-render
        router.refresh()
      } catch (e) {
        console.error("Error setting locale:", e)
      }
    },
    [locale, router]
  )

  // Dot-notation translation helper: e.g. t('admin.actions.saveChanges', 'Save Changes')
  const t = React.useCallback(
    (keyPath: string, fallback?: string): string => {
      if (!dict || typeof dict !== "object") return fallback || keyPath
      const parts = keyPath.split(".")
      let current: any = dict
      for (const part of parts) {
        if (current && typeof current === "object" && part in current) {
          current = current[part]
        } else {
          return fallback || keyPath
        }
      }
      return typeof current === "string" ? current : fallback || keyPath
    },
    [dict]
  )

  const value = React.useMemo(
    () => ({
      locale,
      setLocale,
      dict,
      t,
    }),
    [locale, setLocale, dict, t]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

const fallbackContext: LanguageContextType = {
  locale: "en",
  setLocale: () => {},
  dict: {},
  t: (keyPath: string, fallback?: string) => fallback || keyPath,
}

export function useLanguage() {
  const context = React.useContext(LanguageContext)
  if (!context) {
    return fallbackContext
  }
  return context
}
