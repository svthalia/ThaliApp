import * as actions from '../../app/actions/session';

describe('session actions', () => {
  it('should expose the session actions', () => {
    expect(actions.INIT).toEqual('SESSION_INIT');
    expect(actions.SUCCESS).toEqual('SESSION_SUCCESS');
    expect(actions.LOGIN).toEqual('SESSION_LOGIN');
    expect(actions.TOKEN_INVALID).toEqual('SESSION_TOKEN_INVALID');
    expect(actions.LOGOUT).toEqual('SESSION_LOGOUT');
    expect(actions.PROFILE).toEqual('SESSION_PROFILE');
    expect(actions.PROFILE_SUCCESS).toEqual('SESSION_PROFILE_SUCCESS');
  });

  it('should create an action to init the session', () => {
    expect(actions.init()).toMatchSnapshot();
  });

  it('should create an action to notify invalid token', () => {
    expect(actions.tokenInvalid()).toMatchSnapshot();
  });

  it('should create an action to log the user in', () => {
    expect(actions.login('username', 'password')).toMatchSnapshot();
  });

  it('should create an action for a successful login', () => {
    expect(actions.success('username', 'token')).toMatchSnapshot();
  });

  it('should create an action to log the user out', () => {
    expect(actions.logout()).toMatchSnapshot();
  });

  it('should create an action to load the user profile', () => {
    expect(actions.profile('token')).toMatchSnapshot();
  });

  it('should create an action for a successful user profile load', () => {
    expect(actions.profileSuccess('displayName', 'photo')).toMatchSnapshot();
  });
});