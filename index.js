/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './app/app';
import * as Sentry from '@sentry/react-native';
import { SENTRY_DSN } from '@env';
import {name as appName} from './app.json';

Sentry.init({
    dsn: SENTRY_DSN,
});

AppRegistry.registerComponent(appName, () => App);
