import { translations } from '../translations/translations'

export const getLocalizedPath = (language, routeKey) => {
  const route = translations[language]?.routes?.[routeKey] || routeKey
  return `/${language}${route ? `/${route}` : ''}`
}

export const getRouteKeyFromPath = (language, path) => {
  const routes = translations[language]?.routes || {}
  const pathWithoutLang = path.replace(`/${language}`, '') || '/'
  
  for (const [key, value] of Object.entries(routes)) {
    const fullRoute = value ? `/${value}` : ''
    if (pathWithoutLang === fullRoute) {
      return key
    }
  }
  return 'home'
}

export const translatePath = (currentPath, fromLang, toLang) => {
  const routeKey = getRouteKeyFromPath(fromLang, currentPath)
  return getLocalizedPath(toLang, routeKey)
}