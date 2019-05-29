import { NativeModules } from 'react-native';

NativeModules.RNFirebase = {
  apps: [],
};

NativeModules.RNShare = {

};

jest.mock('react-native-device-info', () => ({
  hasNotch: () => false,
  getDeviceLocale: () => 'en',
}));
