import { AppRegistry } from 'react-native';
import { Sentry } from 'react-native-sentry';
import { SENTRY_DSN } from 'react-native-dotenv';
import App from './app/app';

Sentry.config(SENTRY_DSN).install();

AppRegistry.registerComponent('ThaliApp', () => App);
