import { Platform, StyleSheet as ReactStyleSheet } from 'react-native';

export default class StyleSheet {
  static create(styles) {
    const platformStyles = {};
    Object.keys(styles).forEach((name) => {
      // eslint-disable-next-line prefer-const
      let { ios, android, ...style } = { ...styles[name] };
      style = { ...style, ...Platform.select({ android, ios }) };
      platformStyles[name] = style;
    });

    return ReactStyleSheet.create(platformStyles);
  }
}
