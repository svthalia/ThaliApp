import { NativeModules } from 'react-native';

NativeModules.RNFirebase = {
  apps: [],
};

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
