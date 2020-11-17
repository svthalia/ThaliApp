import { NativeModules } from 'react-native';
import * as ReactNative from 'react-native';
import 'react-native-gesture-handler/jestSetup';

NativeModules.RNShare = {};

NativeModules.RNCStatusBarManager = {
  HEIGHT: 42,
  setColor: jest.fn(),
  setStyle: jest.fn(),
  setHidden: jest.fn(),
  setNetworkActivityIndicatorVisible: jest.fn(),
  setBackgroundColor: jest.fn(),
  setTranslucent: jest.fn(),
};

jest.mock('react-native-reanimated', () => {
  // eslint-disable-next-line global-require
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

jest.mock('react-native-fs', () => ({
  downloadFile: jest.fn(),
}));

jest.doMock('react-native', () =>
  Object.setPrototypeOf(
    {
      Platform: {
        OS: 'android',
        select: () => {},
        constants: {
          version: 28,
        },
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
    ReactNative
  )
);
