import { Sentry, SentrySeverity } from 'react-native-sentry';

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
