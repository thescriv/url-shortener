import * as i18n from 'i18next'

import config from '../config'

i18n.init({
  supportedLngs: ['en', 'fr'],
  resources: {
    fr: {
      translation: {
        ...require('../locales/fr.json')
      }
    },
    en: {
      translation: {
        ...require('../locales/en.json')
      }
    }
  }
})

export default function translate(input: string, options = { lng: 'en' }) {
  if (config.ENABLE_I18N_TRANSLATION) {
    return i18n.t(input, options)
  }

  return input
}
