import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import DeviceInfo from 'react-native-device-info';
import locales from '../assets/locales/index';

i18n
  .use(initReactI18next)
  .use({
    init: Function.prototype,
    type: 'languageDetector',
    detect: DeviceInfo.getDeviceLocale,
    cacheUserLanguage: Function.prototype,
  })
  .init({
    nsSeparator: false,
    keySeparator: false,
    fallbackLng: false,
    resources: locales,
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
  });

export default i18n;
