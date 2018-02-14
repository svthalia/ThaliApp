import * as actions from '../../app/actions/login';

describe('login actions', () => {
  it('should expose the login actions', () => {
    expect(actions.SUCCESS).toEqual('LOGIN_SUCCESS');
    expect(actions.LOGIN).toEqual('LOGIN_LOGIN');
    expect(actions.LOGOUT).toEqual('LOGIN_LOGOUT');
    expect(actions.PROFILE).toEqual('LOGIN_PROFILE');
    expect(actions.PROFILE_SUCCESS).toEqual('LOGIN_PROFILE_SUCCESS');
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