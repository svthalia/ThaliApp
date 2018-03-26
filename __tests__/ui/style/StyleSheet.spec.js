import { StyleSheet as ReactStyleSheet, Platform } from 'react-native';
import StyleSheet from '../../../app/ui/style/StyleSheet';

describe('StyleSheet', () => {
  it('should create a react stylesheet', () => {
    expect(StyleSheet.create({
      test: {
        paddingBottom: 10,
        paddingTop: 10,
      },
    })).toEqual(ReactStyleSheet.create({
      test: {
        paddingBottom: 10,
        paddingTop: 10,
      },
    }));
  });

  it('should use the ios key for iOS styles', () => {
    Platform.OS = 'ios';
    expect(StyleSheet.create({
      test: {
        android: {
          paddingTop: 20,
        },
        ios: {
          paddingTop: 15,
        },
        paddingBottom: 10,
        paddingTop: 10,
      },
    })).toEqual(ReactStyleSheet.create({
      test: {
        paddingBottom: 10,
        paddingTop: 15,
      },
    }));
  });

  it('should use the android key for Android styles', () => {
    Platform.OS = 'android';
    Platform.select = ({ android }) => android;
    expect(StyleSheet.create({
      test: {
        android: {
          paddingTop: 20,
        },
        ios: {
          paddingTop: 15,
        },
        paddingBottom: 10,
        paddingTop: 10,
      },
    })).toEqual(ReactStyleSheet.create({
      test: {
        paddingBottom: 10,
        paddingTop: 20,
      },
    }));
  });
});
