import { NativeModules } from 'react-native';
import * as ReactNative from 'react-native';

NativeModules.RNShare = {

};

NativeModules.RNCStatusBarManager = {
  HEIGHT: 42,
  setColor: jest.fn(),
  setStyle: jest.fn(),
  setHidden: jest.fn(),
  setNetworkActivityIndicatorVisible: jest.fn(),
  setBackgroundColor: jest.fn(),
  setTranslucent: jest.fn(),
};

jest.mock('react-native-fs', () => ({
  downloadFile: jest.fn(),
}));

jest.doMock('react-native', () => Object.setPrototypeOf(
  {
    Platform: {
      OS: 'android',
      select: () => {},
    },
    NativeModules: {
      ...ReactNative.NativeModules,
      RNFBAppModule: {
        NATIVE_FIREBASE_APPS: [
          {
            appConfig: {
              name: '[DEFAULT]',
            },
            options: {},
          },

          {
            appConfig: {
              name: 'secondaryFromNative',
            },
            options: {},
          },
        ],
      },
      RNFBPerfModule: {},
      RNFBAdMobModule: {},
      RNFBAdMobInterstitialModule: {},
      RNFBAdMobRewardedModule: {},
      RNFBAdsConsentModule: {},
      RNFBCrashlyticsModule: {},
    },
  },
  ReactNative,
));
