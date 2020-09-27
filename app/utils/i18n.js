import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import DeviceInfo from 'react-native-device-info';
import locales from '../assets/locales/index';
import {getLocales} from 'react-native-localize';

i18n
  .use(initReactI18next)
  .init({
    lng: getLocales()[0].languageCode,
    nsSeparator: false,
    keySeparator: false,
    fallbackLng: false,
    resources: locales,
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
  });

export default i18n;
