import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './i18nResources/en';

const my18n = i18n.use(initReactI18next).init({
  resources: {
    en,
  },

  fallbackLng: 'en',

  // have a common namespace used around the full app
  ns: ['translations'],
  defaultNS: 'translations',
  debug: false,

  interpolation: {
    escapeValue: false,
  },

  react: {
    wait: true
  }
});

export default my18n;
