import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const STORAGE_KEY = 'locale'
const DEFAULT_LOCALE = 'en'

const locale = localStorage && localStorage.getItem(STORAGE_KEY)
  ? localStorage.getItem(STORAGE_KEY)
  : DEFAULT_LOCALE

VueI18n.prototype.setLocale = function (locale) {
  this.locale = locale
  localStorage.setItem(STORAGE_KEY, locale)
}

const i18n = new VueI18n({
  locale,
  fallbackLocale: locale,
  silentFallbackWarn: true,
  messages: {
    ...require('./resources').default,
  },
})

export { i18n }