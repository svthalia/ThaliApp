/**
 * @format
 */

import { AppRegistry } from 'react-native';
import * as Sentry from '@sentry/react-native';
import env from './app/env';
import App from './app/app';
import { name as appName } from './app.json';

Sentry.init({
  dsn: env.SENTRY_DSN,
});

AppRegistry.registerComponent(appName, () => App);
