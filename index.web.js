import {
  AppRegistry,
} from 'react-native';
import fontAwesome from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import App from './app/app';

const reactNativeVectorIconsRequiredStyles = `@font-face { src:url(${fontAwesome});font-family: FontAwesome; }`;

// create stylesheet
const style = document.createElement('style');
style.type = 'text/css';
if (style.styleSheet) {
  style.styleSheet.cssText = reactNativeVectorIconsRequiredStyles;
} else {
  style.appendChild(document.createTextNode(reactNativeVectorIconsRequiredStyles));
}

// inject stylesheet
document.head.appendChild(style);


AppRegistry.registerComponent('ThaliApp', () => App);
AppRegistry.runApplication('ThaliApp', {
  rootTag: document.getElementById('react-root'),
});
