import { createContext, useContext, useEffect, useState } from 'react'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'en'
    return window.localStorage.getItem('lang') || 'en'
  })

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    window.localStorage.setItem('lang', lang)
  }, [lang])

  const toggleLang = () => setLang((l) => (l === 'en' ? 'ar' : 'en'))

  // pick(obj, 'field') -> obj.field_ar if Arabic is selected and it's filled in, else obj.field
  const pick = (obj, field) => {
    if (!obj) return ''
    if (lang === 'ar' && obj[`${field}_ar`]) return obj[`${field}_ar`]
    return obj[field] || ''
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, pick }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
