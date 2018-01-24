export const DEEPLINK = 'DEEPLINKING_DEEPLINK';

export function deepLink(url) {
  return {
    type: DEEPLINK,
    payload: { url },
  };
}
