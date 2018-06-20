import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import i18nextReactNative from 'i18next-react-native-language-detector';
import locales from '../assets/locales/index';

i18n
  .use(reactI18nextModule)
  .use(i18nextReactNative)
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
