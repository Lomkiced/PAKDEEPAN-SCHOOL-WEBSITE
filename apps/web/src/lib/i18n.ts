import "server-only"

const dictionaries = {
  en: () => import("../dictionaries/en.json").then((module) => module.default),
  th: () => import("../dictionaries/th.json").then((module) => module.default),
}

export const getDictionary = async (locale: 'en' | 'th') => {
  if (typeof dictionaries[locale] === 'function') {
    return dictionaries[locale]();
  }
  return dictionaries['en']();
}
