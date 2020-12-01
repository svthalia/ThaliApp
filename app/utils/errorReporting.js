import * as Sentry from '@sentry/react-native';

export default (error, extra = {}) => {
  if (error.response && 'jsonData' in error.response) {
    Sentry.addBreadcrumb({
      message: 'JSON Data',
      category: 'json',
      level: Sentry.Severity.Info,
      data: error.response.jsonData,
      type: 'http',
    });
  }
  Sentry.captureException(error, { extra });
};
