import {addLocaleData} from 'react-intl'
import enLocaleData from 'react-intl/lib/locale-data/en'
import enMessages from './locales/en'

addLocaleData(enLocaleData)

export const currentLocale = process.env.APP_LOCALE || 'en'
export const messages = enMessages
