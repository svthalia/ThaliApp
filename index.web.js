import {
  AppRegistry,
} from 'react-native';
import App from './app/app';

AppRegistry.registerComponent('ThaliApp', () => App);
AppRegistry.runApplication('ThaliApp', {
  rootTag: document.getElementById('react-root'),
});
