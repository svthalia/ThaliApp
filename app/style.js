import { StyleSheet as ReactStyleSheet, Platform } from 'react-native';

export const colors = {
  magenta: '#E62272',
  darkMagenta: '#C2185B',
  white: '#FFFFFF',
  pressedWhite: '#F2F2F2',
  background: '#FAFAFA',
  black: '#000000',
  lightGray: '#BBBBBB',
  gray: '#616161',
  textColour: '#313131',
  darkGrey: '#373737',
  dividerGrey: 'rgba(0, 0, 0, 0.12)',
  semiTransparent: 'rgba(0, 0, 0, 0.20)',
  transparent: 'transparent',
  lightGreen: '#8fcc74',
  darkGreen: '#81b968',
  lightRed: '#e05c50',
  darkRed: '#d15348',
};

export class StyleSheet {
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
