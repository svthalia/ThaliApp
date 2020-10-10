/**
 * @format
 */

import { AppRegistry } from 'react-native';
import * as Sentry from '@sentry/react-native';
// eslint-disable-next-line import/no-unresolved
import { SENTRY_DSN } from '@env';
import App from './app/app';
import { name as appName } from './app.json';

Sentry.init({
  dsn: SENTRY_DSN,
});

AppRegistry.registerComponent(appName, () => App);
