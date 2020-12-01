import {
  accessTokenSelector,
  loggedInSelector,
  refreshTokenSelector,
} from '../../app/selectors/session';

import { STATUS_SIGNED_IN } from '../../app/reducers/session';

describe('session selectors', () => {
  it('should expose the selectors', () => {
    expect(accessTokenSelector({ session: { accessToken: 'abc123' } })).toEqual(
      'abc123'
    );
    expect(refreshTokenSelector({ session: { refreshToken: 'abc123' } })).toEqual(
      'abc123'
    );
    expect(loggedInSelector({ session: { status: STATUS_SIGNED_IN } })).toEqual(true);
  });
});
