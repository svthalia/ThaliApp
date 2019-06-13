import * as actions from '../../app/actions/session';

describe('session actions', () => {
  it('should expose the session actions', () => {
    expect(actions.INIT).toEqual('SESSION_INIT');
    expect(actions.SIGNED_IN).toEqual('SESSION_SIGNED_IN');
    expect(actions.SIGN_IN).toEqual('SESSION_SIGN_IN');
    expect(actions.TOKEN_INVALID).toEqual('SESSION_TOKEN_INVALID');
    expect(actions.SIGN_OUT).toEqual('SESSION_SIGN_OUT');
    expect(actions.FETCH_USER_INFO).toEqual('SESSION_FETCH_USER_INFO');
    expect(actions.SET_USER_INFO).toEqual('SESSION_SET_USER_INFO');
  });

  it('should create an action to init the session', () => {
    expect(actions.init()).toMatchSnapshot();
  });

  it('should create an action to notify invalid token', () => {
    expect(actions.tokenInvalid()).toMatchSnapshot();
  });

  it('should create an action to log the user in', () => {
    expect(actions.signIn('username', 'password')).toMatchSnapshot();
  });

  it('should create an action for a successful login', () => {
    expect(actions.signedIn('username', 'token')).toMatchSnapshot();
  });

  it('should create an action to log the user out', () => {
    expect(actions.signOut()).toMatchSnapshot();
  });

  it('should create an action to fetch user info', () => {
    expect(actions.fetchUserInfo()).toMatchSnapshot();
  });

  it('should create an action to set user info', () => {
    expect(actions.setUserInfo('pk', 'displayName', 'photo')).toMatchSnapshot();
  });
});
