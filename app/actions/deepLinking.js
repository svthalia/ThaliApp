export const DEEPLINK = 'DEEPLINKING_DEEPLINK';

export function deepLink(url, stayInApp = true) {
  return {
    type: DEEPLINK,
    payload: { url, stayInApp },
  };
}
