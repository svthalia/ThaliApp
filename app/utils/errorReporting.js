import { Sentry, SentrySeverity } from '@sentry/react-native';

export default (error, extra = {}) => {
  if (error.response && error.response.jsonData) {
    Sentry.captureBreadcrumb({
      message: 'JSON Data',
      category: 'json',
      level: SentrySeverity.Info,
      data: error.response.jsonData,
      type: 'http',
    });
  }
  Sentry.captureException(error, { extra });
};
